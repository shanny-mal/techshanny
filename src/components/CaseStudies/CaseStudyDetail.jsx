import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import api from "../../services/api.js";
import "./CaseStudyDetail.css";

export default function CaseStudyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const data = await api.getOne("case-studies", id);
        setCaseStudy(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOne();
  }, [id]);

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
        <Alert variant="danger">Error loading case study: {error}</Alert>
      </Container>
    );
  }

  if (!caseStudy) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Case study not found.</Alert>
        <Button variant="link" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="case-study-detail py-5">
      <Button variant="link" onClick={() => navigate(-1)}>
        ← Back to Case Studies
      </Button>
      <h1 className="mt-3">{caseStudy.title}</h1>
      <p className="text-muted">
        Published{" "}
        {new Date(
          caseStudy.created_at || caseStudy.published_at
        ).toLocaleDateString()}
      </p>

      {caseStudy.image_url && (
        <img
          src={caseStudy.image_url}
          alt={caseStudy.title}
          className="detail-image mb-4"
          loading="lazy"
        />
      )}

      <div
        className="case-study-content"
        dangerouslySetInnerHTML={{ __html: caseStudy.content }}
      />
    </Container>
  );
}
