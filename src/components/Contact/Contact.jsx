// src/components/Contact.jsx
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./Contact.css"; // Import custom CSS

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Integrate your form submission logic here (e.g., an API call)
  };

  return (
    <section id="contact" className="contact-section">
      <Container>
        <h2 className="contact-heading">Contact Us</h2>
        <Form onSubmit={handleSubmit} className="contact-form">
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formMessage" className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={3}
              placeholder="Your message"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="contact-btn">
            Submit
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default Contact;
