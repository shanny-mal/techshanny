import ContactForm from "../forms/ContactForm";
import { motion } from "framer-motion";

export default function ContactSection() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, when: "beforeChildren" },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-16 bg-white dark:bg-gray-800"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          id="contact-heading"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          variants={item}
        >
          Get in Touch
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-8"
          variants={item}
        >
          Have a project in mind or questions? Fill out the form below and we'll
          get back to you.
        </motion.p>
        <motion.div variants={item}>
          <ContactForm />
        </motion.div>
      </div>
    </motion.section>
  );
}
