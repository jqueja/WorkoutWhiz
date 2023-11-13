import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Container from "@material-ui/core/Container";

//import "./WorkoutCard.css";

function WorkoutCard() {
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
                              11/1/23 - Wed
                         </Card.Title>
                         <Card.Subtitle className="mb-2 text-muted">
                              Workout #3
                         </Card.Subtitle>
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
                                             <td>Glute Bridges</td>
                                             <td>15</td>
                                             <td>3</td>
                                             <td>10</td>
                                        </tr>
                                        <tr>
                                             <td>Romanian Deadlifts</td>
                                             <td>20</td>
                                             <td>3</td>
                                             <td>10</td>
                                        </tr>
                                        <tr>
                                             <td>Goblet Squats</td>
                                             <td>10</td>
                                             <td>3</td>
                                             <td>8</td>
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
