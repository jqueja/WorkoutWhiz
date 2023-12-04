import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Container from "@material-ui/core/Container";
import "./WorkoutCard.scss";

//Create content in card
function CardTable(props) {
     console.log(props.item);
     // map data into rows by workoutName
     const rows = props.item.map((row, index) => {
          return (
               <tr key={index}>
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
     const date = new Date(props.date);
     const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
     console.log(props.item);

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
                              {date.getDate() + 1}/{date.getFullYear() % 1000}
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
                                   <CardTable item={props.item} />
                              </tbody>
                         </Table>
                    </Card.Body>
               </Card>
          </Container>
     );
}

export default WorkoutCard;
