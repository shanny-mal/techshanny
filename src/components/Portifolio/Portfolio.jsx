// src/components/Portfolio.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Portfolio.css"; // Import custom CSS

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio-section py-5">
      <Container>
        <h2 className="portfolio-heading text-center mb-4">Our Work</h2>
        <Row>
          <Col md={4}>
            <Card className="portfolio-card mb-4">
              <div className="card-img-container">
                <Card.Img
                  variant="top"
                  src="/assets/project1.jpg"
                  className="portfolio-card-img"
                />
              </div>
              <Card.Body>
                <Card.Title className="portfolio-card-title">
                  Project One
                </Card.Title>
                <Card.Text className="portfolio-card-text">
                  A brief description of Project One.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="portfolio-card mb-4">
              <div className="card-img-container">
                <Card.Img
                  variant="top"
                  src="/assets/project2.jpg"
                  className="portfolio-card-img"
                />
              </div>
              <Card.Body>
                <Card.Title className="portfolio-card-title">
                  Project Two
                </Card.Title>
                <Card.Text className="portfolio-card-text">
                  A brief description of Project Two.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="portfolio-card mb-4">
              <div className="card-img-container">
                <Card.Img
                  variant="top"
                  src="/assets/project3.jpg"
                  className="portfolio-card-img"
                />
              </div>
              <Card.Body>
                <Card.Title className="portfolio-card-title">
                  Project Three
                </Card.Title>
                <Card.Text className="portfolio-card-text">
                  A brief description of Project Three.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Portfolio;
