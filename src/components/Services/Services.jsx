// src/components/Services/Services.jsx
import React from "react";
import { Container, Card } from "react-bootstrap";
import { FaCode, FaNetworkWired, FaComments } from "react-icons/fa";
import "./Services.css";

const services = [
  {
    title: "Web Development",
    icon: <FaCode aria-hidden="true" className="service-icon" />,
    text: "We create immersive, responsive websites that captivate visitors and drive engagement. Leveraging modern frameworks and design principles, our solutions deliver seamless performance, intuitive interfaces, and scalable architectures tailored to your business.",
  },
  {
    title: "Networking",
    icon: <FaNetworkWired aria-hidden="true" className="service-icon" />,
    text: "Our networking solutions provide robust, secure, and lightning-fast connectivity. We design and implement state-of-the-art infrastructures that ensure reliable communication, efficient data management, and enhanced collaboration for your organization.",
  },
  {
    title: "IT Consulting",
    icon: <FaComments aria-hidden="true" className="service-icon" />,
    text: "Transform your technology landscape with our strategic IT consulting. We assess your current systems, uncover growth opportunities, and implement innovative solutions that optimize operations, boost productivity, and secure long-term success.",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="services-section py-5"
      aria-labelledby="services-heading"
    >
      <Container>
        <h2 id="services-heading" className="services-heading text-center mb-4">
          Our Services
        </h2>
        <div className="services-grid">
          {services.map((svc) => (
            <Card className="service-card mb-4" key={svc.title}>
              <Card.Body className="p-4">
                {svc.icon}
                <Card.Title className="service-title">{svc.title}</Card.Title>
                <Card.Text className="service-text">{svc.text}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;
