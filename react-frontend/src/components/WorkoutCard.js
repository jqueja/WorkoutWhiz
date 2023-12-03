import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Container from "@material-ui/core/Container";
import "./WorkoutCard.scss";

//Create content in card
function CardTable(props) {
     console.log(props.item);
     // Check if props.item is an array
     if (!Array.isArray(props.item)) {
          console.error("props.item is not an array:", props.item);
          return null; // or handle it in some way that makes sense for your application
     }
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
                              {date}
                         </Card.Title>
                         <Table>
                              <thead>
                                   <tr>
                                        <th style={{ width: "35%" }}>
                                             Exercise
                                        </th>
                                        <th style={{ width: "15%" }}>Weight</th>
                                        <th style={{ width: "10%" }}>Sets</th>
                                        <th style={{ width: "10%" }}>Reps</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {props.item && (
                                        <tr>
                                             <td>{props.item.lift_name}</td>
                                             <td>{props.item.weight}</td>
                                             <td>{props.item.sets}</td>
                                             <td>{props.item.reps}</td>
                                        </tr>
                                   )}
                              </tbody>
                         </Table>
                    </Card.Body>
               </Card>
          </Container>
     );
}

export default WorkoutCard;
