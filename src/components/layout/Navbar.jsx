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
    const onScroll = () => setScrolled(window.scrollY > 50);
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
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={classNames(
        "fixed w-full z-50 backdrop-blur-lg transition-colors",
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center"
            onClick={() => setMobileOpen(false)}
          >
            <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <img
                src={logo}
                alt="shannyTech Logo"
                className="h-10 w-10 object-cover"
              />
            </div>
            <span className="ml-3 text-2xl font-extrabold text-gray-800 dark:text-white">
              shannyTech
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  classNames(
                    "relative text-lg px-3 py-2 transition-all",
                    isActive
                      ? "text-teal-600 dark:text-teal-400 font-semibold after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-teal-600 dark:after:bg-teal-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                  )
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesOpen((o) => !o)}
                className="flex items-center text-lg px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                Services
                {servicesOpen ? (
                  <FaChevronUp className="ml-1 w-4 h-4" />
                ) : (
                  <FaChevronDown className="ml-1 w-4 h-4" />
                )}
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 w-48"
                  >
                    {services.map((svc) => (
                      <li key={svc.id}>
                        <Link
                          to={`/services/${svc.id}`}
                          className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                          onClick={() => setServicesOpen(false)}
                        >
                          {svc.title}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
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
          </div>
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-2"
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
            className="fixed inset-0 bg-white dark:bg-gray-900 z-40 p-4"
          >
            <nav className="space-y-4">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    classNames(
                      "block text-xl px-4 py-2 rounded-md transition",
                      isActive
                        ? "bg-teal-100 dark:bg-teal-800 text-teal-600 dark:text-teal-400 font-semibold"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
              <div className="space-y-2">
                {services.map((svc) => (
                  <Link
                    key={svc.id}
                    to={`/services/${svc.id}`}
                    className="block text-lg px-4 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    {svc.title}
                  </Link>
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
