import React from "react";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis,
} from "recharts";

const data = [
  {
    amt: 2400,
    name: "Page A",
    pv: 2400,
    uv: 4000,
  },
  {
    amt: 2210,
    name: "Page B",
    pv: 1398,
    uv: 3000,
  },
  {
    amt: 2290,
    name: "Page C",
    pv: 9800,
    uv: 2000,
  },
  {
    amt: 2000,
    name: "Page D",
    pv: 3908,
    uv: 2780,
  },
  {
    amt: 2181,
    name: "Page E",
    pv: 4800,
    uv: 1890,
  },
  {
    amt: 2500,
    name: "Page F",
    pv: 3800,
    uv: 2390,
  },
  {
    amt: 2100,
    name: "Page G",
    pv: 4300,
    uv: 3490,
  },
];

export default function TempChart() {
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
            bottom: 5,
            left: 20,
            right: 30,
            top: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    );
}
