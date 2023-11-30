import React, { useState } from "react";
import "./Signup.scss"; // Import your CSS file
import { useNavigate } from "react-router-dom";

function Signup() {
     const [formData, setFormData] = useState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
     });
     const [passwordMatchError, setPasswordMatchError] = useState(false);

     const handleChange = (e) => {
          const { name, value } = e.target;

          // Handle special case for "Other" radio button
          if (name === "gender" && value !== "other") {
               // If the user switched to "Male" or "Female," reset the otherText field
               setFormData((prevData) => ({
                    ...prevData,
                    gender: value,
                    otherText: "",
               }));
          } else {
               // For other fields or "Other" radio button selected, update the state
               setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
               }));
          }
     };

     const navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();

          // Check if the password and confirm password match
          if (formData.password !== formData.confirmPassword) {
               setPasswordMatchError(true);
               return;
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

               console.log("Backend Response:", response); // Log the entire response

               if (!response.ok) {
                    // Handle error cases, e.g., show an error message
                    console.error(
                         "Failed to create user:",
                         response.statusText
                    );

                    try {
                         // Attempt to read the response body
                         const responseBody = await response.json();
                         if (
                              response.status === 400 &&
                              responseBody.detail === "Email already registered"
                         ) {
                              console.log("Alert should show up here");
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
               console.log("User created successfully");
               navigate("/info");
          } catch (error) {
               console.error("An error occurred:", error);
          }
     };

     return (
          <section className="vh-100 gradient-custom">
               <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                         <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                              <div className="card bg-light text-dark">
                                   <div className="card-body text-center">
                                        <div className="mb-md-5 mt-md-4 pb-5">
                                             <h2 className="fw-bold mb-2 text-uppercase">
                                                  Sign Up
                                             </h2>
                                             <p className="text-white-50 mb-5">
                                                  Please enter your information:
                                             </p>

                                             <form onSubmit={handleSubmit}>
                                                  <div className="form-outline form-white mb-4">
                                                       <input
                                                            type="text"
                                                            id="firstName"
                                                            name="firstName"
                                                            className="form-control form-control-lg"
                                                            value={
                                                                 formData.firstName
                                                            }
                                                            onChange={
                                                                 handleChange
                                                            }
                                                       />
                                                       <label
                                                            className="form-label"
                                                            htmlFor="firstName"
                                                       >
                                                            First Name
                                                       </label>
                                                  </div>

                                                  <div className="form-outline form-white mb-4">
                                                       <input
                                                            type="text"
                                                            id="lastName"
                                                            name="lastName"
                                                            className="form-control form-control-lg"
                                                            value={
                                                                 formData.lastName
                                                            }
                                                            onChange={
                                                                 handleChange
                                                            }
                                                       />
                                                       <label
                                                            className="form-label"
                                                            htmlFor="lastName"
                                                       >
                                                            Last Name
                                                       </label>
                                                  </div>
                                                  <div className="form-outline form-white mb-4">
                                                       <input
                                                            type="text"
                                                            id="email"
                                                            name="email"
                                                            className="form-control form-control-lg"
                                                            value={
                                                                 formData.email
                                                            }
                                                            onChange={
                                                                 handleChange
                                                            }
                                                       />
                                                       <label
                                                            className="form-label"
                                                            htmlFor="email"
                                                       >
                                                            Email
                                                       </label>
                                                  </div>

                                                  <div className="form-outline form-white mb-4">
                                                       <input
                                                            type="text"
                                                            id="password"
                                                            name="password"
                                                            className="form-control form-control-lg"
                                                            value={
                                                                 formData.password
                                                            }
                                                            onChange={
                                                                 handleChange
                                                            }
                                                       />
                                                       <label
                                                            className="form-label"
                                                            htmlFor="password"
                                                       >
                                                            Password
                                                       </label>
                                                  </div>

                                                  <div className="form-outline form-white mb-4">
                                                       <input
                                                            type="text"
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            className={`form-control form-control-lg ${
                                                                 passwordMatchError
                                                                      ? "is-invalid"
                                                                      : ""
                                                            }`}
                                                            value={
                                                                 formData.confirmPassword
                                                            }
                                                            onChange={
                                                                 handleChange
                                                            }
                                                       />
                                                       <label
                                                            className="form-label"
                                                            htmlFor="confirmPassword"
                                                       >
                                                            Confirm Password
                                                       </label>
                                                       {passwordMatchError && (
                                                            <div className="invalid-feedback">
                                                                 Passwords do
                                                                 not match.
                                                            </div>
                                                       )}
                                                  </div>
                                                  <button
                                                       className="btn btn-outline-dark btn-lg px-5"
                                                       type="submit"
                                                  >
                                                       Submit
                                                  </button>
                                             </form>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}

export default Signup;
