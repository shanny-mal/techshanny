import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api.js";
import "./CaseStudyList.css";

export default function CaseStudyList() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        // api.getList returns an array of objects
        const data = await api.getList("case-studies");
        setCaseStudies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Error loading case studies: {error}</Alert>
      </Container>
    );
  }

  if (caseStudies.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="info">No case studies available yet.</Alert>
      </Container>
    );
  }

  return (
    <section id="case-studies" className="case-studies-section py-5">
      <Container>
        <h2 className="mb-4 text-center">Case Studies</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {caseStudies.map((cs) => (
            <Col key={cs.id}>
              <Card className="h-100 case-study-card">
                {cs.image_url && (
                  <Card.Img
                    variant="top"
                    src={cs.image_url}
                    alt={cs.title}
                    className="case-study-img"
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{cs.title}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {cs.excerpt || cs.content.slice(0, 100) + "…"}
                  </Card.Text>
                  <Button
                    as={Link}
                    to={`/case-studies/${cs.id}`}
                    variant="outline-primary"
                  >
                    Read More →
                  </Button>
                </Card.Body>
                <Card.Footer className="text-muted small">
                  Published{" "}
                  {new Date(
                    cs.created_at || cs.published_at
                  ).toLocaleDateString()}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
