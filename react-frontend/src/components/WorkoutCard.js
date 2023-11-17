import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Container from "@material-ui/core/Container";

// Create content in card
function CardTable(props) {
     // map data into rows by workoutName
     const rows = props.item.map((row, index) => {
          return (
               <tr key={index}>
                    <td>{row.workoutName}</td>
                    <td>{row.weight}</td>
                    <td>{row.sets}</td>
                    <td>{row.reps}</td>
               </tr>
          );
     });
     return rows;
}

function WorkoutCard(props) {
     const date = props.date;
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
                                        <CardTable
                                             item={props.item}
                                        ></CardTable>
                                   </tbody>
                              </Table>
                         </Card.Text>
                    </Card.Body>
               </Card>
          </Container>
     );
}
export default WorkoutCard;
