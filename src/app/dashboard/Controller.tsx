import React from 'react';
import Title from './Title';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  buttonContext: {
    margin: 5,
  },
});

export default function Controller() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Flight Controls</Title>
      <Button color="primary" variant="contained" className={classes.buttonContext}>Take Off</Button>
      <Button color="primary" variant="contained" className={classes.buttonContext}>Land</Button>
    </React.Fragment>
  );
}