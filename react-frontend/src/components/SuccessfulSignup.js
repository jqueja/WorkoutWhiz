import React from "react";
import "./LogSignIn.scss";
import white_logo from "../images/WorkoutWhizLogo1White.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function SuccessfulSignup() {
     const navigate = useNavigate();
     return (
          <>
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
                                             Successful Signup
                                        </h2>
                                        <p
                                             style={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                             }}
                                        >
                                             You have successfully signed up!
                                        </p>
                                        <Button
                                             style={{
                                                  background: "#F3A64B",
                                                  borderColor: "#F3A64B",
                                                  marginTop: "1.5rem",
                                             }}
                                             onClick={() => navigate("/login")}
                                        >
                                             Go to Login
                                        </Button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>
          </>
     );
}

export default SuccessfulSignup;
