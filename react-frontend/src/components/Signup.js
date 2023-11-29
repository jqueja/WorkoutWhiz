import React, { useEffect, useState } from "react";
import "./Login.scss"; // Import your CSS file
import { Link, useNavigate } from "react-router-dom";
import white_logo from "../images/WorkoutWhizLogo1White.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function Signup() {
     const [passwordMatchError, setPasswordMatchError] = useState("true");
     const [validated, setValidated] = useState(false);

     const navigate = useNavigate();

     const [formData, setFormData] = useState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
     });

     const handleChange = (e) => {
          setFormData((formData) => ({
               ...formData,
               [e.target.name]: e.target.value,
          }));
     };

     useEffect(() => {
          // Check if the password and confirm password match
          if (formData.password === formData.confirmPassword) {
               setPasswordMatchError(false);
          } else {
               setPasswordMatchError(true);
          }
          console.log(passwordMatchError);
     }, [formData.confirmPassword, formData.password]);

     const handleSubmit = (e) => {
          e.preventDefault();
          if (formData.password === formData.confirmPassword) {
               setPasswordMatchError(false);
          } else {
               setPasswordMatchError(true);
          }

          if (e.target.checkValidity() === false || passwordMatchError) {
               e.preventDefault();
               e.stopPropagation();
          }

          setValidated(true);
          if (e.target.checkValidity() === true && !passwordMatchError) {
               console.log("Form data submitted:", formData);
               navigate("/info");
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
                                   <h2 className="page-header">Sign Up</h2>

                                   <Form
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleSubmit}
                                   >
                                        <Row className="mb-3">
                                             <Form.Group
                                                  as={Col}
                                                  controlId="firstName"
                                             >
                                                  <Form.Label>
                                                       First Name
                                                  </Form.Label>
                                                  <Form.Control
                                                       name="firstName"
                                                       value={
                                                            formData.firstName
                                                       }
                                                       onChange={handleChange}
                                                       required
                                                  />
                                             </Form.Group>
                                             <Form.Group
                                                  as={Col}
                                                  controlId="lastName"
                                             >
                                                  <Form.Label>
                                                       Last Name
                                                  </Form.Label>
                                                  <Form.Control
                                                       name="lastName"
                                                       value={formData.lastName}
                                                       onChange={handleChange}
                                                       required
                                                  />
                                             </Form.Group>
                                        </Row>
                                        <div className="mb-3">
                                             <Form.Group
                                                  as={Col}
                                                  controlId="email"
                                             >
                                                  <Form.Label>Email</Form.Label>
                                                  <Form.Control
                                                       name="email"
                                                       value={formData.email}
                                                       onChange={handleChange}
                                                       required
                                                  />
                                             </Form.Group>
                                        </div>

                                        <div className="mb-3">
                                             <Form.Group
                                                  as={Col}
                                                  controlId="password"
                                             >
                                                  <Form.Label>
                                                       Password
                                                  </Form.Label>
                                                  <Form.Control
                                                       name="password"
                                                       value={formData.password}
                                                       onChange={handleChange}
                                                       required
                                                  />
                                             </Form.Group>
                                        </div>

                                        <div className="mb-3">
                                             <Form.Group
                                                  as={Col}
                                                  controlId="confirmPassword"
                                             >
                                                  <Form.Label>
                                                       Confirm Password
                                                  </Form.Label>
                                                  <Form.Control
                                                       name="confirmPassword"
                                                       value={
                                                            formData.confirmPassword
                                                       }
                                                       onChange={handleChange}
                                                       // isValid={
                                                       //      !passwordMatchError
                                                       // }
                                                       isInvalid={
                                                            !!passwordMatchError
                                                       }
                                                       // isValid={false}
                                                       required
                                                  />
                                                  {passwordMatchError ? (
                                                       <Form.Control.Feedback type="invalid">
                                                            Passwords do not
                                                            match.
                                                       </Form.Control.Feedback>
                                                  ) : (
                                                       ""
                                                  )}
                                             </Form.Group>
                                        </div>
                                        <Button
                                             type="submit"
                                             style={{
                                                  background: "#F3A64B",
                                                  borderColor: "#F3A64B",
                                                  margin: "1.5rem",
                                             }}
                                             disabled={
                                                  passwordMatchError &&
                                                  !validated
                                             }
                                        >
                                             Sign Up
                                        </Button>
                                   </Form>
                                   <div>
                                        <p className="mb-0">
                                             Back to{" "}
                                             <Link
                                                  to="/login"
                                                  className="text-black-50 fw-bold"
                                             >
                                                  Login
                                             </Link>
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}

export default Signup;
