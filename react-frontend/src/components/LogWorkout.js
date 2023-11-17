import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Components.scss";
import useWorkoutLocalStorage from "./useWorkoutLocalStorage.js";

function LogWorkout({ handleLogWorkoutSubmit, ...props }) {
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     const [data, setData] = useState({
          date: "",
          workoutName: "",
          weight: "",
          reps: "",
          sets: "",
     });

     let [saveData, setSaveData] = useWorkoutLocalStorage(data.date, data);

     const updateField = (e) => {
          setData((data) => ({
               ...data,
               [e.target.name]: e.target.value,
          }));
          setSaveData({
               ...saveData,
               [e.target.name]: e.target.value,
          });
     };

     const handleSubmit = (e) => {
          //const form = event.currentTarget;
          // if (form.checkValidity() === false) {
          //      event.preventDefault();
          //      event.stopPropagation();
          // }

          e.preventDefault();
          handleClose();
          handleLogWorkoutSubmit();

          //props.setWorkoutID(props.workoutID + 1);
          //setValidated(true);
     };

     return (
          <>
               <Button
                    onClick={handleShow}
                    style={{
                         height: "3rem",
                         width: "3rem",
                         padding: "0rem",
                         background: "#7AE2E9",
                         borderColor: "#7AE2E9",
                    }}
               >
                    <AddRoundedIcon className="page-icon"></AddRoundedIcon>
               </Button>
               <Offcanvas
                    placement="bottom"
                    show={show}
                    onHide={handleClose}
                    {...props}
                    style={{ height: "auto" }}
               >
                    <Offcanvas.Header
                         closeButton
                         style={{ paddingBottom: "8px" }}
                    >
                         <Offcanvas.Title>Log a new workout</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body style={{ paddingTop: "8px" }}>
                         <Form
                              noValidate
                              // validated={validated}
                              onSubmit={handleSubmit}
                         >
                              <Form.Group
                                   style={{ marginBottom: "2rem" }}
                                   className="mb-3"
                              >
                                   <Form.Control
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        onChange={updateField}
                                        //isInvalid={!!errors.date}
                                   />
                                   {/* <Form.Control.Feedback type='invalid'>
                                        {errors.date}
                                   </Form.Control.Feedback> */}
                              </Form.Group>

                              <Form.Group
                                   style={{ marginBottom: "2rem" }}
                                   className="mb-3"
                              >
                                   <Form.Label>Select Exercise Type</Form.Label>

                                   <Form.Select
                                        name="exercise"
                                        value={data.exercise}
                                        onChange={updateField}
                                   >
                                        <option value="weightlifting">
                                             Weightlifting
                                        </option>
                                        <option value="distance">
                                             Distance
                                        </option>
                                   </Form.Select>
                              </Form.Group>
                              <Form.Group
                                   style={{ marginBottom: "2rem" }}
                                   className="mb-3"
                              >
                                   <Form.Label>
                                        {" "}
                                        {data.exercise === "distance"
                                             ? "Distance Activity Name"
                                             : "Weightlifiting Exercise Name"}
                                   </Form.Label>
                                   <Form.Control
                                        name="workoutName"
                                        value={data.workoutName}
                                        onChange={updateField}
                                   />
                              </Form.Group>
                              {data.exercise !== "distance" ? (
                                   <Row>
                                        <Form.Group
                                             style={{ marginBottom: "2rem" }}
                                             className="mb-3"
                                             as={Col}
                                        >
                                             <Form.Label className="text-center">
                                                  Weight
                                             </Form.Label>
                                             <Form.Control
                                                  placeholder="lbs"
                                                  name="weight"
                                                  value={data.weight}
                                                  onChange={updateField}
                                             />
                                        </Form.Group>
                                        <Form.Group
                                             style={{ marginBottom: "2rem" }}
                                             className="mb-3"
                                             as={Col}
                                        >
                                             <Form.Label className="text-center">
                                                  Sets
                                             </Form.Label>
                                             <Form.Control
                                                  name="sets"
                                                  value={data.sets}
                                                  onChange={updateField}
                                             />
                                        </Form.Group>
                                        <Form.Group
                                             style={{ marginBottom: "2rem" }}
                                             className="mb-3"
                                             as={Col}
                                        >
                                             <Form.Label className="text-center">
                                                  Reps
                                             </Form.Label>
                                             <Form.Control
                                                  name="reps"
                                                  value={data.reps}
                                                  onChange={updateField}
                                             />
                                        </Form.Group>
                                   </Row>
                              ) : (
                                   ""
                              )}

                              <div
                                   style={{
                                        display: "flex",
                                        justifyContent: "Center",
                                   }}
                              >
                                   <Button
                                        type="submit"
                                        style={{
                                             background: "#8286e5",
                                             borderColor: "#8286e5",
                                        }}
                                   >
                                        Submit
                                   </Button>
                              </div>
                         </Form>
                    </Offcanvas.Body>
               </Offcanvas>
          </>
     );
}
export default LogWorkout;
