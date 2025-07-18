// src/components/ui/Blob.jsx
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * A decorative, blurred radial‑gradient “blob”.
 * Accepts any Tailwind classes to control size, position & color.
 */
export function Blob({ className, style, children, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={classNames(
        "absolute rounded-full filter blur-3xl mix-blend-screen animate-float",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

Blob.propTypes = {
  /** Tailwind (or custom) classes for size/position/color */
  className: PropTypes.string,
  /** Optional inline styles (e.g. background color override) */
  style: PropTypes.object,
  children: PropTypes.node,
};

Blob.defaultProps = {
  className: "",
  style: {},
  children: null,
};
