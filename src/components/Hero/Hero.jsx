// src/components/Hero/Hero.jsx
import React, { useCallback } from "react";
import { Container, Button } from "react-bootstrap";
import "./Hero.css";

const slides = [
  { id: 1, src: "/image1.jpg", alt: "Team working together", loading: "eager" },
  {
    id: 2,
    src: "/image2.jpg",
    alt: "Innovative tech solutions",
    loading: "lazy",
  },
  { id: 3, src: "/image3.jpg", alt: "Consulting session", loading: "lazy" },
];

export default function Hero() {
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleRipple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.offsetLeft - diameter / 2}px`;
    circle.style.top = `${e.clientY - btn.offsetTop - diameter / 2}px`;
    circle.classList.add("ripple");
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-slider">
        {slides.map((s, i) => (
          <img
            key={s.id}
            className="hero-slide"
            src={s.src}
            alt={s.alt}
            loading={s.loading}
          />
        ))}
      </div>
      <div className="hero-overlay" />

      <Container className="hero-content text-center">
        <h1>Empowering Your Digital Future</h1>
        <p>Your technology partner for bespoke innovation &amp; growth</p>

        <div className="hero-ctas">
          <Button
            variant="primary"
            className="hero-btn"
            onClick={(e) => {
              handleRipple(e);
              scrollTo("about");
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outline-light"
            className="hero-btn-secondary"
            onClick={(e) => {
              handleRipple(e);
              scrollTo("contact");
            }}
          >
            Request Demo
          </Button>
        </div>

        <div
          className="scroll-down"
          onClick={() => scrollTo("about")}
          role="button"
          tabIndex={0}
          aria-label="Scroll down to About"
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && scrollTo("about")
          }
        >
          ↓
        </div>
      </Container>
    </section>
  );
}
