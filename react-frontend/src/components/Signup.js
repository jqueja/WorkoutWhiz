import React, { useEffect, useState } from "react";
import "./LogSignIn.scss";
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

     // ... (previous code)

     const handleSubmit = async (e) => {
          e.preventDefault();

          // Check if the password and confirm password match
          if (formData.password !== formData.confirmPassword) {
               setPasswordMatchError(true);
          }

          try {
               const response = await fetch(
                    "http://127.0.0.1:8000/signup/create-user",
                    {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({
                              user_email: formData.email,
                              user_password: formData.password,
                              first_name: formData.firstName,
                              last_name: formData.lastName,
                         }),
                    }
               );

               if (!response.ok) {
                    // Handle error cases, e.g., show an error message
                    console.error(
                         "Failed to create user:",
                         response.statusText
                    );

                    try {
                         const responseBody = await response.json();
                         if (
                              response.status === 400 &&
                              responseBody.detail === "Email already registered"
                         ) {
                              // Use alert to show a pop-up message
                              alert(
                                   "Email is already registered. Please use a different email."
                              );
                         }
                    } catch (error) {
                         // Handle JSON parsing error
                         console.error("Error parsing JSON response:", error);
                    }

                    return;
               }

               // Handle success cases, e.g., navigate to the next page
               const responseData = await response.json();
               const userId = responseData.user_id;
               console.log("User created successfully with ID:", userId);
               navigate("/info", { state: { userId } });
          } catch (error) {
               console.error("An error occurred:", error);
          }
     };

     // ... (remaining code)

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
                                                       isInvalid={
                                                            !!passwordMatchError
                                                       }
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
