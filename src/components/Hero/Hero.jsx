// src/components/Hero.jsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import "./Hero.css";

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background slider */}
      <div className="hero-slider">
        <div className="hero-slide"></div>
        <div className="hero-slide"></div>
        <div className="hero-slide"></div>
      </div>

      {/* Content overlay */}
      <Container className="hero-content text-center">
        <h1>Welcome to ShannyTechSolutions</h1>
        <p>Your technology partner for innovation</p>
        <Button variant="primary" size="lg" className="hero-btn">
          Get Started
        </Button>
      </Container>
    </section>
  );
};

export default Hero;
