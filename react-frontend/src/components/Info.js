import React, { useState } from "react";
import "./LogSignIn.scss";
import { useNavigate } from "react-router-dom";
import white_logo from "../images/WorkoutWhizLogo1White.png";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Info() {
     const [validated, setValidated] = useState(false);

     const navigate = useNavigate();

     const [enableButton, setEnableButton] = useState(false);

     const [formData, setFormData] = useState({
          age: "",
          gender: "",
          dob: "",
          weight: "",
          height: "",
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

     const handleSubmit = (e) => {
          e.preventDefault();

          if (e.target.checkValidity() === false) {
               e.preventDefault();
               e.stopPropagation();
          }

          setValidated(true);
          if (e.target.checkValidity() === true) {
               console.log("Form data submitted:", formData);
               navigate("/successful-signup");
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

                                             <Form.Group
                                                  as={Col}
                                                  controlId="formAge"
                                             >
                                                  <Form.Label>Age</Form.Label>
                                                  <Form.Control
                                                       required
                                                       type="number"
                                                       name="age"
                                                       value={formData.age}
                                                       onChange={handleChange}
                                                  />
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
