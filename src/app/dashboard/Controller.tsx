import React from 'react';
import Title from './Title';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getSocketIOClient } from '../api';

const useStyles = makeStyles({
  buttonContext: {
    margin: 5,
  },
});

export default function Controller() {
  const classes = useStyles();

  const sendCommand = (command: string) => () => {
    getSocketIOClient().emit("command", { command });
  }

  return (
    <React.Fragment>
      <Title>Flight Controls</Title>
      <Button color="primary" variant="contained" className={classes.buttonContext} onClick={sendCommand("takeoff")}>Take Off</Button>
      <Button color="primary" variant="contained" className={classes.buttonContext} onClick={sendCommand("land")}>Land</Button>
      <Button color="primary" variant="contained" className={classes.buttonContext} onClick={sendCommand("start")}>Start</Button>
    </React.Fragment>
  );
}