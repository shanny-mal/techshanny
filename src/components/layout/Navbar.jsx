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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

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
        "fixed w-full z-50 backdrop-blur backdrop-filter transition-colors",
        scrolled
          ? "bg-white/70 dark:bg-gray-900/70 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 20 }}
              className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow"
            >
              <img
                src={logo}
                alt="shannyTech Logo"
                className="h-10 w-10 object-cover"
              />
            </motion.div>
            <span className="text-2xl font-extrabold text-gray-800 dark:text-white">
              shannyTech
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {links.map(({ to, label }) => (
              <motion.div key={to} whileHover={{ y: -2 }} className="relative">
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    classNames(
                      "px-3 py-2 text-lg transition",
                      isActive
                        ? "text-teal-600 dark:text-teal-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                    )
                  }
                >
                  {label}
                </NavLink>
                <div
                  className={classNames(
                    "absolute left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-indigo-500 rounded transition-all",
                    {
                      "opacity-100 top-full": window.location.pathname === to,
                      "opacity-0": window.location.pathname !== to,
                    }
                  )}
                />
              </motion.div>
            ))}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setServicesOpen((o) => !o)}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-3 py-2 text-lg text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                Services
                {servicesOpen ? (
                  <FaChevronUp className="ml-1 w-4 h-4" />
                ) : (
                  <FaChevronDown className="ml-1 w-4 h-4" />
                )}
              </motion.button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl py-2 w-52"
                  >
                    {services.map((svc) => (
                      <motion.li
                        key={svc.id}
                        whileHover={{ x: 5 }}
                        className="px-4 py-2"
                      >
                        <Link
                          to={`/services/${svc.id}`}
                          className="block text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition"
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
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow"
            >
              {isDark ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </motion.button>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {isDark ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </motion.button>
            <motion.button
              onClick={() => setMobileOpen((o) => !o)}
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-md text-gray-800 dark:text-gray-200"
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
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-40 p-6 overflow-y-auto"
          >
            <nav className="space-y-4">
              {links.map(({ to, label }) => (
                <motion.div key={to} whileHover={{ x: 5 }}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      classNames(
                        "block text-xl px-4 py-2 rounded-lg transition",
                        isActive
                          ? "bg-teal-100 dark:bg-teal-800 text-teal-600 dark:text-teal-400 font-semibold"
                          : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
              <div className="space-y-3">
                {services.map((svc) => (
                  <motion.div key={svc.id} whileHover={{ x: 5 }}>
                    <Link
                      to={`/services/${svc.id}`}
                      className="block text-lg px-4 py-2 rounded-lg transition text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setMobileOpen(false)}
                    >
                      {svc.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
