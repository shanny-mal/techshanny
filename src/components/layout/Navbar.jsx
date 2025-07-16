// src/components/layout/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
import "./Navbar.css";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (
        servicesOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [servicesOpen]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={classNames(
        "navbar fixed inset-x-0 z-50 backdrop-blur-md transition-colors",
        scrolled ? "navbar--scrolled" : ""
      )}
    >
      <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          to="/"
          className="logo flex items-center"
          onClick={() => setMobileOpen(false)}
        >
          <motion.div whileHover={{ rotate: 20 }} className="logo__img-wrapper">
            <img src={logo} alt="shannyTech" className="logo__img" />
          </motion.div>
          <span className="logo__text">shannyTech</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {links.map(({ to, label }) => (
            <motion.div key={to} whileHover={{ y: -2 }} className="nav-item">
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  classNames("nav-link", {
                    "nav-link--active": location.pathname === to,
                  })
                }
              >
                {label}
              </NavLink>
            </motion.div>
          ))}

          <div className="relative" ref={dropdownRef}>
            <motion.button
              onClick={() => setServicesOpen((o) => !o)}
              whileTap={{ scale: 0.95 }}
              className="nav-link flex items-center"
            >
              Services{" "}
              {servicesOpen ? (
                <FaChevronUp className="ml-1" />
              ) : (
                <FaChevronDown className="ml-1" />
              )}
            </motion.button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="dropdown"
                >
                  {services.map((svc) => (
                    <motion.li key={svc.id} whileHover={{ x: 5 }}>
                      <Link
                        to={`/services/${svc.id}`}
                        className="dropdown__link"
                        onClick={() => setServicesOpen(false)}
                      >
                        {svc.title}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            className="theme-toggle"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </motion.button>
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            className="theme-toggle--mobile"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </motion.button>
          <motion.button
            onClick={() => setMobileOpen((o) => !o)}
            whileHover={{ scale: 1.1 }}
            className="mobile-toggle"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="mobile-menu"
          >
            <nav className="mobile-menu__nav space-y-4">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    classNames("mobile-link", {
                      "mobile-link--active": location.pathname === to,
                    })
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
              <div className="mobile-menu__divider" />
              {services.map((svc) => (
                <Link
                  key={svc.id}
                  to={`/services/${svc.id}`}
                  className="mobile-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {svc.title}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
