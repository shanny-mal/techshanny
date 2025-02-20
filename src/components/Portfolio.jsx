// src/components/Portfolio.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-5">
      <Container>
        <h2 className="text-center mb-4">Our Work</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="/assets/project1.jpg" />
              <Card.Body>
                <Card.Title>Project One</Card.Title>
                <Card.Text>A brief description of Project One.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="/assets/project2.jpg" />
              <Card.Body>
                <Card.Title>Project Two</Card.Title>
                <Card.Text>A brief description of Project Two.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="/assets/project3.jpg" />
              <Card.Body>
                <Card.Title>Project Three</Card.Title>
                <Card.Text>A brief description of Project Three.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Portfolio;
