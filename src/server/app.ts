import cookieParser from "cookie-parser";
import express from "express";
import { createServer } from "http";
import logger from "morgan";
import * as path from "path";
import socketio from "socket.io";

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
io.on("connection", (socket) => {
  console.log("a user connected");
  setInterval(() => socket.emit("FromAPI", "Ready"), 3000);
});

http.listen(ioPort, () => {
  console.log(`listening on *:${ioPort}`);
});

module.exports = app;
