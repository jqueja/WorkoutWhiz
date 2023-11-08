import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";

function MyApp() {
     return <App />;
}

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render(<MyApp />);
