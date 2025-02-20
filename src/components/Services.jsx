// src/components/Services.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Services.css"; // Import custom CSS

const Services = () => {
  return (
    <section id="services" className="services-section py-5">
      <Container>
        <h2 className="services-heading text-center mb-4">Our Services</h2>
        <Row>
          <Col md={4}>
            <Card className="service-card mb-4">
              <Card.Body>
                <Card.Title className="service-title">
                  Web Development
                </Card.Title>
                <Card.Text className="service-text">
                  We create immersive, responsive websites that captivate
                  visitors and drive engagement. Leveraging modern frameworks
                  and design principles, our solutions deliver seamless
                  performance, intuitive interfaces, and scalable architectures
                  tailored to your business.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="service-card mb-4">
              <Card.Body>
                <Card.Title className="service-title">Networking</Card.Title>
                <Card.Text className="service-text">
                  Our networking solutions provide robust, secure, and
                  lightning-fast connectivity. We design and implement
                  state-of-the-art infrastructures that ensure reliable
                  communication, efficient data management, and enhanced
                  collaboration for your organization.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="service-card mb-4">
              <Card.Body>
                <Card.Title className="service-title">IT Consulting</Card.Title>
                <Card.Text className="service-text">
                  Transform your technology landscape with our strategic IT
                  consulting. We assess your current systems, uncover growth
                  opportunities, and implement innovative solutions that
                  optimize operations, boost productivity, and secure long-term
                  success.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Services;
