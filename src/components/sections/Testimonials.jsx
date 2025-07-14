import PropTypes from "prop-types";
import { testimonials } from "../../data/testimonialsData";
import { motion } from "framer-motion";

export default function Testimonials() {
  if (!testimonials || testimonials.length === 0) return null;

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-20 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="testimonials-heading"
          className="text-4xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 mb-12"
          variants={item}
        >
          What Our Clients Say
        </motion.h2>
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
      variants={variants}
      whileHover={{ scale: 1.02 }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr before:from-indigo-500 before:to-teal-400 before:opacity-10"
    >
      <div className="flex items-start space-x-4">
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
          <p className="text-gray-800 dark:text-gray-200 italic mb-4">
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
