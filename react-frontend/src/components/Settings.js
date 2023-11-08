import React from "react";

import Container from "@material-ui/core/Container";
import EditSettings from "./EditSettings.js";

import "./Components.scss";
function Settings() {
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
                <EditSettings style={{ margin: "0" }}></EditSettings>
            </Container>
            <Container>Name: DOB: Age: Weight: Height: Gender:</Container>
        </div>
    );
}

export default Settings;
