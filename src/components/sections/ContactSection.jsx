// src/components/sections/ContactSection.jsx
import ContactForm from "../forms/ContactForm";
import { motion } from "framer-motion";
import contactIllustration from "../../assets/images/contact-illustration.jpg";

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
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-20 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 px-4 sm:px-6 lg:px-8 items-center">
        <motion.div variants={item} className="hidden lg:block">
          <img
            src={contactIllustration}
            alt="Contact illustration"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </motion.div>
        <motion.div
          variants={item}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
        >
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
          >
            Let's Work Together
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Whether you have a project in mind or questions, fill out the form
            and our team will get back to you shortly.
          </p>
          <ContactForm />
        </motion.div>
      </div>
    </motion.section>
  );
}
