import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Modal,
  Form,
  Spinner,
  Accordion,
  Alert,
} from "react-bootstrap";
import ResourceCard from "./ResourceCard.jsx";
import api from "../../services/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Resources.css";

const MAILCHIMP_ENDPOINT = import.meta.env.VITE_MAILCHIMP_ENDPOINT;

export default function ResourceList() {
  const [resources, setResources] = useState([]);
  const [topicFilter, setTopicFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [pending, setPending] = useState(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mailError, setMailError] = useState("");

  // 1) Load & transform
  useEffect(() => {
    let isActive = true;
    const loadResources = async () => {
      setLoading(true);
      try {
        const data = await api.getList("resources");
        if (!isActive) return;

        // Transform fields
        const enriched = data.map((r) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          download_url: r.file_url,
          topic: r.category || "General",
          year: new Date(r.published_at).getFullYear().toString(),
        }));
        setResources(enriched);
      } catch (err) {
        console.error(err);
        if (isActive) setError("Failed to load resources.");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadResources();
    return () => {
      isActive = false;
    };
  }, []);

  // 2) Compute filter options
  const topics = useMemo(() => {
    const uniq = Array.from(new Set(resources.map((r) => r.topic)));
    return ["All", ...uniq];
  }, [resources]);
  const years = useMemo(() => {
    const uniq = Array.from(new Set(resources.map((r) => r.year)));
    return ["All", ...uniq.sort((a, b) => b - a)];
  }, [resources]);

  // 3) Filtered list
  const filtered = useMemo(() => {
    return resources.filter((r) => {
      return (
        (topicFilter === "All" || r.topic === topicFilter) &&
        (yearFilter === "All" || r.year === yearFilter)
      );
    });
  }, [resources, topicFilter, yearFilter]);

  // 4) Handle download click
  const onDownload = (res) => {
    setPending(res);
    setEmail("");
    setMailError("");
    setShowModal(true);
  };

  // 5) Mailchimp signup + download
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMailError("");
    try {
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("Please enter a valid email address.");
      }
      const resp = await fetch(MAILCHIMP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        throw new Error(body.error || "Subscription failed.");
      }
      toast.success("Subscribed! Downloading now…");
      window.location.href = pending.download_url;
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setMailError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // 6) Render
  if (loading) {
    return (
      <section className="resources-section py-5 text-center">
        <Spinner animation="border" role="status" />
      </section>
    );
  }
  if (error) {
    return (
      <section className="resources-section py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </section>
    );
  }

  return (
    <Container className="resources-section py-5">
      <h2 className="mb-4">Resource Library</h2>

      {/* Desktop filters */}
      <div className="filter-bar d-none d-md-flex mb-4">
        <ButtonGroup className="me-3">
          {topics.map((t) => (
            <Button
              key={t}
              variant={t === topicFilter ? "primary" : "outline-primary"}
              onClick={() => setTopicFilter(t)}
            >
              {t}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup>
          {years.map((y) => (
            <Button
              key={y}
              variant={y === yearFilter ? "primary" : "outline-primary"}
              onClick={() => setYearFilter(y)}
            >
              {y}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Mobile accordion */}
      <Accordion className="d-md-none mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filters</Accordion.Header>
          <Accordion.Body>
            <Form.Label>Topic</Form.Label>
            <Form.Select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="mb-3"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Form.Select>

            <Form.Label>Year</Form.Label>
            <Form.Select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Results */}
      {filtered.length === 0 ? (
        <Alert variant="secondary" className="text-center py-5">
          No resources match your filters.
        </Alert>
      ) : (
        <Row xs={1} sm={2} lg={3} className="g-4">
          {filtered.map((res) => (
            <Col key={res.id}>
              <ResourceCard resource={res} onDownload={onDownload} />
            </Col>
          ))}
        </Row>
      )}

      {/* Email-gate modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        aria-labelledby="download-modal-title"
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="download-modal-title">
              Unlock “{pending?.title}”
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Enter your email to download:</Form.Label>
            <Form.Group controlId="mcEmail">
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!mailError}
                required
              />
              <Form.Control.Feedback type="invalid">
                {mailError}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Unlock Download"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastContainer position="top-right" autoClose={5000} />
    </Container>
  );
}
