import React, { useState } from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import "./Portfolio.css";

const Portfolio = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Responsive Corporate Website",
      image: "/assets/project1.jpg",
      description:
        "Developed a state-of-the-art corporate website emphasizing user experience and performance.",
      details:
        "In-depth case study: Our responsive corporate website increased engagement and conversion rates by leveraging modern design principles and robust development techniques.",
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      image: "/assets/project2.jpg",
      description:
        "Engineered a robust e-commerce solution with secure payment integration and intuitive navigation.",
      details:
        "Detailed case study: Our e-commerce platform provided a seamless shopping experience that boosted online sales and improved customer retention.",
    },
    {
      id: 3,
      title: "Enterprise Network Infrastructure",
      image: "/assets/project3.jpg",
      description:
        "Designed and implemented a scalable, secure network infrastructure for large enterprises.",
      details:
        "Detailed case study: Our enterprise network infrastructure ensured maximum uptime and efficient data flow through state-of-the-art design and implementation.",
    },
  ];

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setModalShow(true);
  };

  return (
    <section
      id="portfolio"
      className="portfolio-section py-5"
      data-aos="fade-up"
    >
      <Container>
        <h2 className="portfolio-heading text-center mb-4">Our Portfolio</h2>
        <Row>
          {projects.map((project) => (
            <Col md={4} key={project.id}>
              <Card
                className="portfolio-card mb-4"
                onClick={() => handleCardClick(project)}
                style={{ cursor: "pointer" }}
              >
                <div className="card-img-container">
                  <Card.Img
                    variant="top"
                    src={project.image}
                    className="portfolio-card-img"
                    loading="lazy"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="portfolio-card-title">
                    {project.title}
                  </Card.Title>
                  <Card.Text className="portfolio-card-text">
                    {project.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
        aria-labelledby="project-modal-title"
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
                alt={selectedProject.title}
                className="img-fluid mb-3"
              />
              <p>{selectedProject.details}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalShow(false)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </section>
  );
};

export default Portfolio;
