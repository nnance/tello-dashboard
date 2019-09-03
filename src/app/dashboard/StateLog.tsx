import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { ITelloState } from "../../structs/telloState";
import { getSocketIOClient } from "../api";
import Title from "./Title";

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
            <TableCell>Accel X</TableCell>
            <TableCell>Accel Y</TableCell>
            <TableCell>Accel Z</TableCell>
            <TableCell>Speed X</TableCell>
            <TableCell>Speed Y</TableCell>
            <TableCell>Speed Z</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: ITelloState, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.bat}</TableCell>
              <TableCell>{row.temph}</TableCell>
              <TableCell>{row.h}</TableCell>
              <TableCell>{row.agx}</TableCell>
              <TableCell>{row.agy}</TableCell>
              <TableCell>{row.agz}</TableCell>
              <TableCell>{row.vgx}</TableCell>
              <TableCell>{row.vgy}</TableCell>
              <TableCell>{row.vgz}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
