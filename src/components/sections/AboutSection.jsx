import { useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useInView } from "../../hooks/useInView";
import {
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
} from "react-icons/fa";
import { Blob } from "../ui/Blob";
import TeamCarousel from "./TeamCarousel"; // new component
import aboutJpg from "../../assets/images/about-illustration.jpg";
import aboutAvif from "../../assets/images/about-illustration.avif";

export default function AboutSection() {
  const reduceMotion = useReducedMotion();
  const [readMore, setReadMore] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.2 });

  // parallax for image
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const FEATURES = [
    "Web & Mobile Development",
    "Cloud Architecture",
    "Cybersecurity",
    "Data Engineering",
  ];

  return (
    <>
      <a
        href="#about-section"
        className="sr-only focus:not-sr-only focus:underline fixed top-4 left-4 z-50 bg-white dark:bg-gray-900 p-2 rounded"
      >
        Skip to About
      </a>

      <section
        id="about-section"
        ref={ref}
        role="region"
        aria-labelledby="about-heading"
        className="relative overflow-hidden bg-white dark:bg-gray-800 py-24 px-4 sm:px-6 lg:px-8"
      >
        {/* Blobs */}
        {!reduceMotion && (
          <>
            <Blob
              className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px]"
              style={{ background: "rgba(107,99,246,0.2)" }}
            />
            <Blob
              className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px]"
              style={{ background: "rgba(14,165,233,0.2)" }}
            />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <h2
              id="about-heading"
              className="font-heading text-[clamp(2rem,6vw,3rem)] text-indigo-600 dark:text-indigo-400"
            >
              About Us
            </h2>
            <p className="font-body text-body-light">
              At shannyTech, our mission is to empower businesses through
              innovative technology. Founded in 2022, we specialize in:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start space-x-3">
                  <FaCheckCircle
                    className="mt-1 w-5 h-5 text-indigo-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-body text-body-light">{f}</span>
                </li>
              ))}
            </ul>

            <div>
              <p className="font-body text-body-light inline">
                {readMore
                  ? `We believe in collaboration, quality, and continuous improvement.
                     Whether you’re a startup seeking an MVP or an enterprise on a
                     digital transformation journey, shannyTech partners with you every
                     step of the way.`
                  : `We believe in collaboration, quality, and continuous improvement...`}
              </p>
              <button
                onClick={() => setReadMore((r) => !r)}
                aria-expanded={readMore}
                className="ml-2 text-indigo-600 dark:text-indigo-400 font-semibold focus:outline-none focus:underline"
              >
                {readMore ? (
                  <>
                    Show less <FaChevronUp className="inline" />
                  </>
                ) : (
                  <>
                    Read more <FaChevronDown className="inline" />
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="btn-primary" role="button">
                Get in Touch
              </a>
              <a
                href="/shannyTech-brochure.pdf"
                download
                className="btn-outline"
                role="button"
              >
                <FaDownload className="mr-2" /> Download PDF
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div style={reduceMotion ? {} : { y }} className="relative">
            <div className="absolute inset-0 border-4 border-indigo-300/30 rounded-2xl rotate-3 pointer-events-none" />
            <picture>
              <source srcSet={aboutAvif} type="image/avif" />
              <img
                src={aboutJpg}
                alt="Team collaborating"
                loading="lazy"
                decoding="async"
                className="relative w-full rounded-2xl shadow-2xl hover:scale-105 transform transition"
              />
            </picture>
          </motion.div>
        </div>

        {/* Team Carousel Preview */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="font-heading text-2xl text-center text-indigo-600 dark:text-indigo-400 mb-6">
            Meet the Team
          </h3>
          <TeamCarousel />
        </div>
      </section>
    </>
  );
}
