import React from "react";
import App from "./App";
import { UserProvider } from "./UserContext";
import { createRoot } from "react-dom/client";

// Create the container
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

// Initial render: Render an element to the Root
root.render(
     <UserProvider>
          <App />
     </UserProvider>
);
