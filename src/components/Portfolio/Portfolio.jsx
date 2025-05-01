// src/components/Portfolio/Portfolio.jsx
import React, { useState, useCallback } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import "./Portfolio.css";

const projects = [
  {
    id: 1,
    title: "Responsive Corporate Website",
    image: "/c1.jpg",
    srcSet: "/c1.jpg 600w, /c1.jpg 900w, /c1.jpg 1200w",
    sizes: "(max-width: 768px) 100vw, 33vw",
    description:
      "Developed a state-of-the-art corporate website emphasizing user experience and performance.",
    details:
      "In-depth case study: Our responsive corporate website increased engagement and conversion rates by leveraging modern design principles and robust development techniques.",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    image: "/e1.jpg",
    srcSet: "/e1.jpg 600w, /e1.jpg 900w, /e1.jpg 1200w",
    sizes: "(max-width: 768px) 100vw, 33vw",
    description:
      "Engineered a robust e-commerce solution with secure payment integration and intuitive navigation.",
    details:
      "Detailed case study: Our e-commerce platform provided a seamless shopping experience that boosted online sales and improved customer retention.",
  },
  {
    id: 3,
    title: "Enterprise Network Infrastructure",
    image: "/n1.jpg",
    srcSet: "/n1.jpg 600w, /n1.jpg 900w, /n1.jpg 1200w",
    sizes: "(max-width: 768px) 100vw, 33vw",
    description:
      "Designed and implemented a scalable, secure network infrastructure for large enterprises.",
    details:
      "Detailed case study: Our enterprise network infrastructure ensured maximum uptime and efficient data flow through state-of-the-art design and implementation.",
  },
];

const Portfolio = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = useCallback((project) => {
    setSelectedProject(project);
    setModalShow(true);
  }, []);

  const handleKeyDown = useCallback(
    (e, project) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick(project);
      }
    },
    [handleCardClick]
  );

  const handleClose = () => setModalShow(false);

  return (
    <section
      id="portfolio"
      className="portfolio-section py-5"
      data-aos="fade-up"
      aria-labelledby="portfolio-heading"
    >
      <Container>
        <h2
          id="portfolio-heading"
          className="portfolio-heading text-center mb-4"
        >
          Our Portfolio
        </h2>
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="portfolio-card"
              role="button"
              tabIndex="0"
              onClick={() => handleCardClick(project)}
              onKeyDown={(e) => handleKeyDown(e, project)}
            >
              <div className="card-img-container">
                <img
                  src={project.image}
                  srcSet={project.srcSet}
                  sizes={project.sizes}
                  alt={project.title}
                  className="portfolio-card-img"
                  loading="lazy"
                />
              </div>
              <div className="portfolio-card-body">
                <h3 className="portfolio-card-title">{project.title}</h3>
                <p className="portfolio-card-text">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Modal
          show={modalShow}
          onHide={handleClose}
          centered
          role="dialog"
          aria-labelledby="project-modal-title"
          aria-describedby="project-modal-desc"
        >
          {selectedProject && (
            <>
              <Modal.Header closeButton>
                <Modal.Title id="project-modal-title">
                  {selectedProject.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={selectedProject.image}
                  srcSet={selectedProject.srcSet}
                  sizes={selectedProject.sizes}
                  alt={selectedProject.title}
                  className="img-fluid mb-3"
                  loading="lazy"
                />
                <p id="project-modal-desc">{selectedProject.details}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </Container>
    </section>
  );
};

export default Portfolio;
