import React from "react";
import WorkoutCard from "./WorkoutCard.js";
import LogWorkout from "./LogWorkout.js";

import Container from "@material-ui/core/Container";

function Home() {
     return (
          <div>
               <Container
                    className="page-header"
                    style={{
                         display: "flex",
                         justifyContent: "space-between",
                    }}
               >
                    My Workout Log
                    <LogWorkout style={{ margin: "0" }}></LogWorkout>
               </Container>

               <WorkoutCard></WorkoutCard>
               <WorkoutCard></WorkoutCard>
               <WorkoutCard></WorkoutCard>
               <WorkoutCard></WorkoutCard>
               <WorkoutCard></WorkoutCard>
          </div>
     );
}

export default Home;
