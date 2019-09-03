import React from "react";
import {
  Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis,
} from "recharts";
import { ITelloState } from "../../structs/telloState";
import { getSocketIOClient } from "../api";

function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

type TelloStateKeys = keyof ITelloState;

const telloStateBarFactory = (key: TelloStateKeys, name: string, min = 0, max = 100) => () => {
    const [data, setData] = React.useState<any[]>([]);
    React.useEffect(() => {
      getSocketIOClient().on("state", (state: ITelloState) => {
            setData([{amt: prop(state, key), name}]);
        });
    }, []);

    return (
        <BarChart
            width={150}
            height={160}
            data={data}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"/>
            <YAxis domain={[min, max]}/>
            <Tooltip />
            <Bar dataKey="amt" fill="#8884d8" />
        </BarChart>
    );
};

export default telloStateBarFactory;
