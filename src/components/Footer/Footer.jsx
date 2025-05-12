import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer-section">
      <a href="#home" className="skip-link">
        Skip to main content
      </a>
      <Container className="footer-container">
        <Row>
          <Col md={3} className="footer-col">
            <h5 className="footer-logo">ShannyTechSolutions</h5>
            <p>Innovative technology solutions for your business.</p>
          </Col>
          <Col md={3} className="footer-col">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#portfolio">Portfolio</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </Col>
          <Col md={3} className="footer-col">
            <h6>Follow Us</h6>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </Col>
          <Col md={3} className="footer-col">
            <h6>Legal</h6>
            <ul className="footer-links">
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
              <li>
                <a href="/cookies">Cookie Policy</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p className="footer-text">
              &copy; {new Date().getFullYear()} ShannyTechSolutions. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>

      {showTop && (
        <Button
          className="back-to-top"
          onClick={scrollTop}
          aria-label="Back to top"
        >
          <FaArrowUp />
        </Button>
      )}
    </footer>
  );
}
