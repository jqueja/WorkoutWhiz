import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavHeader from "./components/NavHeader";
import Home from "./components/Home";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Info from "./components/Info";
import Signup from "./components/Signup";
import SuccessfulSignup from "./components/SuccessfulSignup";
import ForgotPassword from "./components/ForgotPassword";
import "./App.scss";

function App() {
     return (
          <Router>
               <div>
                    <Routes>
                         {/* Include NavHeader only for these routes */}
                         <Route
                              path="/"
                              element={
                                   <React.Fragment>
                                        <Home />
                                        <NavHeader />
                                   </React.Fragment>
                              }
                         />
                         <Route
                              path="/analytics"
                              element={
                                   <React.Fragment>
                                        <Analytics />
                                        <NavHeader />
                                   </React.Fragment>
                              }
                         />
                         <Route
                              path="/settings"
                              element={
                                   <React.Fragment>
                                        <Settings />
                                        <NavHeader />
                                   </React.Fragment>
                              }
                         />
                    </Routes>
               </div>
               <div>
                    <Routes>
                         {/* These routes won't include NavHeader */}
                         <Route path="/login" element={<Login />} />
                         <Route path="/logout" element={<Logout />} />
                         <Route path="/info" element={<Info />} />
                         <Route path="/signup" element={<Signup />} />
                         <Route
                              path="/successul-signup"
                              element={<SuccessfulSignup />}
                         />
                         <Route
                              path="/forgot-password"
                              element={<ForgotPassword />}
                         />
                    </Routes>
               </div>
          </Router>
     );
}

export default App;
