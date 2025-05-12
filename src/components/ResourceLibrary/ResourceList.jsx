// src/components/Resources/ResourceList.jsx
import React, { useState, useEffect } from "react";
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
} from "react-bootstrap";
import ResourceCard from "./ResourceCard.jsx";
import { supabase } from "../../supabaseClient.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Resources.css";

const MAILCHIMP_ENDPOINT = import.meta.env.VITE_MAILCHIMP_ENDPOINT;

export default function ResourceList() {
  const [resources, setResources] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [topics, setTopics] = useState([]);
  const [years, setYears] = useState([]);
  const [topicFilter, setTopicFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [pending, setPending] = useState(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // 1) Fetch resources from Supabase
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("id, title, description, download_url, topic, created_at");

      if (error) {
        console.error("Failed to load resources:", error);
        return;
      }

      // Enrich each resource with a `year` field
      data.forEach((r) => {
        r.year = new Date(r.created_at).getFullYear().toString();
      });

      setResources(data);
      setFiltered(data);

      // Build topic filter list
      const uniqueTopics = Array.from(
        new Set(data.map((r) => r.topic).filter(Boolean))
      );
      setTopics(["All", ...uniqueTopics]);

      // Build year filter list (sorted descending)
      const uniqueYears = Array.from(new Set(data.map((r) => r.year)));
      setYears(["All", ...uniqueYears.sort((a, b) => b - a)]);
    })();
  }, []);

  // 2) Apply filters whenever selection changes
  useEffect(() => {
    let out = resources;
    if (topicFilter !== "All") {
      out = out.filter((r) => r.topic === topicFilter);
    }
    if (yearFilter !== "All") {
      out = out.filter((r) => r.year === yearFilter);
    }
    setFiltered(out);
  }, [topicFilter, yearFilter, resources]);

  // Open the email-gate modal
  const onDownload = (resource) => {
    setPending(resource);
    setEmail("");
    setError("");
    setShowModal(true);
  };

  // Handle Mailchimp signup + download
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("Please enter a valid email address.");
      }
      const res = await fetch(MAILCHIMP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Subscription failed.");
      }
      toast.success("Subscribed! Download starting…");
      // Trigger the actual download
      window.location.href = pending.download_url;
      setShowModal(false);
    } catch (err) {
      console.error("Mailchimp error:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

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

      {/* Mobile accordion filters */}
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

      {/* Resource cards */}
      <Row xs={1} sm={2} lg={3} className="g-4">
        {filtered.map((res) => (
          <Col key={res.id}>
            <ResourceCard resource={res} onDownload={onDownload} />
          </Col>
        ))}
      </Row>

      {/* Email-gate modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Unlock “{pending?.title}”</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Enter your email to download:</p>
            <Form.Group controlId="mcEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!error}
                required
              />
              <Form.Control.Feedback type="invalid">
                {error}
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
