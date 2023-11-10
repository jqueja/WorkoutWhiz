import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { createClient } from "@supabase/supabase-js";
import NavHeader from "./components/NavHeader";
import Home from "./components/Home";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import "./App.scss";

//   const supabase = createClient(
//        "https://wvxoandsznmqwdgqkabx.supabase.co",
//        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2eG9hbmRzem5tcXdkZ3FrYWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNzY0MjQsImV4cCI6MjAxNDk1MjQyNH0.mhs2Zg5U4Jo4vesIju7Fn6SfpkD4_eXEymerX-_Ll2E"
//   );

function App() {
   return (
      <Router>
         <div>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/analytics" element={<Analytics />} />
               <Route path="/settings" element={<Settings />} />
            </Routes>
            <NavHeader></NavHeader>
         </div>
      </Router>
   );
}

export default App;
