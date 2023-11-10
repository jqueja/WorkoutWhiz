import React from "react";
import { useState } from "react";

import Container from "@material-ui/core/Container";
import EditSettings from "./EditSettings.js";

import "./Components.scss";
function Settings() {
     const [userSettings, setUserSettings] = useState({
          firstname: "",
          lastname: "",
          dob: "",
          age: "",
          gender: "",
          weight: "",
          height: "",
     });

     const handleUpdate = (updatedSettings) => {
          setUserSettings(updatedSettings);
     };

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
                    ></EditSettings>
               </Container>
               <Container>
                    FirstName: {userSettings.firstname}
                    <br />
                    LastName: {userSettings.lastname}
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
