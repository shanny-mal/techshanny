import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <Navbar className="modern-navbar" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="modern-brand">
          <div className="logo-circle">
            <img
              src="/logo.png"
              alt="ShannyTechSolutions Logo"
              className="logo"
            />
          </div>
          <span className="brand-text">ShannyTechSolutions</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          aria-label="Toggle navigation"
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto modern-nav">
            <Nav.Link as={Link} to="/" className="modern-nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="modern-nav-link">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/services" className="modern-nav-link">
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/portfolio" className="modern-nav-link">
              Portfolio
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="modern-nav-link">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
