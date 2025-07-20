// src/components/sections/Hero.jsx
import { Link } from "react-router-dom";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { Blob } from "../ui/Blob";
import heroJpg from "../../assets/images/hero-image.jpg";
import heroWebP from "../../assets/images/hero-image.webp";
import heroAvif from "../../assets/images/hero-image.avif";
import useParallax from "../../hooks/useParallax";
import "./Hero.css";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y1 = useParallax(scrollYProgress, 0, 1, 0, 80);
  const y2 = useParallax(scrollYProgress, 0, 1, 0, -60);

  const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:underline fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded"
      >
        Skip to content
      </a>

      <motion.section
        id="hero"
        role="banner"
        aria-labelledby="hero-heading"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background image with AVIF/WebP fallback */}
        <picture className="absolute inset-0 -z-20">
          <source srcSet={heroAvif} type="image/avif" />
          <source srcSet={heroWebP} type="image/webp" />
          <img
            src={heroJpg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </picture>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 -z-10" />

        {/* Animated blobs */}
        {!reduceMotion && (
          <>
            <Blob
              className="absolute blob blob-1"
              style={{ transform: `translateY(${y1}px)` }}
            />
            <Blob
              className="absolute blob blob-2"
              style={{ transform: `translateY(${y2}px)` }}
            />
          </>
        )}

        <div
          className="relative z-10 text-center px-6 max-w-3xl"
          id="main-content"
        >
          <motion.h1
            id="hero-heading"
            className="font-heading text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500 tracking-tight leading-tight"
            style={{ fontSize: "clamp(2rem,6vw,4rem)" }}
            variants={headingVariants}
          >
            Empowering Your Digital Future
          </motion.h1>

          <motion.p
            className="mt-4 font-body text-white max-w-2xl mx-auto"
            style={{ fontSize: "clamp(1rem,2.5vw,1.25rem)" }}
            variants={textVariants}
          >
            Cutting‑edge web & mobile apps, cloud infrastructure, cybersecurity,
            and data engineering—tailored to your vision.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            variants={textVariants}
          >
            <Link
              to="/services"
              role="button"
              className="btn-primary focus:ring-4 focus:ring-cyan-300"
            >
              Explore Services
            </Link>
            <Link
              to="/contact"
              role="button"
              className="btn-secondary focus:ring-4 focus:ring-white"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>

        {!reduceMotion && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white"
            animate={{ y: [0, -10, 0], opacity: [1, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            aria-hidden="true"
          >
            <FaArrowDown className="w-6 h-6" />
          </motion.div>
        )}
      </motion.section>
    </>
  );
}
