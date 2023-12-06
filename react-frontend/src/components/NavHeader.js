import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavHeader.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

function NavIcon(props) {
     if (props.page === "home") {
          return (
               <>
                    <Nav.Item>
                         <Nav.Link as={Link} to="/">
                              <HomeIcon className="nav-icon"></HomeIcon>
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
               </>
          );
     }
     if (props.page === "music") {
          return (
               <>
                    <Nav.Item>
                         <Nav.Link as={Link} to="/">
                              <HomeOutlinedIcon className="nav-icon"></HomeOutlinedIcon>
                         </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                         <Nav.Link as={Link} to="/music">
                              <LibraryMusicIcon className="nav-icon"></LibraryMusicIcon>
                         </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                         <Nav.Link as={Link} to="/settings">
                              <SettingsOutlinedIcon className="nav-icon"></SettingsOutlinedIcon>
                         </Nav.Link>
                    </Nav.Item>
               </>
          );
     } else {
          return (
               <>
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
                              <SettingsIcon className="nav-icon"></SettingsIcon>
                         </Nav.Link>
                    </Nav.Item>
               </>
          );
     }
}

function NavHeader(props) {
     return (
          <Navbar className="gradient_nav_bar" data-bs-theme="dark">
               <Nav>
                    <NavIcon page={props.page}></NavIcon>
               </Nav>
          </Navbar>
     );
}

export default NavHeader;
