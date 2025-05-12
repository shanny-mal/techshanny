// src/components/Portfolio/Portfolio.jsx
import React, { useState, useCallback, useMemo } from "react";
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
      "Developed a state-of-the-art corporate website emphasizing UX and performance.",
    details:
      "Our responsive corporate website increased engagement and conversion rates by leveraging modern design principles and robust development techniques.",
    tags: ["Web", "UI/UX"],
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    image: "/e1.jpg",
    srcSet: "/e1.jpg 600w, /e1.jpg 900w, /e1.jpg 1200w",
    sizes: "(max-width: 768px) 100vw, 33vw",
    description:
      "Engineered a robust e-commerce solution with secure payments and intuitive navigation.",
    details:
      "Our platform provided a seamless shopping experience that boosted online sales and improved customer retention.",
    tags: ["E-Commerce", "Backend"],
  },
  {
    id: 3,
    title: "Enterprise Network Infrastructure",
    image: "/n1.jpg",
    srcSet: "/n1.jpg 600w, /n1.jpg 900w, /n1.jpg 1200w",
    sizes: "(max-width: 768px) 100vw, 33vw",
    description:
      "Designed and implemented scalable, secure network infrastructure for large enterprises.",
    details:
      "Ensured maximum uptime and efficient data flow with state-of-the-art design and implementation.",
    tags: ["Networking", "Security"],
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [modalShow, setModalShow] = useState(false);
  const [selected, setSelected] = useState(null);

  // derive unique tag list
  const tagList = useMemo(() => {
    const all = projects.flatMap((p) => p.tags);
    return ["All", ...Array.from(new Set(all))];
  }, []);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.tags.includes(filter));
  }, [filter]);

  const openModal = useCallback((project) => {
    setSelected(project);
    setModalShow(true);
  }, []);

  return (
    <section
      id="portfolio"
      className="portfolio-section"
      aria-labelledby="portfolio-heading"
    >
      <Container>
        <h2
          id="portfolio-heading"
          className="portfolio-heading text-center mb-4"
        >
          Our Portfolio
        </h2>

        {/* Tag filter menu */}
        <ul className="portfolio-filters">
          {tagList.map((tag) => (
            <li key={tag}>
              <button
                className={filter === tag ? "active" : ""}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>

        <div className="portfolio-grid">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="portfolio-card"
              role="button"
              tabIndex={0}
              onClick={() => openModal(proj)}
              onKeyDown={(e) => {
                if (e.key.match(/Enter| /)) {
                  e.preventDefault();
                  openModal(proj);
                }
              }}
            >
              <div className="card-img-container">
                <img
                  src={proj.image}
                  srcSet={proj.srcSet}
                  sizes={proj.sizes}
                  alt={proj.title}
                  className="portfolio-card-img"
                  loading="lazy"
                />
                <div className="card-overlay">
                  <h3>{proj.title}</h3>
                </div>
              </div>
              <div className="portfolio-card-body">
                <p className="portfolio-card-text">{proj.description}</p>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            centered
            aria-labelledby="project-modal-title"
            aria-describedby="project-modal-desc"
          >
            <Modal.Header closeButton>
              <Modal.Title id="project-modal-title">
                {selected.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selected.image}
                srcSet={selected.srcSet}
                sizes={selected.sizes}
                alt={selected.title}
                className="img-fluid mb-3"
                loading="lazy"
              />
              <p id="project-modal-desc">{selected.details}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalShow(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </section>
  );
}
