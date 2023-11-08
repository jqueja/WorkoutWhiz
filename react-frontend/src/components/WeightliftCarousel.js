import React from "react";

import Container from "@material-ui/core/Container";
import WorkoutCard from "./WorkoutCard.js";

import "./Components.scss";
function WeightliftCarousel() {
    return (
        <div>
            <Container>Weightlifting Analysis:</Container>
            <WorkoutCard></WorkoutCard>
        </div>
    );
}

export default WeightliftCarousel;
