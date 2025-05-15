import React, { useState, useEffect } from "react";
import { Container, Carousel, Row, Col, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Idris Chipezeze",
    role: "Developer, AgriTech",
    message:
      "ShannyTechSolutions transformed our online presence with their innovative web development solutions.",
  },
  {
    id: 2,
    name: "Shahyana Macklin",
    role: "Artist, Tech Innovations",
    message:
      "Their networking solutions are robust and reliable. Our communication has never been smoother.",
  },
  {
    id: 3,
    name: "Malvin Ntini",
    role: "Marketing Director, Creative Media",
    message:
      "The IT consulting services provided strategic insights that boosted our operational efficiency.",
  },
];

// Helper: chunk array into subarrays of given size
const chunkArray = (arr, size) =>
  arr.reduce((chunks, item, idx) => {
    const chunkIndex = Math.floor(idx / size);
    chunks[chunkIndex] = chunks[chunkIndex] || [];
    chunks[chunkIndex].push(item);
    return chunks;
  }, []);

export default function Testimonials() {
  // Track window width to decide grouping
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateCols = () => setColumns(window.innerWidth >= 768 ? 2 : 1);
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const slides = chunkArray(testimonials, columns);

  return (
    <section
      id="testimonials"
      className="testimonials-section py-5"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <h2
          id="testimonials-heading"
          className="testimonials-heading text-center mb-4"
        >
          What Our Clients Say
        </h2>

        <Carousel
          pause="hover"
          keyboard
          controls={true}
          indicators={slides.length > 1}
          prevIcon={<FaChevronLeft aria-label="Previous" />}
          nextIcon={<FaChevronRight aria-label="Next" />}
        >
          {slides.map((group, slideIndex) => (
            <Carousel.Item key={slideIndex}>
              <Row className="justify-content-center">
                {group.map((t) => (
                  <Col
                    key={t.id}
                    xs={12}
                    md={6}
                    className="d-flex align-items-stretch"
                  >
                    <div className="testimonial-card p-4 m-2">
                      <p className="testimonial-message">“{t.message}”</p>
                      <h5 className="testimonial-name">{t.name}</h5>
                      <p className="testimonial-role">{t.role}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
