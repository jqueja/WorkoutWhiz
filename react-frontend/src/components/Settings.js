import React from "react";
import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import EditSettings from "./EditSettings.js";
import supabase from "./supabase";

import "./Components.scss";

function Settings() {
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
               const { data, error } = await supabase
                    .from("users")
                    .update(nonEmptySettings)
                    .eq("user_id", 1);

               if (error) {
                    console.error("Error updating Supabase data:", error);
               } else {
                    console.log("Supabase data updated successfully:", data);
               }

               setUserSettings((prevSettings) => ({
                    ...prevSettings,
                    ...nonEmptySettings,
               }));
          } catch (error) {
               console.error("Error updating Supabase data:", error.message);
          }
     };

     useEffect(() => {
          const fetchUserSettings = async () => {
               try {
                    const { data, error } = await supabase
                         .from("users")
                         .select("*")
                         .eq("user_id", 1);

                    console.log("Data:", data); // Log data
                    console.log("Error:", error); // Log error

                    if (error) {
                         console.error("Error fetching user data:", error);
                    } else {
                         setUserSettings(data[0] || {});
                    }
               } catch (error) {
                    console.error("Error fetching user data:", error.message);
               }
          };

          fetchUserSettings();
     }, []);

     return (
          <div>
               <Container
                    style={{
                         display: "flex",
                         justifyContent: "space-between",
                         fontSize: "2rem",
                         marginTop: "2rem",
                         marginBottom: "1.5rem",
                    }}
               >
                    Settings
                    <EditSettings
                         onUpdate={handleUpdate}
                         style={{ margin: "0" }}
                    />
               </Container>
               <Container>
                    FirstName: {userSettings.first_name}
                    <br />
                    LastName: {userSettings.last_name}
                    <br />
                    DOB: {userSettings.dob}
                    <br />
                    Age: {userSettings.age}
                    <br />
                    Weight: {userSettings.weight}
                    <br />
                    Height: {userSettings.height}
                    <br />
                    Gender: {userSettings.gender}
                    <br />
               </Container>
          </div>
     );
}

export default Settings;