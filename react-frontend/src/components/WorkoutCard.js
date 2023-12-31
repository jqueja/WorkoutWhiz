import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Container from "@material-ui/core/Container";
import { useUser } from "../UserContext";
import "./WorkoutCard.scss";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "react-bootstrap/Button";

//Create content in card
function CardTable(props) {
     // map data into rows by workoutName
     const rows = props.item.map((row, index) => {
          return (
               <tr key={index}>
                    <td>
                         <Button
                              style={{
                                   height: "15px",
                                   width: "15px",
                              }}
                              className="btn btn-outline-primary custom-outline-primary-btn"
                              onClick={() =>
                                   props.handleRemove(
                                        row.lift_name,
                                        row.weight,
                                        row.sets,
                                        row.reps
                                   )
                              }
                         >
                              <RemoveIcon
                                   style={{
                                        fontSize: "10px",
                                        height: "12px",
                                        width: "12px",
                                   }}
                              />
                         </Button>
                    </td>
                    <td>{row.lift_name}</td>
                    <td>{row.weight}</td>
                    <td>{row.sets}</td>
                    <td>{row.reps}</td>
               </tr>
          );
     });
     return rows;
}

function WorkoutCard(props) {
     const date = new Date(props.date + "T00:00:00");
     const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
     const { userId } = useUser();

     const handleRemove = async (lift_name, weight, sets, reps) => {
          const newItem = {
               date: props.date,
               lift_name: lift_name,
               weight: weight,
               sets: sets,
               reps: reps,
          };
          try {
               const response = await fetch(
                    `http://127.0.0.1:8000/workouts/${userId}/delete`,
                    {
                         method: "POST",
                         credentials: "include",
                         headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify(newItem),
                    }
               );

               if (!response.ok) {
                    throw new Error(
                         `Error fetching workouts: ${response.statusText}`
                    );
               }

               // Trigger the re-fetch by calling the passed prop
               props.onRemove();
          } catch (error) {
               console.error(error);
          }
     };

     return (
          <Container
               style={{
                    marginTop: "1rem",
                    paddingLeft: "0px",
                    paddingRight: "0px",
               }}
          >
               <Card>
                    <Card.Body style={{ padding: "0.4rem" }}>
                         <Card.Title
                              style={{
                                   marginBottom: "0.3rem",
                                   fontFamily: "M PLUS 1",
                              }}
                         >
                              {/* Formatting date title of card */}
                              {dayNames[date.getDay()]} {date.getMonth() + 1}/
                              {date.getDate()}/{date.getFullYear() % 1000}
                         </Card.Title>
                         <Table>
                              <thead>
                                   <tr>
                                        <th style={{ width: "4%" }}> </th>
                                        <th style={{ width: "35%" }}>
                                             Exercise
                                        </th>
                                        <th style={{ width: "15%" }}>Weight</th>
                                        <th style={{ width: "10%" }}>Sets</th>
                                        <th style={{ width: "10%" }}>Reps</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   <CardTable
                                        item={props.item}
                                        handleRemove={handleRemove}
                                   />
                              </tbody>
                         </Table>
                    </Card.Body>
               </Card>
          </Container>
     );
}

export default WorkoutCard;
