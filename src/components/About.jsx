// src/components/About.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <section id="about" className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2>About Us</h2>
            <p>
              At ShannyTechSolutions, we specialize in delivering cutting-edge technology
              solutions tailored for your business needs.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="/assets/about-image.jpg"
              alt="About ShannyTechSolutions"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
