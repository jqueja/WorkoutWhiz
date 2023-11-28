import React from "react";
import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import EditSettings from "./EditSettings.js";
import supabase from "./Supabase.js";
import { useUser } from "../UserContext";
import { motion } from "framer-motion";

import "./Components.scss";

function Settings() {
     const { userId } = useUser();
     console.log("Current userId:", userId);

     const [userSettings, setUserSettings] = useState({
          first_name: "",
          last_name: "",
          dob: "",
          age: "",
          gender: "",
          weight: "",
          height_ft: "",
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
                    `http://127.0.0.1:8000/settings/${userId}`,
                    {
                         method: "PUT",
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
          }
     };

     useEffect(() => {
          fetchUserSettings();
     }, [userId]);

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
                    }}
               >
                    Settings
                    <EditSettings
                         onUpdate={handleUpdate}
                         style={{ margin: "0" }}
                    />
               </Container>
               <Container>
                    First Name: {userSettings.first_name}
                    <br />
                    Last Name: {userSettings.last_name}
                    <br />
                    Date of Birth: {userSettings.dob}
                    <br />
                    Age: {userSettings.age}
                    <br />
                    Gender: {userSettings.gender}
                    <br />
                    Weight: {userSettings.weight}
                    <br />
                    Height: {userSettings.height}
                    <br />
               </Container>
          </motion.div>
     );
}

export default Settings;
