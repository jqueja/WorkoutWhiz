import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./LogSignIn.scss";
import { useUser } from "../UserContext";
import white_logo from "../images/WorkoutWhizLogo1White.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

function Login() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const { userId, setUserId } = useUser();

     const navigate = useNavigate(); // Replace useHistory with useNavigate

     const handleEmailChange = (event) => {
          setEmail(event.target.value);
     };

     const handlePasswordChange = (event) => {
          setPassword(event.target.value);
     };

     const handleLogin = async () => {
          console.log(email);
          console.log(password);
          try {
               const response = await fetch("http://127.0.0.1:8000/login", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                         user_email: email,
                         user_password: password,
                    }),
               });

               if (!response.ok) {
                    console.error("Error during login:", response.statusText);
                    // Show an alert for login failure
                    alert("Login failed. Please check your credentials.");
                    return;
               }

               const data = await response.json();
               const user_id = data.user_id;

               setUserId(user_id);

               console.log("Current user_id:", user_id);

               // Pass the userId using the state object in the navigate function
               navigate("/", { state: { userId } });
          } catch (error) {
               console.error("Error during login:", error.message);
               // Show an alert for other errors
               alert(
                    "An unexpected error occurred during login. Please try again."
               );
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
                              <h2 className="page-header mb-1"> Login</h2>

                              <p className="text-black-50 mb-5">
                                   Please enter your login and password.
                              </p>

                              <div className="form-outline form-white mb-4">
                                   <input
                                        type="email"
                                        id="typeEmailX"
                                        className="form-control form-control-lg"
                                        value={email}
                                        onChange={handleEmailChange}
                                   />
                                   <label
                                        className="form-label"
                                        htmlFor="typeEmailX"
                                   >
                                        Email
                                   </label>
                              </div>

                              <div className="form-outline form-white mb-4">
                                   <input
                                        type="password"
                                        id="typePasswordX"
                                        className="form-control form-control-lg"
                                        value={password}
                                        onChange={handlePasswordChange}
                                   />
                                   <label
                                        className="form-label"
                                        htmlFor="typePasswordX"
                                   >
                                        Password{" "}
                                   </label>
                              </div>

                              <p className="small mb-2 pb-lg-2">
                                   <a className="text-black-50" href="#!">
                                        <Link to="/forgot-password">
                                             Forgot password?
                                        </Link>
                                   </a>
                              </p>

                              <Button
                                   style={{
                                        background: "#F3A64B",
                                        borderColor: "#F3A64B",
                                        margin: "1.5rem",
                                   }}
                                   onClick={handleLogin}
                              >
                                   Login
                              </Button>

                              <div>
                                   <p className="mb-1">
                                        Don&apos;t have an account?{" "}
                                        <Link
                                             to="/signup"
                                             className="text-black-50 fw-bold"
                                        >
                                             Sign Up
                                        </Link>
                                   </p>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}

export default Login;
