import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "./ServiceCard.css";

export default function ServiceCard({ icon: Icon, title, description, link }) {
  const cardVariants = {
    rest: { scale: 1, boxShadow: "0 10px 15px rgba(0,0,0,0.05)" },
    hover: { scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" },
  };
  const iconVariants = {
    rest: { rotate: 0 },
    hover: { rotate: 360 },
  };
  return (
    <motion.div
      className="service-card"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <motion.div
        className="icon-wrapper"
        variants={iconVariants}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {Icon && <Icon className="icon-svg" />}
      </motion.div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{description}</p>
      {link && (
        <motion.a
          href={link}
          className="learn-more"
          whileHover={{ x: 6 }}
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
