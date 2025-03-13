import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to an appropriate page (e.g., /about or /get-started)
    navigate("/about");
  };

  return (
    <section className="hero-section">
      <div className="hero-slider">
        <div className="hero-slide slide1"></div>
        <div className="hero-slide slide2"></div>
        <div className="hero-slide slide3"></div>
      </div>
      <Container className="hero-content text-center">
        <h1>Welcome to ShannyTechSolutions</h1>
        <p>Your technology partner for innovation</p>
        <Button className="hero-btn" onClick={handleGetStarted}>
          Get Started
        </Button>
      </Container>
    </section>
  );
};

export default Hero;
