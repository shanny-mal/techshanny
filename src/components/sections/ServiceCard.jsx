import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function ServiceCard({ icon: Icon, title, description, link }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow transition flex flex-col"
    >
      <div className="p-6 flex flex-col flex-grow">
        {Icon && (
          <div className="mb-4">
            <Icon
              className="w-10 h-10 text-indigo-600 dark:text-indigo-400"
              aria-hidden="true"
            />
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
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
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
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
