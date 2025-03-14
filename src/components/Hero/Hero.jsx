import React from "react";
import { Container, Button } from "react-bootstrap";
import "./Hero.css";

const Hero = () => {
  const handleGetStarted = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-slider">
        <div className="hero-slide slide1"></div>
        <div className="hero-slide slide2"></div>
        <div className="hero-slide slide3"></div>
      </div>
      <div className="hero-overlay"></div>
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
