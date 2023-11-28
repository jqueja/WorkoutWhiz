import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard";
import LogWorkout from "./LogWorkout";
import Container from "@material-ui/core/Container";
import { useUser } from "../UserContext";
import { motion } from "framer-motion";

function Home() {
     const [workoutData, setWorkoutData] = useState([]);
     const { userId } = useUser();

     const fetchWorkouts = async () => {
          try {
               const response = await fetch(
                    `http://127.0.0.1:8000/workouts/${userId}`,
                    {
                         method: "GET",
                         credentials: "include",
                         headers: {
                              Accept: "application/json",
                         },
                    }
               );

               if (!response.ok) {
                    throw new Error(
                         `Error fetching workouts: ${response.statusText}`
                    );
               }

               const data = await response.json();
               console.log(data);
               setWorkoutData(data);
          } catch (error) {
               console.error(error);
          }
     };

     useEffect(() => {
          fetchWorkouts();
     }, []); // Run once when the component mounts

     const handleLogWorkoutSubmit = async (newWorkoutData) => {
          try {
               const response = await fetch(
                    `http://127.0.0.1:8000/workouts/${userId}/update`,
                    {
                         method: "POST",
                         credentials: "include",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify(newWorkoutData),
                    }
               );

               if (!response.ok) {
                    throw new Error(
                         `Error updating workout: ${response.statusText}`
                    );
               }

               console.log("Workout updated successfully");
               fetchWorkouts();
          } catch (error) {
               console.error(error);
          }
     };

     const workoutCardList = workoutData.map((card) => (
          <WorkoutCard
               key={card.date}
               date={card.date}
               item={card} // Pass the entire object to WorkoutCard
          ></WorkoutCard>
     ));

     return (
          <motion.div
               initial={{ translateX: "-100%" }}
               animate={{ translateX: 0 }}
          >
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
          </motion.div>
     );
}

export default Home;
