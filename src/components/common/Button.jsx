import PropTypes from "prop-types";
import classNames from "classnames";
import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}) {
  const base =
    "font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition";
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 focus:ring-gray-500",
    outline:
      "bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 focus:ring-indigo-500",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  const btnClass = classNames(
    base,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  );
  return (
    <motion.button
      type={type}
      className={btnClass}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};
