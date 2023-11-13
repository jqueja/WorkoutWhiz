import React from "react";
import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import EditSettings from "./EditSettings.js";
import Supabase from "./Supabase";

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
               const { data, error } = await Supabase.from("users")
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
                    const { data, error } = await Supabase.from("users")
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
          </div>
     );
}

export default Settings;
