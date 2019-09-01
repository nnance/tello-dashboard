import cookieParser from "cookie-parser";
import express from "express";
import { createServer } from "http";
import logger from "morgan";
import * as path from "path";
import socketio from "socket.io";
import { droneFactory, IFlightController } from "tello-api-node";

import depositsRouter from "./routes/deposits";
import ordersRouter from "./routes/orders";
import salesRouter from "./routes/sales";

const app = express();
const http = createServer(app);
const io = socketio(http);
const ioPort = 4001;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../")));

app.use("/orders", ordersRouter);
app.use("/sales", salesRouter);
app.use("/deposits", depositsRouter);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// tslint:disable:no-console
const connectToDrone = async (socket: socketio.Socket) => {
  try {
    socket.emit("status", "Connecting");
    const drone = await droneFactory(console.log.bind(console));
    socket.emit("status", "Ready");
    return drone;
  } catch (error) {
    socket.emit("status", "Not connected");
    return undefined;
  }
};

io.on("connection", async (socket) => {
  let drone: IFlightController;
  let timeoutId: NodeJS.Timeout;

  const connectWithRetry = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    return connectToDrone(socket).then((result) => {
      if (!result) {
        console.log("unable to connect to Drone");
        timeoutId = setTimeout(() => {
          console.log("timed out waiting on Drone");
          connectWithRetry();
        }, 15000);
      } else {
        drone = result;
      }
    });
  };

  console.log("a user connected");
  connectWithRetry();

  socket.on("command", async (obj: {command: string}) => {
    console.log(`got command ${obj.command}`);
    if (drone) {
      try {
        if (obj.command === "takeoff") {
          socket.emit("status", "Moving");
          await drone.takeOff();
          socket.emit("Ready");
        } else if (obj.command === "land") {
          socket.emit("status", "Moving");
          await drone.land();
          socket.emit("Ready");
        }
      } catch (error) {
        drone.disconnect();
        drone = undefined;
      }
    } else {
      console.log("Drone not initialized");
      connectWithRetry();
    }
  });
});

http.listen(ioPort, () => {
  console.log(`listening on *:${ioPort}`);
});

module.exports = app;
