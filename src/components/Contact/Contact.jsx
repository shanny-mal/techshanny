// src/components/Contact/Contact.jsx
import React, { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

// Load EmailJS config from environment
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validate form fields + honeypot + captcha
  const validate = () => {
    const newErrors = {};
    if (formData.website) newErrors.website = "Bot detected."; // honeypot
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.message) newErrors.message = "Message is required.";
    if (!captchaValue) newErrors.captcha = "Please verify you are not a robot.";
    return newErrors;
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // CAPTCHA change handler
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID);
        toast.success("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "", website: "" });
        setCaptchaValue(null);
      } catch (err) {
        console.error("EmailJS error:", err);
        toast.error("Failed to send message. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      // Show each validation error (except honeypot)
      Object.entries(newErrors).forEach(([field, msg]) => {
        if (field !== "website") toast.error(msg);
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
          {/* Honeypot field (hidden) */}
          <div className="visually-hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          {/* Name Field */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <div id="name-error" className="invalid-feedback">
                {errors.name}
              </div>
            )}
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <div id="email-error" className="invalid-feedback">
                {errors.email}
              </div>
            )}
          </Form.Group>

          {/* Message Field */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="message">Message</Form.Label>
            <Form.Control
              id="message"
              as="textarea"
              name="message"
              rows={4}
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <div id="message-error" className="invalid-feedback">
                {errors.message}
              </div>
            )}
          </Form.Group>

          {/* CAPTCHA */}
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

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            aria-label="Submit Contact Form"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Sending...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>

        {/* Global toast container */}
        <ToastContainer position="top-right" autoClose={5000} />
      </Container>
    </section>
  );
};

export default Contact;
