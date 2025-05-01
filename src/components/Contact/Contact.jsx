// src/components/Contact/Contact.jsx
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    // Honeypot
    if (formData.website) {
      newErrors.website = "Bot detected.";
    }
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.message) newErrors.message = "Message is required.";
    if (!captchaValue) newErrors.captcha = "Please verify you are not a robot.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      emailjs
        .send(
          "service_rupt02a",
          "template_fgddh3a",
          formData,
          "8fFyWaO5kSCdQc_XC"
        )
        .then(
          () => {
            toast.success("Your message has been sent successfully!");
            setFormData({ name: "", email: "", message: "", website: "" });
            setCaptchaValue(null);
            setErrors({});
          },
          () => {
            toast.error("Failed to send message. Please try again later.");
          }
        );
    } else {
      setErrors(newErrors);
      Object.values(newErrors).forEach((msg) => {
        if (msg !== "Bot detected.") toast.error(msg);
      });
    }
  };

  return (
    <section
      id="contact"
      className="contact-section py-5"
      data-aos="fade-up"
      aria-labelledby="contact-heading"
    >
      <Container>
        <h2 id="contact-heading" className="contact-heading text-center mb-4">
          Contact Us
        </h2>

        <Form onSubmit={handleSubmit} noValidate>
          {/* Honeypot field */}
          <Form.Group controlId="website" className="visually-hidden">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group controlId="name" className="mb-3">
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div id="name-error" className="invalid-feedback">
                {errors.name}
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label htmlFor="email">Email address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div id="email-error" className="invalid-feedback">
                {errors.email}
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="message" className="mb-3">
            <Form.Label htmlFor="message">Message</Form.Label>
            <Form.Control
              id="message"
              as="textarea"
              name="message"
              rows={4}
              placeholder="Your message"
              required
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <div id="message-error" className="invalid-feedback">
                {errors.message}
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
            />
            {errors.captcha && (
              <div id="captcha-error" className="invalid-feedback">
                {errors.captcha}
              </div>
            )}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            aria-label="Submit Contact Form"
          >
            Submit
          </Button>
        </Form>

        <ToastContainer position="top-right" autoClose={5000} />
      </Container>
    </section>
  );
};

export default Contact;
