// src/components/Header.jsx
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#">ShannyTechSolutions</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#portfolio">Portfolio</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
