// src/components/sections/TestimonialCard.jsx
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function TestimonialCard({ name, role, quote, avatar }) {
  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl overflow-hidden transition-transform focus-within:scale-105 hover:scale-105 outline-none"
      tabIndex={0}
      role="group"
      whileHover={{ y: -4 }}
    >
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-teal-300 opacity-10 rounded-3xl pointer-events-none" />
      <div className="relative flex items-start space-x-5">
        {avatar ? (
          <img
            src={avatar}
            alt={`${name} avatar`}
            className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl shadow">
            {name.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <p className="italic text-gray-800 dark:text-gray-200 mb-6">
            “{quote}”
          </p>
          <p className="font-semibold text-lg text-gray-900 dark:text-white">
            {name}
          </p>
          {role && (
            <a
              href={role}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
            >
              View profile
            </a>
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
};
