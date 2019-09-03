import { Grid } from "@material-ui/core";
import React from "react";
import telloStateBarFactory from "./TelloStateBar";
import Title from "./Title";

const TempChart = telloStateBarFactory("temph", "Temperature");
const BatChart = telloStateBarFactory("bat", "Battery");
const BaroChart = telloStateBarFactory("baro", "Barometer", -100, 100);

export default function StatsConatiner() {

    return (
        <React.Fragment>
            <Title>Stats</Title>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                    <TempChart />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <BatChart />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <BaroChart />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
