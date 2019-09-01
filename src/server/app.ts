import cookieParser from "cookie-parser";
import { Socket } from "dgram";
import express from "express";
import { createServer } from "http";
import logger from "morgan";
import * as path from "path";
import socketio from "socket.io";
import { droneFactory } from "tello-api-node";

import depositsRouter from "./routes/deposits";
import ordersRouter from "./routes/orders";
import salesRouter from "./routes/sales";

const app = express();
const http = createServer(app);
const io = socketio(http);
const ioPort = 4001;

let drone: IDrone;

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
io.on("connection", (socket) => {
  console.log("a user connected");
  // droneFactory(console.log)
  //   .then((result) => {
  //     drone = result;
  //     socket.emit("FromAPI", "Ready");
  //   })
  //   .catch(() => {
  //     socket.emit("FromAPI", "Unable to connect");
  //   });

  socket.on("command", (obj: {command: string}) => {
    console.log(`got command ${obj.command}`);
    if (drone) {
      if (obj.command === "takeoff") {
        drone.takeOff();
      } else if (obj.command === "land") {
        drone.land();
      }
    }
  });
});

http.listen(ioPort, () => {
  console.log(`listening on *:${ioPort}`);
});

export enum Direction {
  left = "l",
  right = "r",
  forward = "f",
  back = "b",
}

interface IDrone {
  back: (cm: number) => Promise<Socket>;
  disconnect: () => void;
  down: (cm: number) => Promise<Socket>;
  emergency: () => Promise<Socket>;
  flip: (direction: Direction) => Promise<Socket>;
  forward: (cm: number) => Promise<Socket>;
  land: () => Promise<Socket>;
  left: (cm: number) => Promise<Socket>;
  right: (cm: number) => Promise<Socket>;
  rotateClockwise: (degrees: number) => Promise<Socket>;
  rotateCounterClockwise: (degrees: number) => Promise<Socket>;
  stop: () => Promise<Socket>;
  takeOff: () => Promise<Socket>;
  up: (cm: number) => Promise<Socket>;
}

module.exports = app;
