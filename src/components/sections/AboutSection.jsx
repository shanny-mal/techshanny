import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { Blob } from "../ui/Blob";
import aboutImageJpg from "../../assets/images/about-illustration.jpg";
import aboutImageAvif from "../../assets/images/about-illustration.avif";
import "./AboutSection.css";

export default function AboutSection() {
  const reduceMotion = useReducedMotion();
  const [readMore, setReadMore] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.2 });

  const features = [
    "Web & Mobile Development",
    "Cloud Architecture",
    "Cybersecurity",
    "Data Engineering",
  ];

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

  return (
    <>
      {/* Skip‑to‑content for a11y */}
      <a href="#about-heading" className="sr-only focus:not-sr-only p-2">
        Skip to About
      </a>

      <motion.section
        id="about"
        role="region"
        aria-labelledby="about-heading"
        className="relative py-24 bg-white dark:bg-gray-800 overflow-hidden"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={container}
        ref={ref}
      >
        {/* Decorative blobs */}
        {!reduceMotion && (
          <>
            <Blob
              className="absolute w-[500px] h-[500px] top-[-100px] left-[-100px]"
              style={{ backgroundColor: "rgba(107,99,246,0.2)" }}
            />
            <Blob
              className="absolute w-[400px] h-[400px] bottom-[-80px] right-[-80px]"
              style={{ backgroundColor: "rgba(14,165,233,0.2)" }}
            />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid gap-16 lg:grid-cols-2 items-center">
          {/* Text Column */}
          <motion.div variants={item} className="space-y-6">
            <h2
              id="about-heading"
              className="font-heading text-primary text-[clamp(2.25rem,5vw,3rem)]"
            >
              About Us
            </h2>
            <p className="font-body text-body-light">
              At shannyTech, our mission is to empower businesses through
              innovative technology. Founded in 2022, we specialize in:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <li key={f} className="flex items-start space-x-3">
                  <FaCheckCircle
                    className="mt-1 w-5 h-5 text-primary flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-body text-body-light">{f}</span>
                </li>
              ))}
            </ul>

            <p className="font-body text-body-light">
              {readMore
                ? `We believe in collaboration, quality, and continuous improvement.
                   Whether you’re a startup seeking an MVP or an enterprise on a
                   digital transformation journey, shannyTech partners with you every
                   step of the way.`
                : `We believe in collaboration, quality, and continuous improvement...`}
              <button
                onClick={() => setReadMore((prev) => !prev)}
                aria-expanded={readMore}
                className="ml-2 font-semibold text-primary underline focus:outline-none"
              >
                {readMore ? "Show less" : "Read more"}
              </button>
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                role="button"
                className="inline-flex items-center btn-primary focus:ring-4 focus:ring-primary/50"
              >
                Get in Touch
              </a>
              <a
                href="/shannyTech-brochure.pdf"
                download
                role="button"
                className="inline-flex items-center btn-outline focus:ring-4 focus:ring-primary/30"
              >
                <FaChevronDown className="mr-2" /> Download PDF
              </a>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            variants={item}
            className="relative"
            {...(!reduceMotion && {
              initial: { y: 50, opacity: 0 },
              animate: { y: inView ? 0 : 50, opacity: inView ? 1 : 0 },
              transition: { duration: 0.8, ease: "easeOut" },
            })}
          >
            <div className="absolute inset-[-10px] border-4 border-indigo-300/30 rounded-2xl rotate-3 pointer-events-none" />
            <picture>
              <source srcSet={aboutImageAvif} type="image/avif" />
              <img
                src={aboutImageJpg}
                alt="Team collaborating"
                className="relative w-full rounded-2xl shadow-2xl transform hover:scale-105 transition"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
