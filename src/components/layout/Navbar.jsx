import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        servicesDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [servicesDropdownOpen]);

  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") {
        if (servicesDropdownOpen) setServicesDropdownOpen(false);
        if (mobileOpen) setMobileOpen(false);
        if (mobileServicesOpen) setMobileServicesOpen(false);
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [servicesDropdownOpen, mobileOpen, mobileServicesOpen]);

  const handleMobileToggle = () => {
    setMobileOpen((prev) => !prev);
    if (mobileOpen) {
      setMobileServicesOpen(false);
    }
  };

  const handleNavLinkClick = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setServicesDropdownOpen(false);
  };

  const handleServicesToggle = () => {
    setServicesDropdownOpen((prev) => !prev);
  };

  const handleServicesKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setServicesDropdownOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setServicesDropdownOpen(false);
    }
  };

  const renderServiceItems = (onClickItem) =>
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
          className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          role="menuitem"
          onClick={() => {
            onClickItem();
          }}
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
        "fixed top-0 left-0 right-0 z-50 transition-colors",
        scrolled
          ? "bg-teal-600 dark:bg-teal-700 shadow-md"
          : "bg-transparent dark:bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            onClick={handleNavLinkClick}
            className="flex items-center"
          >
            <div className="h-10 w-10 rounded-lg overflow-hidden bg-white dark:bg-gray-700 flex items-center justify-center">
              <img
                src={logo}
                alt="shannyTech Logo"
                className="h-8 w-8 object-cover"
              />
            </div>
            <span className="ml-2 text-xl font-bold text-white">
              shannyTech
            </span>
          </Link>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  classNames(
                    "px-2 py-1 transition-colors",
                    "text-white hover:text-teal-200",
                    { "font-semibold underline": isActive }
                  )
                }
                onClick={handleNavLinkClick}
              >
                {label}
              </NavLink>
            ))}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={servicesDropdownOpen}
                onClick={handleServicesToggle}
                onKeyDown={handleServicesKeyDown}
                className="flex items-center px-2 py-1 transition-colors text-white hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300 rounded"
              >
                <span
                  className={classNames({
                    "font-semibold": servicesDropdownOpen,
                  })}
                >
                  Services
                </span>
                <span className="ml-1">
                  {servicesDropdownOpen ? (
                    <FaChevronUp className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <FaChevronDown className="w-4 h-4" aria-hidden="true" />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
                    role="menu"
                  >
                    {renderServiceItems(() => {
                      setServicesDropdownOpen(false);
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded hover:bg-teal-500 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300 transition-colors text-white"
            >
              {isDark ? (
                <FaSun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <FaMoon className="w-5 h-5" aria-hidden="true" />
              )}
            </motion.button>
          </div>
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded hover:bg-teal-500 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300 mr-2 transition-colors text-white"
            >
              {isDark ? (
                <FaSun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <FaMoon className="w-5 h-5" aria-hidden="true" />
              )}
            </motion.button>
            <motion.button
              onClick={handleMobileToggle}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded hover:bg-teal-500 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300 transition-colors text-white"
            >
              {mobileOpen ? (
                <FaTimes className="w-6 h-6" aria-hidden="true" />
              ) : (
                <FaBars className="w-6 h-6" aria-hidden="true" />
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
            className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-95 z-40 overflow-y-auto"
          >
            <div className="px-4 pt-4 pb-6">
              <nav className="space-y-4">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    classNames(
                      "block text-lg px-2 py-1 transition-colors text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400",
                      { "font-semibold": isActive }
                    )
                  }
                  onClick={handleNavLinkClick}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    classNames(
                      "block text-lg px-2 py-1 transition-colors text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400",
                      { "font-semibold": isActive }
                    )
                  }
                  onClick={handleNavLinkClick}
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    classNames(
                      "block text-lg px-2 py-1 transition-colors text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400",
                      { "font-semibold": isActive }
                    )
                  }
                  onClick={handleNavLinkClick}
                >
                  Contact
                </NavLink>
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    aria-haspopup="true"
                    aria-expanded={mobileServicesOpen}
                    className="w-full flex items-center justify-between text-lg px-2 py-1 text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300 transition-colors"
                  >
                    <span
                      className={classNames({
                        "font-semibold": mobileServicesOpen,
                      })}
                    >
                      Services
                    </span>
                    <span className="ml-2">
                      {mobileServicesOpen ? (
                        <FaChevronUp className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <FaChevronDown className="w-4 h-4" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 ml-4 space-y-1 overflow-hidden"
                      >
                        {renderServiceItems(() => {
                          setMobileOpen(false);
                          setMobileServicesOpen(false);
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
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
