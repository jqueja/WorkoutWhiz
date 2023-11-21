import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavHeader.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function NavHeader() {
     return (
          <Navbar className="gradient_nav_bar" data-bs-theme="dark">
               <Nav>
                    <Nav.Item>
                         <Nav.Link as={Link} to="/">
                              <HomeOutlinedIcon className="nav-icon"></HomeOutlinedIcon>
                         </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                         <Nav.Link as={Link} to="/music">
                              <LibraryMusicOutlinedIcon className="nav-icon"></LibraryMusicOutlinedIcon>
                         </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                         <Nav.Link as={Link} to="/settings">
                              <SettingsOutlinedIcon className="nav-icon"></SettingsOutlinedIcon>
                         </Nav.Link>
                    </Nav.Item>
               </Nav>
          </Navbar>
     );
}

export default NavHeader;
