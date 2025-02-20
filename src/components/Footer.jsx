// src/components/Footer.jsx
import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="py-3 bg-dark text-white">
      <Container className="text-center">
        <p>&copy; {new Date().getFullYear()} ShannyTechSolutions. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
