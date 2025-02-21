import React from "react";
import { Container, Carousel } from "react-bootstrap";
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

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="testimonials-section py-5"
      data-aos="fade-up"
    >
      <Container>
        <h2 className="testimonials-heading text-center mb-4">
          What Our Clients Say
        </h2>
        <Carousel>
          {testimonials.map((testimonial) => (
            <Carousel.Item key={testimonial.id}>
              <div className="testimonial-item text-center">
                <p className="testimonial-message">"{testimonial.message}"</p>
                <h5 className="testimonial-name">{testimonial.name}</h5>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default Testimonials;
