import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
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
  const yBlob1 = useParallax(scrollYProgress, 0, 1, 0, 50);
  const yBlob2 = useParallax(scrollYProgress, 0, 1, 0, -50);

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
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <picture className="absolute inset-0 -z-10">
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
      <div className="absolute inset-0 bg-black/70" />

      {/* Parallax blobs */}
      {!reduceMotion && (
        <>
          <Blob
            className="absolute w-[480px] h-[480px] top-[-80px] left-[-80px]"
            style={{ y: yBlob1, background: "rgba(107,99,246,0.4)" }}
          />
          <Blob
            className="absolute w-[360px] h-[360px] bottom-[-80px] right-[-80px]"
            style={{ y: yBlob2, background: "rgba(56,189,248,0.3)" }}
          />
        </>
      )}

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 lg:px-0 max-w-3xl space-y-6">
        <motion.h1
          id="hero-heading"
          className="font-heading hero-gradient tracking-tight leading-tight"
          style={{ fontSize: "clamp(2rem,6vw,4rem)" }}
          variants={fadeInUp}
        >
          Empowering Your Digital Future
        </motion.h1>
        <motion.p
          className="font-body text-body-light max-w-2xl mx-auto"
          style={{ fontSize: "clamp(1rem,2.5vw,1.25rem)" }}
          variants={fadeInUp}
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

      {/* Scroll‑down indicator */}
      {!reduceMotion && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
          animate={{ y: [0, -10, 0], opacity: [1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          aria-hidden="true"
        >
          <FaArrowDown className="w-6 h-6" />
        </motion.div>
      )}
    </motion.section>
  );
}
