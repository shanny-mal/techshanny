// src/components/sections/ServiceCard.jsx
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function ServiceCard({ icon: Icon, title, description, link }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
    >
      <div className="p-6 flex-1 flex flex-col">
        {Icon && (
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-full flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-white" />
          </div>
        )}
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 flex-grow">
          {description}
        </p>
      </div>
      {link && (
        <div className="px-6 pb-6">
          <a
            href={link}
            className="inline-block text-indigo-600 dark:text-indigo-400 font-medium hover:text-teal-500 dark:hover:text-teal-300 transition"
          >
            Learn more →
          </a>
        </div>
      )}
    </motion.div>
  );
}

ServiceCard.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string,
};
