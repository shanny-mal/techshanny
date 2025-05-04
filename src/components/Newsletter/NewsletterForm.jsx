// src/components/Newsletter/NewsletterForm.jsx
import React, { useState } from "react";
import { Form, Button, Modal, ToastContainer, Toast } from "react-bootstrap";
import "./NewsletterForm.css";

const API_URL = import.meta.env.VITE_NEWSLETTER_API_URL || "/api/subscribe";

const NewsletterForm = ({
  modal = false,
  show = false,
  onClose = () => {},
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast({ show: false, message: "", variant: "" });

    if (!validateEmail(email.trim())) {
      return setToast({
        show: true,
        message: "Please enter a valid email address.",
        variant: "danger",
      });
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error("Subscription failed");
      setToast({
        show: true,
        message: "Thank you! Check your inbox for confirmation.",
        variant: "success",
      });
      setEmail("");
      if (modal) onClose();
    } catch (err) {
      console.error(err);
      setToast({
        show: true,
        message: err.message || "Something went wrong.",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const form = (
    <Form className="newsletter-form" onSubmit={handleSubmit}>
      <Form.Group controlId="newsletter-email" className="mb-2">
        <Form.Control
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </Form.Group>
      <Button type="submit" disabled={loading}>
        {loading ? "Subscribing…" : "Subscribe"}
      </Button>
    </Form>
  );

  return (
    <>
      {modal ? (
        <Modal show={show} onHide={onClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Join Our Newsletter</Modal.Title>
          </Modal.Header>
          <Modal.Body>{form}</Modal.Body>
        </Modal>
      ) : (
        <div className="newsletter-inline">{form}</div>
      )}

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toast.variant}
          onClose={() => setToast((t) => ({ ...t, show: false }))}
          show={toast.show}
          delay={4000}
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default NewsletterForm;
