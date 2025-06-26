import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/logo/logo.png";
import classNames from "classnames";
import { services } from "../../data/servicesData";
import {
  FaChevronDown,
  FaChevronUp,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        servicesDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [servicesDropdownOpen]);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        setServicesDropdownOpen(false);
        setMobileOpen(false);
        setMobileServicesOpen(false);
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [servicesDropdownOpen, mobileOpen, mobileServicesOpen]);

  const handleMobileToggle = () => {
    setMobileOpen((p) => !p);
    if (mobileOpen) setMobileServicesOpen(false);
  };

  const closeAll = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setServicesDropdownOpen(false);
  };

  const renderServiceItems = (onClick) =>
    services.map((svc) => (
      <motion.li
        key={svc.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          to={`/services/${svc.id}`}
          className="block px-6 py-4 text-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={onClick}
        >
          {svc.title}
        </Link>
      </motion.li>
    ));

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={classNames(
        "fixed inset-x-0 z-50 transition-colors",
        scrolled ? "bg-teal-600 dark:bg-teal-700 shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" onClick={closeAll} className="flex items-center">
            <div className="h-12 w-12 sm:h-10 sm:w-10 rounded-full overflow-hidden bg-white dark:bg-gray-700 flex items-center justify-center">
              <img
                src={logo}
                alt="shannyTech Logo"
                className="h-10 w-10 sm:h-8 sm:w-8 object-cover"
              />
            </div>
            <span className="ml-3 text-lg sm:text-xl font-bold text-white">
              shannyTech
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  classNames(
                    "px-3 py-2 text-white hover:text-teal-200 transition",
                    { "font-semibold underline": isActive }
                  )
                }
                onClick={closeAll}
              >
                {label}
              </NavLink>
            ))}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={servicesDropdownOpen}
                onClick={() => setServicesDropdownOpen((p) => !p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") e.preventDefault();
                  setServicesDropdownOpen((p) => !p);
                }}
                className="flex items-center px-3 py-2 text-white hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300 rounded transition"
              >
                <span
                  className={classNames({
                    "font-semibold": servicesDropdownOpen,
                  })}
                >
                  Services
                </span>
                {servicesDropdownOpen ? (
                  <FaChevronUp className="ml-1 w-4 h-4" />
                ) : (
                  <FaChevronDown className="ml-1 w-4 h-4" />
                )}
              </button>
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
                  >
                    {renderServiceItems(() => setServicesDropdownOpen(false))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded hover:bg-teal-500 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300 text-white transition"
            >
              {isDark ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </motion.button>
          </div>
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded hover:bg-teal-500 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300 text-white transition mr-2"
            >
              {isDark ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </motion.button>
            <motion.button
              onClick={handleMobileToggle}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded hover:bg-teal-500 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300 text-white transition"
            >
              {mobileOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.2 }}
            ref={mobileMenuRef}
            className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 overflow-y-auto z-40"
          >
            <div className="pt-4 pb-6">
              <nav className="flex flex-col space-y-2 px-4">
                {navLinks.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      classNames(
                        "block px-4 py-3 text-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                        { "font-semibold": isActive }
                      )
                    }
                    onClick={closeAll}
                  >
                    {label}
                  </NavLink>
                ))}
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-4 py-3 text-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300 transition"
                >
                  <span
                    className={classNames({
                      "font-semibold": mobileServicesOpen,
                    })}
                  >
                    Services
                  </span>
                  {mobileServicesOpen ? (
                    <FaChevronUp className="w-4 h-4" />
                  ) : (
                    <FaChevronDown className="w-4 h-4" />
                  )}
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 border-l border-gray-200 dark:border-gray-700"
                    >
                      {renderServiceItems(() => closeAll())}
                    </motion.ul>
                  )}
                </AnimatePresence>
                <div className="pt-4">
                  <motion.button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    whileHover={{ scale: 1.1 }}
                    className="w-full text-left px-4 py-3 rounded hover:bg-teal-100 dark:hover:bg-teal-800 transition text-gray-800 dark:text-gray-200"
                  >
                    {isDark ? "Switch to Light" : "Switch to Dark"}
                  </motion.button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
