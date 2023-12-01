import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss"; // Import your CSS file
//import supabase from "./Supabase";
import { useUser } from "../UserContext";

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
               <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                         <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                              <div className="card bg-light text-dark">
                                   <div className="card-body text-center">
                                        <div className="mb-md-5 mt-md-4 pb-5">
                                             <h2 className="fw-bold mb-2 text-uppercase">
                                                  Login
                                             </h2>
                                             <p className="text-black-50 mb-5">
                                                  Please enter your login and
                                                  password!
                                             </p>

                                             <div className="form-outline form-white mb-4">
                                                  <input
                                                       type="email"
                                                       id="typeEmailX"
                                                       className="form-control form-control-lg"
                                                       value={email}
                                                       onChange={
                                                            handleEmailChange
                                                       }
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
                                                       onChange={
                                                            handlePasswordChange
                                                       }
                                                  />
                                                  <label
                                                       className="form-label"
                                                       htmlFor="typePasswordX"
                                                  >
                                                       Password{" "}
                                                       {/* eslint-disable-next-line */}
                                                  </label>
                                             </div>

                                             <p className="small mb-5 pb-lg-2">
                                                  <a
                                                       className="text-black-50"
                                                       href="#!"
                                                  >
                                                       <Link to="/forgot-password">
                                                            Forgot password?
                                                       </Link>
                                                  </a>
                                             </p>

                                             <button
                                                  className="btn btn-outline-dark btn-lg px-5"
                                                  type="button"
                                                  onClick={handleLogin}
                                             >
                                                  Login
                                             </button>

                                             <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                                  <a
                                                       href="#!"
                                                       className="text-dark"
                                                  >
                                                       <i className="fab fa-facebook-f fa-lg"></i>
                                                  </a>
                                                  <a
                                                       href="#!"
                                                       className="text-dark"
                                                  >
                                                       <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                                                  </a>
                                                  <a
                                                       href="#!"
                                                       className="text-dark"
                                                  >
                                                       <i className="fab fa-google fa-lg"></i>
                                                  </a>
                                             </div>
                                        </div>

                                        <div>
                                             <p className="mb-0">
                                                  Don&apos;t have an account?
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
                    </div>
               </div>
          </section>
     );
}

export default Login;
