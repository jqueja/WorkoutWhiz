import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Container from "@material-ui/core/Container";
import "./WorkoutCard.scss";

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
