import React, { useState } from "react";
import "./Info.scss"; // Import your CSS file
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Info() {
     const navigate = useNavigate();
     const location = useLocation();
     const userId = location.state?.userId || null; // Get userId from state
     const [formData, setFormData] = useState({
          weight: "",
          height: "",
          age: "",
          gender: "",
          otherText: "",
          dob: "",
     });

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

     const handleSubmit = async (e) => {
          e.preventDefault();

          const formattedUserId = `"${userId}"`.replace(/"/g, "");

          // Log the request body before sending the request

          // Convert weight, height, and age to numbers
          const weight = parseInt(formData.weight, 10);
          const height = parseInt(formData.height, 10);
          const age = parseInt(formData.age, 10);

          // Log the request body before sending the request
          const requestBody = {
               id: formattedUserId,
               weight: weight,
               height: height,
               age: age,
               gender: formData.gender,
               dob: formData.dob,
          };

          console.log("Request Body:", requestBody);

          try {
               const response = await fetch(
                    "http://127.0.0.1:8000/signup/add-info",
                    {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({
                              id: formattedUserId,
                              weight: parseInt(formData.weight, 10), // Corrected the typo
                              height: parseInt(formData.height, 10), // Convert height to an integer
                              age: parseInt(formData.age, 10), // Convert age to an integer
                              gender: formData.gender,
                              dob: formData.dob,
                         }),
                    }
               );

               if (response.ok) {
                    console.log("Form data submitted successfully");
                    navigate("/successful-signup");
               } else {
                    // Handle error response
                    console.log(JSON.stringify(formData));
                    console.error(
                         "Error submitting form data:",
                         response.statusText
                    );
               }
          } catch (error) {
               console.log(JSON.stringify(formData));
               console.error("Error submitting form data:", error.message);
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
                                                  Info
                                             </h2>
                                             <p className="text-white-50 mb-5">
                                                  Please enter your information:
                                             </p>

                                             <form onSubmit={handleSubmit}>
                                                  <div className="form-outline form-white mb-4">
                                                       <input
                                                            type="number"
                                                            id="weight"
                                                            name="weight"
                                                            className="form-control form-control-lg"
                                                            value={
                                                                 formData.weight
                                                            }
                                                            onChange={
                                                                 handleChange
                                                            }
                                                       />
                                                       <label
                                                            className="form-label"
                                                            htmlFor="weight"
                                                       >
                                                            Weight
                                                       </label>
                                                  </div>

                                                  <div className="form-outline form-white mb-4">
                                                       <input
                                                            type="number"
                                                            id="height"
                                                            name="height"
                                                            className="form-control form-control-lg"
                                                            value={
                                                                 formData.height
                                                            }
                                                            onChange={
                                                                 handleChange
                                                            }
                                                       />
                                                       <label
                                                            className="form-label"
                                                            htmlFor="height"
                                                       >
                                                            Height
                                                       </label>
                                                  </div>

                                                  <div className="form-outline form-white mb-4">
                                                       <input
                                                            type="number"
                                                            id="age"
                                                            name="age"
                                                            className="form-control form-control-lg"
                                                            value={formData.age}
                                                            onChange={
                                                                 handleChange
                                                            }
                                                       />
                                                       <label
                                                            className="form-label"
                                                            htmlFor="age"
                                                       >
                                                            Age
                                                       </label>
                                                  </div>

                                                  <div className="form-check form-check-inline mb-4">
                                                       <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            id="male"
                                                            value="male"
                                                            checked={
                                                                 formData.gender ===
                                                                 "male"
                                                            }
                                                            onChange={
                                                                 handleChange
                                                            }
                                                       />
                                                       <label
                                                            className="form-check-label"
                                                            htmlFor="male"
                                                       >
                                                            Male
                                                       </label>
                                                  </div>

                                                  <div className="form-check form-check-inline mb-4">
                                                       <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            id="female"
                                                            value="female"
                                                            checked={
                                                                 formData.gender ===
                                                                 "female"
                                                            }
                                                            onChange={
                                                                 handleChange
                                                            }
                                                       />
                                                       <label
                                                            className="form-check-label"
                                                            htmlFor="female"
                                                       >
                                                            Female
                                                       </label>
                                                  </div>

                                                  <div className="form-check form-check-inline mb-4">
                                                       <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            id="other"
                                                            value="other"
                                                            checked={
                                                                 formData.gender ===
                                                                 "other"
                                                            }
                                                            onChange={
                                                                 handleChange
                                                            }
                                                       />
                                                       <label
                                                            className="form-check-label"
                                                            htmlFor="other"
                                                       >
                                                            Other
                                                       </label>
                                                  </div>
                                                  {formData.gender ===
                                                       "other" && (
                                                       <div className="form-outline form-white mb-4">
                                                            <input
                                                                 type="number"
                                                                 id="height"
                                                                 name="height"
                                                                 className="form-control form-control-lg"
                                                                 value={
                                                                      formData.other
                                                                 }
                                                                 onChange={
                                                                      handleChange
                                                                 }
                                                            />
                                                            <label
                                                                 className="form-label"
                                                                 htmlFor="height"
                                                            >
                                                                 Fill in the the
                                                                 gender identity
                                                                 you identify
                                                                 with
                                                            </label>
                                                       </div>
                                                  )}

                                                  <div className="form-outline form-white mb-4">
                                                       <input
                                                            type="date"
                                                            id="dob"
                                                            name="dob"
                                                            className="form-control form-control-lg"
                                                            value={formData.dob}
                                                            onChange={
                                                                 handleChange
                                                            }
                                                       />
                                                       <label
                                                            className="form-label"
                                                            htmlFor="dob"
                                                       >
                                                            Date of Birth
                                                       </label>
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

export default Info;
