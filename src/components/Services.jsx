// src/components/Services.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Services.css"; // Import custom CSS

const Services = () => {
  return (
    <section id="services" className="services-section py-5">
      <Container>
        <h2 className="text-center mb-4">Our Services</h2>
        <Row>
          <Col md={4}>
            <Card className="service-card mb-4">
              <Card.Body>
                <Card.Title>Web Development</Card.Title>
                <Card.Text>
                  We create immersive, responsive websites that not only
                  captivate visitors but also drive engagement. Leveraging the
                  latest frameworks and design principles, our web development
                  solutions ensure seamless performance, intuitive user
                  interfaces, and scalable architectures tailored to your
                  business needs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="service-card mb-4">
              <Card.Body>
                <Card.Title>Networking</Card.Title>
                <Card.Text>
                  Our networking solutions provide robust, secure, and
                  lightning-fast connectivity across your organization. We
                  design and implement state-of-the-art infrastructures that
                  guarantee reliable communication, efficient data management,
                  and enhanced collaboration, ensuring your business stays
                  connected in an increasingly digital world.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="service-card mb-4">
              <Card.Body>
                <Card.Title>IT Consulting</Card.Title>
                <Card.Text>
                  Transform your technology landscape with our strategic IT
                  consulting services. We collaborate with you to assess your
                  current systems, identify growth opportunities, and implement
                  innovative solutions that optimize operations, boost
                  productivity, and drive long-term success in today’s
                  competitive market.
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
