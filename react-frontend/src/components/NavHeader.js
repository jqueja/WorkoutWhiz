import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavHeader.scss";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

function NavHeader() {
     return (
          <Navbar className="gradient_nav_bar" data-bs-theme="dark">
               <Nav>
                    <Nav.Item>
                         <Nav.Link as={Link} to="/">
                              <HomeRoundedIcon className="nav-icon"></HomeRoundedIcon>
                         </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                         <Nav.Link as={Link} to="/analytics">
                              <QueryStatsRoundedIcon className="nav-icon"></QueryStatsRoundedIcon>
                         </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                         <Nav.Link as={Link} to="/settings">
                              <SettingsRoundedIcon className="nav-icon"></SettingsRoundedIcon>
                         </Nav.Link>
                    </Nav.Item>
               </Nav>
          </Navbar>
     );
}

export default NavHeader;
