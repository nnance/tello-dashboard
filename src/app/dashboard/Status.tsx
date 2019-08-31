import { makeStyles } from "@material-ui/styles";
import React from "react";
import socketIOClient from "socket.io-client";
import Title from "./Title";

interface IDroneState {
  status: string;
}

export default function Controller() {
    const [data, setData] = React.useState<IDroneState>();
    React.useEffect(() => {
      const socket = socketIOClient("http://127.0.0.1:4001");
      socket.on("FromAPI", (status: string) => setData({ status }));
    }, []);

    return (
    <React.Fragment>
      <Title>Status</Title>
        <div style={{ textAlign: "center" }}>
          {data ? <p>{data.status}</p> : <p>Loading...</p>}
        </div>
    </React.Fragment>
  );
}
