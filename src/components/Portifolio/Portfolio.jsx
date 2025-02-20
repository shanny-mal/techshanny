// src/components/Portfolio.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Portfolio.css"; // Import custom CSS

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio-section py-5">
      <Container>
        <h2 className="portfolio-heading text-center mb-4">Our Portfolio</h2>
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
                  Responsive Corporate Website
                </Card.Title>
                <Card.Text className="portfolio-card-text">
                  Developed a state-of-the-art corporate website that emphasizes
                  user experience and performance, leading to increased
                  engagement and conversion rates.
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
                  E-Commerce Platform
                </Card.Title>
                <Card.Text className="portfolio-card-text">
                  Engineered a robust e-commerce solution with secure payment
                  integration, intuitive navigation, and a seamless shopping
                  experience that drives online sales growth.
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
                  Enterprise Network Infrastructure
                </Card.Title>
                <Card.Text className="portfolio-card-text">
                  Designed and implemented a scalable, secure network
                  infrastructure for large enterprises, ensuring maximum uptime
                  and efficient data flow.
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
