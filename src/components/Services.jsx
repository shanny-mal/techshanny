// src/components/Services.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Services = () => {
  return (
    <section id="services" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Our Services</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Web Development</Card.Title>
                <Card.Text>
                  We build responsive and dynamic websites using modern
                  technologies.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Mobile Apps</Card.Title>
                <Card.Text>
                  Developing user-friendly mobile applications for iOS and
                  Android.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>IT Consulting</Card.Title>
                <Card.Text>
                  Providing expert advice to optimize your technology strategy.
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
