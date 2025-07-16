// src/components/sections/NewsletterSection.jsx
import NewsletterForm from "../forms/NewsletterForm";
import { motion } from "framer-motion";
import "./NewsletterSection.css";

export default function NewsletterSection() {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={container}
      className="newsletter-section py-20"
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          id="newsletter-heading"
          className="newsletter-title"
          variants={item}
        >
          Stay Updated
        </motion.h2>
        <motion.p className="newsletter-subtitle" variants={item}>
          Join our newsletter for product updates, tutorials, and exclusive
          insights from the shannyTech team.
        </motion.p>
        <motion.div variants={item}>
          <NewsletterForm />
        </motion.div>
      </div>
    </motion.section>
  );
}
