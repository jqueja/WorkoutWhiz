import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import "./Components.scss";

function LogWorkout({ handleLogWorkoutSubmit, ...props }) {
     // OffCanvas states
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     // verification states
     const [validated, setValidated] = useState(false);
     const [errors, setErrors] = useState({});

     // Workout Data states
     const [date, setDate] = useState("");
     const [weightData, setWeightData] = useState({
          workoutName: "",
          weight: "",
          reps: "",
          sets: "",
     });

     const updateField = (e) => {
          const { name, value } = e.target;

          // Validate the field and update the errors state
          let fieldErrors = { ...errors };
          switch (name) {
               case "date":
                    fieldErrors.date = value ? "" : "Please provide a date.";
                    break;
               case "exercise":
                    fieldErrors.exercise = value
                         ? ""
                         : "Please provide a type of exercise.";
                    break;
               case "workoutName":
                    fieldErrors.workoutName = value
                         ? ""
                         : "Please provide workout name.";
                    break;
               // Add validation for other fields if needed
               default:
                    break;
          }

          // Update the errors state
          setErrors(fieldErrors);

          // Update weight info
          setWeightData((prevWeightData) => ({
               ...prevWeightData,
               [name]: value,
          }));
     };

     const handleSubmit = (e) => {
          const form = e.currentTarget;
          e.preventDefault();
          if (form.checkValidity() === false) {
               e.preventDefault();
               e.stopPropagation();
               setValidated(true); // Show validation errors
          } else {
               setValidated(false);
               // set data object
               const newWorkoutData = {
                    date: date,
                    lift_name: weightData.workoutName, // match the field name
                    weight: weightData.weight.toString(), // convert to string
                    reps: weightData.reps.toString(), // convert to string
                    sets: weightData.sets.toString(), // convert to string
               };

               handleLogWorkoutSubmit();
               handleClose();
               console.log(newWorkoutData);
          }
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
                              validated={validated}
                              onSubmit={handleSubmit}
                         >
                              {/* Alert for displaying validation errors */}
                              {validated && (
                                   <Alert variant="danger">
                                        Please fix the validation errors before
                                        submitting.
                                   </Alert>
                              )}

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
                                        isInvalid={!!errors.date}
                                        required
                                   />
                                   <Form.Control.Feedback type="invalid">
                                        {errors.date}
                                   </Form.Control.Feedback>
                              </Form.Group>

                              {/* <Form.Group
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
                                   <Form.Control.Feedback type="invalid">
                                        {errors.exercise}
                                   </Form.Control.Feedback>
                              </Form.Group> */}

                              <Form.Group
                                   style={{ marginBottom: "2rem" }}
                                   className="mb-3"
                              >
                                   <Form.Label>
                                        Weightlifting Exercise Name
                                   </Form.Label>
                                   <Form.Control
                                        name="workoutName"
                                        type="text"
                                        value={weightData.workoutName}
                                        onChange={updateField}
                                        required
                                   />
                                   <Form.Control.Feedback type="invalid">
                                        {errors.workoutName}
                                   </Form.Control.Feedback>
                              </Form.Group>
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
                                             type="number"
                                             min="0"
                                             value={weightData.weight}
                                             onChange={updateField}
                                             required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                             {errors.weight}
                                        </Form.Control.Feedback>
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
                                             type="number"
                                             min="0"
                                             value={weightData.sets}
                                             onChange={updateField}
                                             required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                             {errors.sets}
                                        </Form.Control.Feedback>
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
                                             type="number"
                                             min="0"
                                             value={weightData.reps}
                                             onChange={updateField}
                                             required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                             {errors.reps}
                                        </Form.Control.Feedback>
                                   </Form.Group>
                              </Row>

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
