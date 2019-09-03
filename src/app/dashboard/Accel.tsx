import { Grid } from "@material-ui/core";
import React from "react";
import telloStateBarFactory from "./TelloStateBar";
import Title from "./Title";

const AccelX = telloStateBarFactory("agx", "Accel X", -100, 100);
const AccelY = telloStateBarFactory("agy", "Accel Y", -100, 100);
const AccelZ = telloStateBarFactory("agz", "Accel Z", -1000, 0);

export default function AccelConatiner() {
    return (
        <React.Fragment>
            <Title>Acceleration</Title>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                    <AccelX />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <AccelY />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <AccelZ />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
