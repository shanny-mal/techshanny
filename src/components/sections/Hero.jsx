import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import heroJpg from "../../assets/images/hero-image.jpg";
import heroWebP from "../../assets/images/hero-image.webp";
import heroAvif from "../../assets/images/hero-image.avif";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import useParallax from "../../hooks/useParallax";
import "./Hero.css";

export default function Hero() {
  const reduceMotion = usePrefersReducedMotion();
  const { scrollY } = useViewportScroll();
  const y1 = useParallax(scrollY, 0, 500, 0, -100);

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
      role="banner"
      aria-labelledby="hero-heading"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      className="hero relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Responsive background image */}
      <picture className="hero__bg -z-10 absolute inset-0">
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-surface-dark/70" />

      {/* Animated blobs */}
      {!reduceMotion && (
        <>
          <motion.div style={{ y: y1 }} className="blob blob-1" />
          <motion.div
            style={{ y: useTransform(scrollY, [0, 500], [0, 80]) }}
            className="blob blob-2"
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6 lg:px-0 max-w-3xl space-y-6">
        <motion.h1
          id="hero-heading"
          className="font-heading tracking-tight hero-gradient leading-tight"
          variants={fadeInUp}
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          Empowering Your Digital Future
        </motion.h1>
        <motion.p
          className="max-w-2xl mx-auto text-body-light"
          variants={fadeInUp}
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
        >
          Cutting‑edge solutions for web & mobile apps, cloud infrastructure,
          cybersecurity, and data engineering.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/services"
            role="button"
            className="btn-primary focus:ring-4 focus:ring-teal-300"
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

      {/* Scroll indicator */}
      {!reduceMotion && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, -10, 0], opacity: [1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          aria-hidden="true"
        >
          <FaArrowDown className="text-on-surface text-3xl" />
        </motion.div>
      )}
    </motion.section>
  );
}
