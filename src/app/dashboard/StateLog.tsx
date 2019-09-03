import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { ITelloState } from "../../structs/telloState";
import { getSocketIOClient } from "../api";
import Title from "./Title";

// TODO: rename orders
export default function StateLog() {
  const [rows, setRows] = React.useState<ITelloState[]>([]);
  React.useEffect(() => {
    getSocketIOClient().on("state", (state: ITelloState) => {
      setRows((prevRows) => {
        const newState = [state, ...prevRows];
        return newState.length > 19 ? newState.slice(0, 19) : newState;
      });
    });
  }, []);

  return (
    <React.Fragment>
      <Title>State Log</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Battery</TableCell>
            <TableCell>Temp</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Flight Time</TableCell>
            <TableCell>Motor Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: ITelloState, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.bat}</TableCell>
              <TableCell>{row.temph}</TableCell>
              <TableCell>{row.h}</TableCell>
              <TableCell>{row.tof}</TableCell>
              <TableCell>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
