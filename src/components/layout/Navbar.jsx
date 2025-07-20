// src/components/layout/Navbar.jsx
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  startTransition,
  lazy,
  Suspense,
} from "react";
// ← Make sure this path points to your actual logo file
import logo from "../../assets/logo/logo.png";

import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { useTheme } from "../../context/ThemeContext";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import useScrollSpy from "../../hooks/useScrollSpy";
import SearchBar from "./SearchBar.jsx";

import {
  FaMoon,
  FaSun,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { services } from "../../data/servicesData";
import "./Navbar.css";

// Lazy‑loaded desktop submenu
const ServicesMenu = lazy(() => import("../menus/ServicesMenu"));

const NAV_LINKS = [
  { to: "/", label: "Home", sectionId: "hero" },
  {
    to: "/services",
    label: "Services",
    sectionId: "services",
    isDropdown: true,
  },
  { to: "/about", label: "About", sectionId: "about" },
  { to: "/blog", label: "Blog", sectionId: "blog" },
  { to: "/contact", label: "Contact", sectionId: "contact" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);

  // Scroll‑spy for section highlighting
  const currentSection = useScrollSpy(
    NAV_LINKS.map((l) => l.sectionId).filter(Boolean),
    { offset: -80 }
  );

  // Shadow & background on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef, () => setServicesOpen(false));

  // Close all menus on Escape
  const onEsc = useCallback(
    (e) => {
      if (e.key === "Escape") {
        startTransition(() => {
          setMobileOpen(false);
          setServicesOpen(false);
          setMobileServicesOpen(false);
        });
      }
    },
    [setMobileOpen, setServicesOpen, setMobileServicesOpen]
  );
  useEffect(() => {
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onEsc]);

  return (
    <>
      {/* Skip‑to‑content for a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:underline fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded"
      >
        Skip to content
      </a>

      <motion.nav
        role="navigation"
        aria-label="Main nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={classNames(
          "fixed inset-x-0 top-0 z-50 py-2 px-4 md:px-8 transition-colors",
          scrolled
            ? "backdrop bg-white/80 dark:bg-gray-900/80 shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => startTransition(() => setMobileOpen(false))}
            className="flex items-center space-x-2"
          >
            <motion.img
              src={logo}
              alt="shannyTech logo"
              className="h-10 w-10"
              whileHover={{ rotate: 10 }}
            />
            <span className="font-heading text-xl text-gray-800 dark:text-gray-100">
              shannyTech
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map(({ to, label, isDropdown, sectionId }) =>
              isDropdown ? (
                <div key={to} ref={dropdownRef} className="relative">
                  <button
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((o) => !o)}
                    className={classNames(
                      "nav-link flex items-center",
                      (currentSection === sectionId ||
                        location.pathname.startsWith("/services")) &&
                        "active"
                    )}
                  >
                    {label}
                    <FaChevronDown className="ml-1 text-sm" />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="submenu"
                      >
                        {services.map((s) => (
                          <li key={s.id}>
                            <Link
                              to={`/services/${s.slug || s.id}`}
                              className="submenu-link"
                              onClick={() => setServicesOpen(false)}
                            >
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    classNames("nav-link", isActive && "active")
                  }
                >
                  {label}
                </NavLink>
              )
            )}

            <SearchBar className="w-48" />

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className="p-2">
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
            <motion.button
              onClick={() => startTransition(() => setMobileOpen((o) => !o))}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="p-2"
              animate={{ rotate: mobileOpen ? 90 : 0 }}
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>
        </div>

        {/* Mobile slide‑down */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-inner"
            >
              <nav className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                {NAV_LINKS.map(({ to, label, isDropdown }) =>
                  !isDropdown ? (
                    <NavLink
                      key={to}
                      to={to}
                      className="p-4 font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </NavLink>
                  ) : (
                    <MobileServices
                      key={to}
                      label={label}
                      items={services}
                      onClose={() => setMobileOpen(false)}
                    />
                  )
                )}
                <div className="p-4">
                  <SearchBar mobile placeholder="Search…" />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

// Inline mobile “Services” accordion
function MobileServices({ label, items, onClose }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center font-medium"
      >
        {label}
        <FaChevronDown
          className={classNames("transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 space-y-2 pl-4"
          >
            {items.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/services/${s.slug || s.id}`}
                  onClick={onClose}
                  className="block hover:underline"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
