import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Components.scss";

function LogWorkout({ handleLogWorkoutSubmit, ...props }) {
     // OffCanvas states
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     // Workout Data states
     const [date, setDate] = useState("");
     const [saveData, setSaveData] = useState("");
     const [weightData, setWeightData] = useState({
          workoutName: "",
          weight: "",
          reps: "",
          sets: "",
     });
     const [data, setData] = useState({
          weightlifting: [],
     });

     // Accessing local storage
     function useWorkoutLocalStorage(key, initialValue) {
          console.log(key, initialValue);
          const savedValue = JSON.parse(localStorage.getItem(key));
          // check entries with the same date
          if (savedValue) {
               savedValue.push(initialValue);
               localStorage.setItem(key, JSON.stringify(savedValue));
          } else {
               localStorage.setItem(key, JSON.stringify([initialValue].flat()));
          }
          return null;
     }

     const updateField = (e) => {
          // update weight info
          setWeightData((weightData) => ({
               ...weightData,
               [e.target.name]: e.target.value,
          }));
     };

     const handleSubmit = (e) => {
          //const form = event.currentTarget;
          // if (form.checkValidity() === false) {
          //      event.preventDefault();
          //      event.stopPropagation();
          // }
          //setValidated(true);

          e.preventDefault();
          // set data object
          setData({
               weightlifting: weightData,
          });

          // save data object
          setSaveData({
               date: date,
               data: data,
          });
          useWorkoutLocalStorage(date, weightData);

          handleLogWorkoutSubmit();
          handleClose();
     };

     return (
          <>
               <Button
                    onClick={handleShow}
                    style={{
                         height: "3rem",
                         width: "3rem",
                         padding: "0rem",
                         background: "#F65858",
                         borderColor: "#F65858",
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
                                        value={date}
                                        onChange={(e) =>
                                             setDate(e.target.value)
                                        }
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
                                        value={weightData.workoutName}
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
                                                  value={weightData.weight}
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
                                                  value={weightData.sets}
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
                                                  value={weightData.reps}
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
                                             background: "#F3A64B",
                                             borderColor: "#F3A64B",
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
