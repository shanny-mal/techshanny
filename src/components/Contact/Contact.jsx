import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.message) newErrors.message = "Message is required.";
    if (!captchaValue)
      newErrors.captcha = "Please verify that you are not a robot.";
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
      // Send email using EmailJS
      emailjs
        .send(
          "service_rupt02a",
          "template_fgddh3a",
          formData,
          "8fFyWaO5kSCdQc_XC"
        )
        .then(
          (result) => {
            console.log("Email successfully sent!", result.text);
            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
            setCaptchaValue(null);
          },
          (error) => {
            console.error("Failed to send email:", error.text);
          }
        );
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" className="contact-section py-5" data-aos="fade-up">
      <Container>
        <h2 className="contact-heading text-center mb-4">Contact Us</h2>
        {submitted && (
          <Alert variant="success">
            Your message has been sent successfully!
          </Alert>
        )}
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              aria-required="true"
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              aria-required="true"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formMessage" className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={4}
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              isInvalid={!!errors.message}
              aria-required="true"
            />
            <Form.Control.Feedback type="invalid">
              {errors.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
            />
            {errors.captcha && (
              <div className="text-danger">{errors.captcha}</div>
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
      </Container>
    </section>
  );
};

export default Contact;
