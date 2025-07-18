// src/components/sections/ServiceCard.jsx
import PropTypes from "prop-types";
import { motion, useReducedMotion } from "framer-motion";

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  slug,
  id,
}) {
  const link = `/services/${slug || id}`;
  const disableAnim = useReducedMotion();

  const card = {
    rest: { scale: 1, boxShadow: "0 5px 10px rgba(0,0,0,0.05)" },
    hover: {
      scale: disableAnim ? 1 : 1.03,
      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
    },
  };

  return (
    <motion.article
      role="group"
      aria-labelledby={`${id}-title`}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={card}
      className="service-card flex flex-col p-6 bg-surface-light dark:bg-surface-dark rounded-2xl cursor-pointer focus-within:ring-2 focus-within:ring-teal-400 transition"
    >
      {/* Icon */}
      <motion.div
        variants={{ hover: { rotate: disableAnim ? 0 : 360 } }}
        transition={{ duration: 0.8 }}
        className="icon-wrapper w-14 h-14 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-full flex items-center justify-center shadow-md"
      >
        {Icon && <Icon className="w-8 h-8 text-white" aria-hidden="true" />}
      </motion.div>

      {/* Title & Desc */}
      <h3
        id={`${id}-title`}
        className="service-card__title mt-4 text-2xl font-semibold text-on-surface-light dark:text-on-surface-dark"
      >
        {title}
      </h3>
      <p className="service-card__desc mt-2 text-body-light dark:text-body-dark flex-grow">
        {description}
      </p>

      {/* Link */}
      <a
        href={link}
        className="learn-more mt-4 inline-block font-medium text-primary hover:underline relative"
      >
        Learn more →{/* underline sweep */}
        <span
          className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full"
          aria-hidden="true"
        />
      </a>
    </motion.article>
  );
}

ServiceCard.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
