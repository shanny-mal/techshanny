// src/components/About/About.jsx
import React from "react";
import { Container } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import "./About.css";

const features = [
  "Craft state-of-the-art technology solutions tailored to your unique business challenges",
  "Fuse creative vision with innovative expertise",
  "Develop robust, intuitive digital experiences",
  "Drive your organization forward in today’s dynamic digital landscape",
];

const About = () => {
  return (
    <section id="about" className="about-section">
      <Container className="about-container">
        <div className="about-grid">
          {/* Text content with bullet list */}
          <div className="about-content">
            <h2>About Us</h2>
            <ul className="about-list">
              {features.map((feature, idx) => (
                <li key={idx}>
                  <FaCheckCircle aria-hidden="true" className="about-icon" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Semantic figure for image */}
          <figure className="about-figure">
            <img
              src="/about1.webp"
              alt="Team collaborating at ShannyTechSolutions"
              className="img-fluid about-img"
            />
            <figcaption className="about-figcaption">
              Our team crafting innovative digital solutions
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
};

export default About;
