// src/components/Footer.jsx
import React from "react";
import { Container } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import "./Footer.css"; // Import the custom CSS

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container className="footer-container text-center">
        <div className="social-icons">
          <a
            href="https://www.facebook.com/share/1H2NoTgyQR/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://x.com/shannymalvin?t=eRrkrpWEaFgBFciTLSaAGw&s=09"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/shannon-chipezeze"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.instagram.com/malshayn?igsh=ZGhmdXdyMW9vdmgx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
        <p className="footer-text">
          &copy; {new Date().getFullYear()} ShannyTechSolutions. All rights
          reserved | This website is created by ShannyTechSolutions.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
