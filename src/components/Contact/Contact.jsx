// src/components/Contact/Contact.jsx
import React, { useState, useEffect, useRef } from "react";
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  // Show microcopy hints on focus
  useEffect(() => {
    const inputs = formRef.current.querySelectorAll("input, textarea");
    inputs.forEach((el) => {
      const hint = el.nextElementSibling;
      el.addEventListener("focus", () => hint.classList.add("visible"));
      el.addEventListener("blur", () => hint.classList.remove("visible"));
    });
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleCaptchaChange = (val) => setCaptchaValue(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID);
        toast.success("Your message has been sent!");
        setFormData({ name: "", email: "", message: "", website: "" });
        setCaptchaValue(null);
      } catch {
        toast.error("Failed to send. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      Object.entries(newErrors).forEach(([f, msg]) => {
        if (f !== "website") toast.error(msg);
      });
    }
  };

  return (
    <section id="contact" className="contact-section" data-aos="fade-up">
      <Container className="contact-container">
        {/* Interactive Map */}
        <div className="map-wrapper">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3461.5961535915403!2d28.846323474746004!3d-16.51659034115191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x193885a94716c959%3A0x450db268f791b18a!2sShanny%20Tech%20Solutions!5e1!3m2!1sen!2szw!4v1747048204505!5m2!1sen!2szw"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Floating Contact Card */}
        <div className="contact-card">
          <h3>Contact Us</h3>
          <Form ref={formRef} onSubmit={handleSubmit} noValidate>
            {/* honeypot */}
            <input
              type="text"
              name="website"
              className="visually-hidden"
              value={formData.website}
              onChange={handleChange}
            />

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                required
              />
              <div className="form-hint">First and last name.</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                required
              />
              <div className="form-hint">Where we can reach you.</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                name="message"
                as="textarea"
                rows={4}
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                isInvalid={!!errors.message}
                required
              />
              <div className="form-hint">Briefly describe your request.</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Sending…
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </div>
      </Container>
      <ToastContainer position="top-right" autoClose={5000} />
    </section>
  );
}
