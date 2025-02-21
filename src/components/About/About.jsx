// src/components/About.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./About.css"; // Import custom CSS

const About = () => {
  return (
    <section id="about" className="about-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2>About Us</h2>
            <p>
              At ShannyTechSolutions, we craft state-of-the-art technology
              solutions tailored to your unique business challenges. Our team
              fuses creative vision with innovative expertise to develop robust,
              intuitive digital experiences that drive your organization forward
              in today’s dynamic digital landscape.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="/logo.png"
              alt=""
              className="img-fluid about-img"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
