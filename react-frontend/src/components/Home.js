import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutCard from "./WorkoutCard";
import LogWorkout from "./LogWorkout";
import Container from "@material-ui/core/Container";
import { useUser } from "../UserContext";
import { motion } from "framer-motion";

function sortWorkouts(DBWorkoutData) {
     const workoutData = []; // organized workout data for frontend rendering

     for (let i = 0; i < DBWorkoutData.length; i++) {
          let datedWorkoutObject = { date: "", weightlifting: [] };
          let indivWorkoutObject = {
               lift_name: "",
               weight: 0,
               reps: 0,
               sets: 0,
          }; // individual workout data

          indivWorkoutObject.lift_name = DBWorkoutData[i].lift_name;
          indivWorkoutObject.weight = DBWorkoutData[i].weight;
          indivWorkoutObject.sets = DBWorkoutData[i].sets;
          indivWorkoutObject.reps = DBWorkoutData[i].reps;

          if (workoutData.length === 0) {
               datedWorkoutObject.date = DBWorkoutData[i].date;
               datedWorkoutObject.weightlifting.push(indivWorkoutObject);
               workoutData.push(datedWorkoutObject);
          } else {
               let dateExists = false;
               const len = workoutData.length;
               for (let j = 0; j < len; j++) {
                    if (workoutData[j].date === DBWorkoutData[i].date) {
                         // check if date exists in workoutData
                         workoutData[j].weightlifting.push(indivWorkoutObject);
                         dateExists = true;
                         break;
                    }
               }
               // add date if it doesnt exist
               if (!dateExists) {
                    datedWorkoutObject.date = DBWorkoutData[i].date;
                    datedWorkoutObject.weightlifting.push(indivWorkoutObject);
                    workoutData.push(datedWorkoutObject);
               }
          }
     }

     return workoutData;
}

function Home() {
     const [DBWorkoutData, setDBWorkoutData] = useState([]); // Database workout data
     const workoutData = sortWorkouts(DBWorkoutData); // workout data for frontend rendering
     workoutData.sort(function (a, b) {
          return b.date.localeCompare(a.date);
     });
     const { userId } = useUser();

     const navigate = useNavigate();

     if (userId === null) {
          navigate("/login");
     }

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
               setDBWorkoutData(data);
               sortWorkouts(DBWorkoutData);
          } catch (error) {
               console.error(error);
               navigate("/login");
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
                    const errorData = await response.json();
                    console.error("Error updating workout:", errorData);
                    throw new Error(
                         `Error updating workout: ${response.statusText}`
                    );
               }

               fetchWorkouts();
          } catch (error) {
               console.error(error);
          }
     };
     const workoutCardList = workoutData.map((card) => (
          <WorkoutCard
               key={card.date}
               date={card.date}
               item={card.weightlifting} // Pass the entire object to WorkoutCard
               onRemove={fetchWorkouts}
          ></WorkoutCard>
     ));
     if (workoutData.length === 0) {
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
                    <Container
                         style={{
                              fontSize: "2.5rem",
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                              textAlign: "center",
                              paddingTop: "5rem",
                              flexDirection: "column",
                         }}
                    >
                         Welcome to Workout Whiz!
                         <div style={{ fontSize: "1.5rem" }}>
                              To add a new workout, click on the &quot;+&quot;
                              above!
                         </div>
                    </Container>
               </motion.div>
          );
     } else {
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
}

export default Home;
