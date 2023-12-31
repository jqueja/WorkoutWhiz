import React from "react";
import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import EditSettings from "./EditSettings.js";
import { useUser } from "../UserContext";
import { motion } from "framer-motion";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Components.scss";

function Settings() {
     const navigate = useNavigate();

     const { userId } = useUser();

     if (userId === null) {
          navigate("/login");
     }

     const [userSettings, setUserSettings] = useState({
          first_name: "",
          last_name: "",
          dob: "",
          age: 0,
          gender: "",
          weight: 0,
          height_ft: 0,
     });

     const handleUpdate = async (updatedSettings) => {
          const nonEmptySettings = Object.keys(updatedSettings)
               .filter((key) => updatedSettings[key] !== "")
               .reduce((obj, key) => {
                    obj[key] = updatedSettings[key];
                    return obj;
               }, {});

          try {
               const response = await fetch(
                    `http://127.0.0.1:8000/settings/update/${userId}`, // Ensure the URL matches the correct route
                    {
                         method: "POST",
                         credentials: "include", // Include credentials in the request
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify(nonEmptySettings),
                    }
               );

               if (!response.ok) {
                    console.error(
                         "Error updating user settings:",
                         response.statusText
                    );
               } else {
                    console.log("User settings updated successfully");
                    // You might want to fetch the updated settings again after a successful update
                    fetchUserSettings();
               }
          } catch (error) {
               console.error("Error updating user settings:", error.message);
          }
     };

     const fetchUserSettings = async () => {
          try {
               const response = await fetch(
                    `http://127.0.0.1:8000/settings/${userId}`,
                    {
                         method: "GET",
                         credentials: "include", // Include credentials in the request
                         headers: {
                              Accept: "application/json",
                         },
                    }
               );
               if (!response.ok) {
                    console.error(
                         "Error fetching user settings:",
                         response.statusText
                    );
               } else {
                    const data = await response.json();
                    setUserSettings(data);
               }
          } catch (error) {
               console.error("Error fetching user settings:", error.message);
               navigate("/login");
          }
     };

     useEffect(
          () => {
               fetchUserSettings();
          },
          [userId],
          userSettings
     );

     return (
          <motion.div
               initial={{ translateX: "-100%" }}
               animate={{
                    translateX: 0,
               }}
          >
               <Container
                    className="page-header"
                    style={{
                         display: "flex",
                         justifyContent: "space-between",
                         paddingLeft: "0px",
                         paddingRight: "0px",
                    }}
               >
                    Settings
                    <EditSettings
                         onUpdate={handleUpdate}
                         style={{ margin: "0" }}
                         data={userSettings}
                    />
               </Container>
               <Container style={{ height: "70vh" }}>
                    <div style={{ lineHeight: "2", fontSize: "21px" }}>
                         <Row>
                              <Col>
                                   <b>First Name:</b>
                              </Col>
                              <Col>{userSettings.first_name}</Col>
                         </Row>
                         <Row>
                              <Col>
                                   <b>Last Name:</b>
                              </Col>
                              <Col>{userSettings.last_name}</Col>
                         </Row>
                         <Row>
                              <Col>
                                   <b>Date of Birth:</b>
                              </Col>
                              <Col>{userSettings.dob}</Col>
                         </Row>
                         <Row>
                              <Col>
                                   <b>Age:</b>
                              </Col>
                              <Col>{userSettings.age}</Col>
                         </Row>
                         <Row>
                              <Col>
                                   <b>Gender:</b>
                              </Col>
                              <Col>{userSettings.gender}</Col>
                         </Row>
                         <Row>
                              <Col>
                                   <b>Weight:</b>
                              </Col>
                              <Col>{userSettings.weight}</Col>
                         </Row>
                         <Row>
                              <Col>
                                   <b>Height:</b>
                              </Col>
                              <Col>{userSettings.height}</Col>
                         </Row>
                    </div>
                    <Button
                         size="lg"
                         style={{
                              background: "#F3A64B",
                              borderColor: "#F3A64B",
                              marginTop: "1.5rem",
                              bottom: "0",
                              position: "absolute",
                         }}
                         onClick={() => navigate("/logout")}
                    >
                         Logout
                    </Button>
               </Container>
          </motion.div>
     );
}

export default Settings;
