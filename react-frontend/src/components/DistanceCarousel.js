import React from "react";

import Container from "@material-ui/core/Container";
import WorkoutCard from "./WorkoutCard.js";

import "./Components.scss";
function DistanceCarousel() {
    return (
        <div>
            <Container>Distance Analysis:</Container>
            <WorkoutCard></WorkoutCard>
        </div>
    );
}

export default DistanceCarousel;
