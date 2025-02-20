// src/components/Hero.jsx
import React from "react";
import { Container, Button } from "react-bootstrap";

const Hero = () => {
  const heroStyle = {
    backgroundImage: "url(/assets/hero-image.jpg)", // Place your image in the public/assets folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    padding: "100px 0",
  };

  return (
    <section id="home" style={heroStyle} className="text-center">
      <Container>
        <h1>Welcome to ShannyTechSolutions</h1>
        <p>Your technology partner for innovative solutions</p>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </Container>
    </section>
  );
};

export default Hero;
