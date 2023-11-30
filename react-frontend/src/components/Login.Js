import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss"; // Import your CSS file
import supabase from "./Supabase";
import { useUser } from "../UserContext";
import white_logo from "../images/WorkoutWhizLogo1White.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

/* eslint-disable react/no-unescaped-entities */

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
          try {
               let { data: login, error } = await supabase
                    .from("login")
                    .select("*")
                    .eq("email", email)
                    .eq("password", password);

               if (error) {
                    console.error("Error fetching data:", error.message);
               } else {
                    if (login.length === 0) {
                         console.log("No match found.");
                         // Handle no match found case
                    } else {
                         setUserId(login[0].id);
                         console.log("Current userId:", userId);
                         // Handle successful login, e.g., redirect to a dashboard
                         // Use history to navigate to the settings page
                         navigate("/");
                    }
               }
          } catch (error) {
               console.error("Error during login:", error.message);
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
