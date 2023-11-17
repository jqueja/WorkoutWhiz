import React, { useState } from "react";
import WorkoutCard from "./WorkoutCard.js";
import LogWorkout from "./LogWorkout.js";
import { useEffect } from "react";

import Container from "@material-ui/core/Container";
//import useWorkoutLocalStorage from "./useWorkoutLocalStorage.js";

function Home() {
     // Access local storage for list of date-workout objects
     const [data, setData] = useState([]);
     useEffect(() => {
          //const items = { ...localStorage };
          var result = [];
          for (var i in data) {
               try {
                    result.push([i, JSON.parse(data[i])]); // make into array to map
               } catch {
                    continue;
               }
          }
     }, [data]);

     console.log(data);
     const handleLogWorkoutSubmit = () => {
          console.log("LogWorkout submitted. Triggering re-render...");
          setData({ ...localStorage });
     };

     //const items = { ...localStorage };
     var result = [];
     for (var i in data) {
          try {
               result.push([i, JSON.parse(data[i])]); // make into array to map
          } catch {
               continue;
          }
     }
     const workoutCardList = result.map((item) => {
          if (item[1].workoutName) {
               console.log(result);
               return <WorkoutCard key={item.date} item={item}></WorkoutCard>;
          }
          return null;
     });

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
                    <LogWorkout
                         style={{ margin: "0" }}
                         handleLogWorkoutSubmit={handleLogWorkoutSubmit}
                    ></LogWorkout>
               </Container>
               {workoutCardList}
          </div>
     );
}

export default Home;
