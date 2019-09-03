import { Grid } from "@material-ui/core";
import React from "react";
import telloStateBarFactory from "./TelloStateBar";
import Title from "./Title";

const SpeedX = telloStateBarFactory("vgx", "Speed X", -10, 10);
const SpeedY = telloStateBarFactory("vgy", "Speed Y", -10, 10);
const SpeedZ = telloStateBarFactory("vgz", "Speed Z", -10, 10);

export default function SpeedConatiner() {
    return (
        <React.Fragment>
            <Title>Speed</Title>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                    <SpeedX />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <SpeedY />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <SpeedZ />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
