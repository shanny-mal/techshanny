// src/components/Hero/Hero.jsx
import React, { useCallback } from "react";
import { Container, Button } from "react-bootstrap";
import "./Hero.css";

const slides = [
  {
    id: 1,
    src: "/image1.jpg",
    srcSet:
      "/image1.jpg 600w, /image1.jpg 900w, /image1.jpg 1200w",
    sizes: "(max-width: 768px) 100vw, 50vw",
    alt: "Team working together",
    loading: "eager",
  },
  {
    id: 2,
    src: "/image2.jpg",
    srcSet:
      "/image2.jpg 600w, /image2.jpg 900w, /image2.jpg 1200w",
    sizes: "(max-width: 768px) 100vw, 50vw",
    alt: "Innovative tech solutions",
    loading: "lazy",
  },
  {
    id: 3,
    src: "/image3.jpg",
    srcSet:
      "/image3.jpg 600w, /image3.jpg 900w, /image3.jpg 1200w",
    sizes: "(max-width: 768px) 100vw, 50vw",
    alt: "Consulting session",
    loading: "lazy",
  },
];

const Hero = () => {
  const handleGetStarted = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const onButtonKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleGetStarted();
      }
    },
    [handleGetStarted]
  );

  return (
    <section className="hero-section" id="home">
      <div className="hero-slider">
        {slides.map((slide) => (
          <img
            key={slide.id}
            className="hero-slide"
            src={slide.src}
            srcSet={slide.srcSet}
            sizes={slide.sizes}
            alt={slide.alt}
            loading={slide.loading}
          />
        ))}
      </div>
      <div className="hero-overlay"></div>
      <Container className="hero-content text-center">
        <h1>Welcome to ShannyTechSolutions</h1>
        <p>Your technology partner for innovation</p>
        <Button
          className="hero-btn"
          onClick={handleGetStarted}
          onKeyDown={onButtonKeyDown}
        >
          Get Started
        </Button>
      </Container>
    </section>
  );
};

export default Hero;
