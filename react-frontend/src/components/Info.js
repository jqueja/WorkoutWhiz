import React, { useState } from "react";
import "./LogSignIn.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import white_logo from "../images/WorkoutWhizLogo1White.png";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Info() {
     const [validated, setValidated] = useState(false);
     const [enableButton, setEnableButton] = useState(false);

     const navigate = useNavigate();
     const location = useLocation();
     const userId = location.state?.userId || null; // Get userId from state
     const [formData, setFormData] = useState({
          weight: "",
          height: "",
          age: "",
          gender: "",
          otherText: "",
          dob: "",
     });

     const handleChange = (e) => {
          setFormData((formData) => ({
               ...formData,
               [e.target.name]: e.target.value,
          }));

          if (e.target.checkValidity() === true) {
               setEnableButton(true);
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (e.target.checkValidity() === false) {
               e.preventDefault();
               e.stopPropagation();
          }

          const formattedUserId = `"${userId}"`.replace(/"/g, "");

          // Log the request body before sending the request

          // Convert weight, height, and age to numbers
          const weight = parseInt(formData.weight, 10);
          const height = parseInt(formData.height, 10);
          // const age = parseInt(formData.age, 10);
          // Calculate age based on the provided date of birth
          const dob = new Date(formData.dob);
          const today = new Date();
          if (dob > today) {
               alert("Please select a date before the current date.");
               setEnableButton(false);
               return;
          }

          // Calculate age based on the provided date of birth
          const calculatedAge = today.getFullYear() - dob.getFullYear();

          // Check if age is over 105
          if (calculatedAge > 105) {
               alert("Please enter a valid date of birth.");
               setEnableButton(false);
               return;
          }

          // Check if height and weight are greater than 0
          if (height <= 0 || weight <= 0) {
               alert("Please enter valid height and weight values.");
               setEnableButton(false);
               return;
          }

          // If all checks pass, enable the submit button
          setEnableButton(true);

          setValidated(true);
          if (e.target.checkValidity() === true) {
               try {
                    const response = await fetch(
                         "http://127.0.0.1:8000/signup/add-info",
                         {
                              method: "POST",
                              headers: {
                                   "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                   id: formattedUserId,
                                   weight: parseInt(formData.weight, 10), // Corrected the typo
                                   height: parseInt(formData.height, 10), // Convert height to an integer
                                   age: parseInt(calculatedAge, 10), // Convert age to an integer
                                   gender: formData.gender,
                                   dob: formData.dob,
                              }),
                         }
                    );

                    if (response.ok) {
                         console.log("Form data submitted successfully");
                         navigate("/successful-signup");
                    } else {
                         // Handle error response
                         console.log(JSON.stringify(formData));
                         console.error(
                              "Error submitting form data:",
                              response.statusText
                         );
                    }
               } catch (error) {
                    console.log(JSON.stringify(formData));
                    console.error("Error submitting form data:", error.message);
               }
          }
     };

     return (
          <section className="vh-100 gradient-custom-light">
               <div className="container py-5 h-100 center-items">
                    <Image className="logo" src={white_logo} />
                    <div
                         className="card bg-light text-dark"
                         style={{ borderRadius: "20px" }}
                    >
                         <div className="card-body text-center">
                              <div>
                                   <h2 className="page-header">
                                        Basic Information
                                   </h2>
                                   <p
                                        style={{
                                             display: "flex",
                                             justifyContent: "flex-start",
                                        }}
                                   >
                                        Please enter your information:
                                   </p>

                                   <Form
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleSubmit}
                                   >
                                        <Row className="mb-3">
                                             <Form.Group
                                                  as={Col}
                                                  controlId="dob"
                                             >
                                                  <Form.Label>
                                                       Birthday
                                                  </Form.Label>
                                                  <Form.Control
                                                       name="dob"
                                                       type="date"
                                                       value={formData.dob}
                                                       onChange={handleChange}
                                                       required
                                                  />{" "}
                                             </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                             <Form.Group
                                                  as={Col}
                                                  controlId="gender"
                                             >
                                                  <Form.Label>
                                                       Gender
                                                  </Form.Label>
                                                  <Form.Select
                                                       name="gender"
                                                       value={formData.gender}
                                                       onChange={handleChange}
                                                       required
                                                  >
                                                       <option></option>
                                                       <option value="Female">
                                                            Female
                                                       </option>
                                                       <option value="Male">
                                                            Male
                                                       </option>
                                                       <option value="Other">
                                                            Other
                                                       </option>
                                                  </Form.Select>
                                             </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                             <Form.Group
                                                  as={Col}
                                                  controlId="formWeight"
                                             >
                                                  <Form.Label>
                                                       Weight
                                                  </Form.Label>
                                                  <Form.Control
                                                       type="number"
                                                       required
                                                       name="weight"
                                                       value={formData.weight}
                                                       onChange={handleChange}
                                                  />
                                             </Form.Group>

                                             <Form.Group
                                                  as={Col}
                                                  controlId="formHeight"
                                             >
                                                  <Form.Label>
                                                       Height
                                                  </Form.Label>

                                                  <Form.Control
                                                       type="number"
                                                       required
                                                       name="height"
                                                       value={formData.height}
                                                       onChange={handleChange}
                                                  />
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
                                                       marginTop: "1.5rem",
                                                  }}
                                                  disabled={!enableButton}
                                             >
                                                  Submit
                                             </Button>
                                        </div>
                                   </Form>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}

export default Info;
