import React from "react";
import { Link } from "react-router-dom";
import "./SuccessfulSignup.scss"; // Import your CSS file

function SuccessfulSignup() {
     return (
          <section className="vh-100 vw-100 gradient-custom">
               <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                         <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                              <div className="card bg-white text-dark full-screen-card">
                                   <div className="card-body text-center">
                                        <div className="mb-md-5 mt-md-4 pb-5">
                                             <h2 className="fw-bold mb-2 text-uppercase">
                                                  Successful Signup
                                             </h2>
                                             <p className="text-dark-50 mb-5">
                                                  You have successfully signed
                                                  up!
                                             </p>

                                             {/* Additional content for the successful signup page */}
                                             {/* You can customize this section based on your needs */}

                                             <Link to="/login">
                                                  <button className="btn btn-outline-dark btn-lg px-5">
                                                       Go to Login
                                                  </button>
                                             </Link>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}

export default SuccessfulSignup;
