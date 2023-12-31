import React from "react";
import "./LogSignIn.scss";
import { useNavigate } from "react-router-dom";
import white_logo from "../images/WorkoutWhizLogo1White.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";

function Logout() {
     // Perform logout actions here (e.g., clear user session, redirect, etc.)
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
                                        <div
                                             style={{
                                                  display: "flex",
                                                  justifyContent: "flex-end",
                                             }}
                                        >
                                             <CloseButton
                                                  onClick={() => navigate("/")}
                                             />
                                        </div>
                                        <h2 className="page-header">Logout</h2>

                                        <p
                                             style={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                             }}
                                        >
                                             Are you sure you want to logout?
                                        </p>

                                        <Button
                                             style={{
                                                  background: "#F3A64B",
                                                  borderColor: "#F3A64B",
                                                  marginTop: "1.5rem",
                                             }}
                                             onClick={() => navigate("/login")}
                                        >
                                             Logout
                                        </Button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>
          </>

          // <section className="vh-100 vw-100 gradient-custom">
          //      <div className="container py-5 h-100">
          //           <div className="row d-flex justify-content-center align-items-center h-100">
          //                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          //                     <div className="card bg-white text-dark full-screen-card">
          //                          <div className="card-body text-center">
          //                               <div className="mb-md-5 mt-md-4 pb-5">
          //                                    {/* Add the X button for navigation */}
          //                                    <Link to="/">
          //                                         <button className="btn btn-outline-dark btn-sm float-end">
          //                                              X
          //                                         </button>
          //                                    </Link>
          //                                    <h2 className="fw-bold mb-2 text-uppercase">
          //                                         Logout
          //                                    </h2>
          //                                    <p className="text-dark-50 mb-5">
          //                                         Are you sure you want to
          //                                         logout?
          //                                    </p>

          //                                    {/* Include any additional content you want for the logout page */}

          //                                    <button
          //                                         className="btn btn-outline-dark btn-lg px-5"
          //                                         onClick={() => {
          //                                              // Handle logout logic here
          //                                              // For example, you can use a function to perform the logout action
          //                                              // and then redirect the user to the login page.
          //                                              // logout();
          //                                              // history.push("/login"); // Assuming you use react-router-dom
          //                                              navigate("/login");
          //                                         }}
          //                                    >
          //                                         Logout
          //                                    </button>
          //                               </div>
          //                          </div>
          //                     </div>
          //                </div>
          //           </div>
          //      </div>
          // </section>
     );
}

export default Logout;
