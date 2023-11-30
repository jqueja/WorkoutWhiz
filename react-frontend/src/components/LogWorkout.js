import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
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
     const [weightData, setWeightData] = useState({
          workoutName: "",
          weight: "",
          reps: "",
          sets: "",
     });

     const updateField = (e) => {
          // update weight info
          setWeightData((weightData) => ({
               ...weightData,
               [e.target.name]: e.target.value,
          }));
     };

     const handleSubmit = (e) => {
          e.preventDefault();

          // Build the new workout data object
          const newWorkoutData = {
               date: date,
               lift_name: weightData.workoutName, // match the field name
               weight: weightData.weight.toString(), // convert to string
               reps: weightData.reps.toString(), // convert to string
               sets: weightData.sets.toString(), // convert to string
          };

          handleLogWorkoutSubmit(newWorkoutData);
          handleClose();
          console.log(newWorkoutData);
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
                         <Form onSubmit={handleSubmit}>
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
                                   />
                              </Form.Group>

                              <Form.Group
                                   style={{ marginBottom: "2rem" }}
                                   className="mb-3"
                              >
                                   {/* <Form.Label>Select Exercise Type</Form.Label>

                                   <Form.Select
                                        name="exercise"
                                        value={weightData.exercise}
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
                              > */}
                                   <Form.Label>
                                        {weightData.exercise === "distance"
                                             ? "Distance Activity Name"
                                             : "Weightlifting Exercise Name"}
                                   </Form.Label>
                                   <Form.Control
                                        name="workoutName"
                                        value={weightData.workoutName}
                                        onChange={updateField}
                                   />
                              </Form.Group>

                              {weightData.exercise !== "distance" && (
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
