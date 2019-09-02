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

  const listener = (msg: string) => socket.emit("status", msg);

  try {
    const drone = await droneFactory(console.log.bind(console), listener);
    return drone;
  } catch (error) {
    listener("not connected");
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
          await drone.takeOff();
        } else if (obj.command === "land") {
          await drone.land();
        } else if (obj.command === "start") {
          await drone.takeOff();
          await drone.forward(120);
          await drone.rotateClockwise(180);
          await drone.forward(120);
          await drone.rotateClockwise(180);
          await drone.land();
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
