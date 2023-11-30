import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard.js";
import LogWorkout from "./LogWorkout.js";
import Container from "@material-ui/core/Container";
import { motion } from "framer-motion";

function Home() {
     // Access local storage for list of date-workout objects
     const [data, setData] = useState({ ...localStorage });

     // update data after submit
     const handleLogWorkoutSubmit = () => {
          setData({ ...localStorage });
     };

     // update data array after data is modified
     useEffect(() => {
          var result = [];
          for (var i in data) {
               try {
                    result.push([i.toString(), JSON.parse(data[i])]); // make into array to map
               } catch {
                    continue;
               }
          }
     }, [data]);

     // format data array in order to map data into components
     var result = [];
     for (var i in data) {
          try {
               result.push([i, JSON.parse(data[i])]);
          } catch {
               continue;
          }
     }
     // order by descending date
     result.sort(function (a, b) {
          return b[0].localeCompare(a[0]);
     });

     // create workout cards
     const workoutCardList = result.map((card) => {
          return (
               <WorkoutCard
                    key={card[0]}
                    date={card[0]}
                    item={card[1]}
               ></WorkoutCard>
          );
     });

     return (
          <motion.div
               initial={{ translateX: "-100%" }}
               animate={{
                    translateX: 0,
               }}
          >
               <Container
                    className="page-header"
                    style={{
                         display: "flex",
                         justifyContent: "space-between",
                         paddingLeft: "0px",
                         paddingRight: "0px",
                    }}
               >
                    My Workout Log
                    <LogWorkout
                         style={{ margin: "0" }}
                         handleLogWorkoutSubmit={handleLogWorkoutSubmit}
                    ></LogWorkout>
               </Container>
               {workoutCardList}
          </motion.div>
     );
}

export default Home;
