import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";
import heroImage from "../../assets/images/hero-image.jpg";

export default function Hero({ backgroundImage = heroImage }) {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={container}
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      <motion.div
        className="relative z-10 text-center px-6 sm:px-8 lg:px-0 max-w-4xl"
        variants={fadeInUp}
      >
        <motion.h1
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6"
          variants={fadeInUp}
        >
          Empowering Your Digital Future
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-200 mb-8"
          variants={fadeInUp}
        >
          Cutting‑edge solutions for web & mobile applications, cloud
          infrastructure, cybersecurity, and data engineering.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/services"
            className="inline-flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
          >
            Explore Services
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center border-2 border-white hover:border-teal-500 text-white hover:text-teal-500 font-semibold px-6 py-3 rounded-lg transition"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <FaArrowDown className="animate-bounce text-white text-2xl" />
      </motion.div>
    </motion.section>
  );
}
