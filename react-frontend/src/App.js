import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavHeader from "./components/NavHeader";
import Home from "./components/Home";
import Music from "./components/Music";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Info from "./components/Info";
import Signup from "./components/Signup";
import SuccessfulSignup from "./components/SuccessfulSignup";
import ForgotPassword from "./components/ForgotPassword";
import "./App.scss";
import { AnimatePresence } from "framer-motion";
import Container from "@material-ui/core/Container";

function App() {
     return (
          <AnimatePresence mode="wait">
               <Router>
                    <div>
                         <Routes>
                              {/* Include NavHeader only for these routes */}
                              <Route
                                   path="/"
                                   element={
                                        <React.Fragment>
                                             <div className="gradient-header-background">
                                                  WORKOUT WHIZ
                                             </div>
                                             <Container
                                                  style={{ marginTop: "4rem" }}
                                             >
                                                  <Home />
                                             </Container>

                                             <NavHeader page={"home"} />
                                        </React.Fragment>
                                   }
                              />
                              <Route
                                   path="/music"
                                   element={
                                        <React.Fragment>
                                             <div className="gradient-header-background">
                                                  WORKOUT WHIZ
                                             </div>
                                             <Container
                                                  style={{ marginTop: "4rem" }}
                                             >
                                                  <Music />
                                             </Container>{" "}
                                             <NavHeader page={"music"} />
                                        </React.Fragment>
                                   }
                              />
                              <Route
                                   path="/settings"
                                   element={
                                        <React.Fragment>
                                             <div className="gradient-header-background">
                                                  WORKOUT WHIZ
                                             </div>
                                             <Container
                                                  style={{ marginTop: "4rem" }}
                                             >
                                                  <Settings />
                                             </Container>
                                             <NavHeader page={"settings"} />
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
                                   path="/successful-signup"
                                   element={<SuccessfulSignup />}
                              />
                              <Route
                                   path="/forgot-password"
                                   element={<ForgotPassword />}
                              />
                         </Routes>
                    </div>
               </Router>
          </AnimatePresence>
     );
}

export default App;
