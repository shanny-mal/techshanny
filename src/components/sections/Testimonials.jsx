// src/components/sections/Testimonials.jsx
import PropTypes from "prop-types";
import { testimonials } from "../../data/testimonialsData";
import { motion } from "framer-motion";
import "./Testimonials.css";

export default function Testimonials() {
  if (!testimonials || testimonials.length === 0) return null;

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.25 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="testimonial-section py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
      initial="hidden"
      animate="visible"
      variants={container}
      aria-labelledby="testimonials-heading"
    >
      <div className="testimonial-blob" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="testimonials-heading"
          className="text-5xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 mb-16"
          variants={item}
        >
          What Our Clients Say
        </motion.h2>
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} {...t} variants={item} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function TestimonialCard({ name, role, quote, avatar, variants }) {
  return (
    <motion.div
      className="testimonial-card"
      variants={variants}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt={`${name} avatar`}
              className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
              loading="lazy"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-md">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-gray-800 dark:text-gray-200 italic mb-6">
            &ldquo;{quote}&rdquo;
          </p>
          <p className="font-semibold text-lg text-gray-900 dark:text-white">
            {name}
          </p>
          {role && (
            <p className="text-sm text-indigo-600 dark:text-indigo-400">
              {role}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

TestimonialCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string,
  quote: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  variants: PropTypes.object,
};
