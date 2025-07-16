import ContactForm from "../forms/ContactForm";
import { motion } from "framer-motion";
import contactIllustration from "../../assets/images/contact-illustration.jpg";
import "./ContactSection.css";

export default function ContactSection() {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="contact"
      initial="hidden"
      animate="visible"
      variants={container}
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="contact-grid max-w-6xl mx-auto">
        <motion.div variants={item} className="contact-image">
          <img src={contactIllustration} alt="Contact us" />
        </motion.div>
        <motion.div variants={item} className="contact-form-wrapper">
          <h2 id="contact-heading" className="contact-title">
            Let’s Work Together
          </h2>
          <p className="contact-subtitle">
            Whether you have a project in mind or questions, fill out the form
            and our team will get back to you shortly.
          </p>
          <ContactForm />
        </motion.div>
      </div>
    </motion.section>
  );
}
