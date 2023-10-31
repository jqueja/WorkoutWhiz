import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './NavHeader.css';

function NavHeader() {
  return (
    <Navbar className="nav-bar-header" bg="success" variant="dark">
      <Container>
        <Nav>
          <Nav.Link as={Link} to="/home">
            MyWorkouts
          </Nav.Link>
          <Nav.Link as={Link} to="/analytics">
            Analytics
          </Nav.Link>
          <Nav.Link as={Link} to="/settings">
            Settings
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavHeader;