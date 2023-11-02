import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavHeader.css";

function NavHeader() {
  return (
    <Navbar className="justify-content-center" bg="success" variant="dark">
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            MyWorkouts
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/analytics">
            Analytics
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/settings">
            Settings
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default NavHeader;
