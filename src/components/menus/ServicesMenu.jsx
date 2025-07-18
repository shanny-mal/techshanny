import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { services } from "../../data/servicesData";
import "./ServicesMenu.css";

export default function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();

  useOnClickOutside(menuRef, () => setOpen(false));

  // Open/close via keyboard
  const onButtonKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((o) => !o);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setFocusedIndex(0);
    }
  };

  // Navigate items
  const onItemKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, services.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Escape") {
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  // Focus the correct menu item
  useEffect(() => {
    if (open && focusedIndex >= 0) {
      const node = menuRef.current?.querySelectorAll("a")[focusedIndex];
      node?.focus();
    }
  }, [focusedIndex, open]);

  // Close on navigation
  useEffect(() => {
    setOpen(false);
    setFocusedIndex(-1);
  }, [location.pathname]);

  return (
    <div className="services-menu" ref={menuRef}>
      <button
        ref={buttonRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKey}
        className="services-menu__button"
      >
        Services
        <span className="services-menu__icon">{open ? "▴" : "▾"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="services-menu__list"
            onKeyDown={onItemKey}
          >
            {services.map((svc, idx) => (
              <li key={svc.id} role="none">
                <Link
                  role="menuitem"
                  to={`/services/${svc.id}`}
                  className="services-menu__item"
                  tabIndex={-1}
                  onClick={() => setOpen(false)}
                >
                  {svc.title}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
