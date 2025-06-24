import PropTypes from "prop-types";
import { testimonials } from "../../data/testimonialsData";
import { motion } from "framer-motion";

export default function Testimonials() {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-16 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          id="testimonials-heading"
          className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-8"
          variants={item}
        >
          What Our Clients Say
        </motion.h2>
        <motion.div className="space-y-8" variants={container}>
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
    >
      <div className="flex-shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={`${name} avatar`}
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center">
            <span className="text-xl text-white">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-800 dark:text-gray-200 italic">“{quote}”</p>
        <p className="mt-2 font-semibold text-gray-900 dark:text-white">
          {name}
        </p>
        {role && (
          <p className="text-sm text-indigo-600 dark:text-indigo-400">{role}</p>
        )}
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
