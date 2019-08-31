import React from "react";
import { getSocketIOClient } from "../api";
import Title from "./Title";

interface IDroneState {
  status: string;
}

export default function Controller() {
    const [data, setData] = React.useState<IDroneState>();
    React.useEffect(() => {
      getSocketIOClient().on("FromAPI", (status: string) => setData({ status }));
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
