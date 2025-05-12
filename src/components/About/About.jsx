// src/components/About/About.jsx
import React from "react";
import { Container } from "react-bootstrap";
import {
  FaLightbulb,
  FaShieldAlt,
  FaHandsHelping,
  FaCheckCircle,
} from "react-icons/fa";
import "./About.css";

const features = [
  "Craft state-of-the-art technology solutions tailored to your unique business challenges",
  "Fuse creative vision with innovative expertise",
  "Develop robust, intuitive digital experiences",
  "Drive your organization forward in today’s dynamic digital landscape",
];

const values = [
  {
    icon: <FaLightbulb aria-hidden="true" />,
    title: "Innovation",
    text: "We push boundaries with creative, future-focused technology.",
  },
  {
    icon: <FaShieldAlt aria-hidden="true" />,
    title: "Trust",
    text: "Your success and data security are at the heart of everything we do.",
  },
  {
    icon: <FaHandsHelping aria-hidden="true" />,
    title: "Support",
    text: "We partner with you every step of the way for ongoing excellence.",
  },
];

export default function About() {
  return (
    <section id="about" className="about-section">
      <Container className="about-container">
        <div className="about-grid">
          {/* LEFT: Illustration */}
          <figure className="about-figure" data-aos="fade-right">
            <img
              src="/about1.webp"
              alt="Team collaborating at ShannyTechSolutions"
              className="img-fluid about-img"
            />
            <figcaption className="about-figcaption">
              Our team crafting innovative digital solutions
            </figcaption>
          </figure>

          {/* RIGHT: Copy + Features + Values */}
          <div className="about-content">
            <h2 data-aos="fade-up">About Us</h2>
            <ul className="about-list">
              {features.map((feature, idx) => (
                <li key={idx} data-aos="fade-up" data-aos-delay={100 * idx}>
                  <FaCheckCircle className="about-icon" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="values-grid">
              {values.map((val, idx) => (
                <div
                  key={val.title}
                  className="value-card"
                  data-aos="fade-up"
                  data-aos-delay={400 + idx * 150}
                >
                  <div className="value-icon">{val.icon}</div>
                  <h3>{val.title}</h3>
                  <p>{val.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
