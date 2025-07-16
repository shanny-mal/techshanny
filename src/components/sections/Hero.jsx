// src/components/sections/Hero.jsx
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";
import heroImage from "../../assets/images/hero-image.jpg";
import "./Hero.css";

export default function Hero({ backgroundImage = heroImage }) {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-black/60" />
      <motion.div variants={fadeInUp} className="blob blob-1" />
      <motion.div variants={fadeInUp} className="blob blob-2" />
      <motion.div
        variants={fadeInUp}
        className="relative z-10 text-center px-6 lg:px-0 max-w-3xl"
      >
        <motion.h1
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 hero-gradient"
          variants={fadeInUp}
        >
          Empowering Your Digital Future
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-200 mb-10"
          variants={fadeInUp}
        >
          Cutting‑edge solutions for web & mobile apps, cloud infrastructure,
          cybersecurity, and data engineering.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/services" className="btn-primary">
            Explore Services
          </Link>
          <Link to="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
      >
        <FaArrowDown className="text-white text-3xl animate-bounce" />
      </motion.div>
    </motion.section>
  );
}
