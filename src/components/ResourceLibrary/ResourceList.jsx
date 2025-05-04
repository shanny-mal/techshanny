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
  Alert,
} from "react-bootstrap";
import ResourceCard from "./ResourceCard.jsx";
import { supabase } from "../../supabaseClient.js";

const MAILCHIMP_ENDPOINT = import.meta.env.VITE_MAILCHIMP_ENDPOINT;

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [pendingResource, setPendingResource] = useState(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // 1) Fetch resources
  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("id, title, description, file_url, category");
      if (error) {
        console.error("Failed to load resources:", error);
        return;
      }
      setResources(data);
      setFiltered(data);
      const cats = Array.from(
        new Set(data.map((r) => r.category).filter(Boolean))
      );
      setCategories(["All", ...cats]);
    };
    fetchResources();
  }, []);

  // 2) Filter whenever category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFiltered(resources);
    } else {
      setFiltered(resources.filter((r) => r.category === selectedCategory));
    }
  }, [selectedCategory, resources]);

  // 3) Kick off gating modal
  const handleDownloadClick = (resource) => {
    setPendingResource(resource);
    setEmail("");
    setError("");
    setShowModal(true);
  };

  // 4) On form submit, call Mailchimp then trigger download
  const handleSignupAndDownload = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("Please enter a valid email address.");
      }
      // Send to your Mailchimp subscribe webhook
      const res = await fetch(MAILCHIMP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Subscription failed.");
      }
      // After subscribe, start download
      window.location.href = pendingResource.file_url;
      setShowModal(false);
    } catch (err) {
      console.error("Mailchimp error:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Resource Library</h2>

      {/* Category filters */}
      <ButtonGroup className="mb-4">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === selectedCategory ? "primary" : "outline-primary"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </ButtonGroup>

      {/* Grid of cards */}
      <Row xs={1} sm={2} lg={3} className="g-4">
        {filtered.map((res) => (
          <Col key={res.id}>
            <ResourceCard resource={res} onDownload={handleDownloadClick} />
          </Col>
        ))}
      </Row>

      {/* Email‑gate modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSignupAndDownload}>
          <Modal.Header closeButton>
            <Modal.Title>Just one more step…</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Enter your email to unlock the download for{" "}
              <strong>{pendingResource?.title}</strong>.
            </p>
            <Form.Group controlId="signupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
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
                <Spinner animation="border" size="sm" />
              ) : (
                "Unlock Download"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ResourceList;
