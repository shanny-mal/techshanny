// src/components/sections/ServiceCard.jsx
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "./ServiceCard.css";

export default function ServiceCard({ icon: Icon, title, description, link }) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="service-card"
      variants={{
        hover: { scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" },
      }}
    >
      <motion.div
        className="icon-wrapper"
        variants={{
          rest: { rotate: 0 },
          hover: { rotate: 20 },
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {Icon && <Icon className="w-10 h-10 text-white" />}
      </motion.div>
      <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-4 text-gray-600 dark:text-gray-300 flex-grow">
        {description}
      </p>
      {link && (
        <motion.a
          href={link}
          className="learn-more"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
        >
          Learn more →
        </motion.a>
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
