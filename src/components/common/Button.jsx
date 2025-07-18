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
    "font-body rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition";
  const variants = {
    primary: "btn-primary", // uses bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500
    secondary: "btn-secondary", // uses bg-surface-light text-body hover:bg-surface-dark focus:ring-surface-light
    outline: "btn-outline", // uses border border-indigo-500 text-indigo-500 hover:bg-indigo-50 focus:ring-indigo-500
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
