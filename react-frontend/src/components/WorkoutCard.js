import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Container from "@material-ui/core/Container";

//import "./WorkoutCard.css";

function WorkoutCard(...props) {
     //From local storage objects
     const date = props["0"].item["0"];
     const workoutName = props["0"].item["1"].workoutName;
     const sets = props["0"].item["1"].sets;
     const reps = props["0"].item["1"].reps;
     const weight = props["0"].item["1"].weight;

     return (
          <Container style={{ marginTop: "1rem" }}>
               <Card>
                    <Card.Body style={{ padding: "0.4rem" }}>
                         <Card.Title
                              style={{
                                   marginBottom: "0.3rem",
                                   fontFamily: "M PLUS 1",
                              }}
                         >
                              {date}
                         </Card.Title>
                         {/* <Card.Subtitle className="mb-2 text-muted">
                              Workout #{props.workoutID}
                         </Card.Subtitle> */}
                         <Card.Text>
                              <Table>
                                   <thead>
                                        <tr>
                                             <th>Workout</th>
                                             <th>Weight</th>
                                             <th>Sets</th>
                                             <th>Reps</th>
                                        </tr>
                                   </thead>

                                   <tbody>
                                        <tr>
                                             <td>{workoutName}</td>
                                             <td>{weight}</td>
                                             <td>{sets}</td>
                                             <td>{reps}</td>
                                        </tr>
                                   </tbody>
                              </Table>
                         </Card.Text>
                    </Card.Body>
               </Card>
          </Container>
     );
}
export default WorkoutCard;
