// src/components/sections/AboutSection.jsx
import { motion } from "framer-motion";
import aboutImage from "../../assets/images/about-illustration.jpg";
import { FaCheckCircle } from "react-icons/fa";
import "./AboutSection.css";

export default function AboutSection() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const features = [
    "Web & Mobile Development",
    "Cloud Architecture",
    "Cybersecurity",
    "Data Engineering",
  ];

  return (
    <motion.section
      className="relative py-24 bg-gradient-to-r from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={container}
      aria-labelledby="about-heading"
    >
      <div className="blob-about-1" />
      <div className="blob-about-2" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid gap-16 lg:grid-cols-2 items-center">
        <motion.div variants={item} className="space-y-6">
          <motion.h2
            id="about-heading"
            className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400"
            variants={item}
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300"
            variants={item}
          >
            At shannyTech, our mission is to empower businesses through
            innovative technology. Founded in 2022, we specialize in:
          </motion.p>
          <motion.ul
            variants={item}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((f) => (
              <li key={f} className="flex items-start space-x-3">
                <FaCheckCircle className="mt-1 w-5 h-5 text-teal-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{f}</span>
              </li>
            ))}
          </motion.ul>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300"
            variants={item}
          >
            We believe in collaboration, quality, and continuous improvement.
            Whether you’re a startup seeking an MVP or an enterprise on a
            digital transformation journey, shannyTech partners with you every
            step of the way.
          </motion.p>
          <motion.div variants={item}>
            <a href="/contact" className="btn-primary">
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
        <motion.div variants={item} className="relative">
          <div className="frame-about" />
          <img
            src={aboutImage}
            alt="Team collaboration"
            className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
