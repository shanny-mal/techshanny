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
              At ShannyTechSolutions, we specialize in delivering cutting-edge
              technology solutions tailored for your business needs. We blend
              creativity with innovation to help you stay ahead in a fast-paced
              digital world.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="/assets/about-image.jpg"
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
