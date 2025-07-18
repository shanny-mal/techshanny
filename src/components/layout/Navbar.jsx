import {
  useState,
  useRef,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/logo/logo.png";
import classNames from "classnames";
import {
  FaMoon,
  FaSun,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import "./Navbar.css";

const ServicesMenu = lazy(() => import("../menus/ServicesMenu"));

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

function NavItem({ to, label, isActive }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        classNames("nav-link", isActive && "nav-link--active")
      }
    >
      {label}
      {isActive && (
        <motion.span layoutId="underline" className="nav-underline" />
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // SCROLL SHADOW
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // CLICK OUTSIDE
  useOnClickOutside(dropdownRef, () => setServicesOpen(false));

  // ESC CLOSE
  const onEsc = useCallback((e) => {
    if (e.key === "Escape") {
      setServicesOpen(false);
      setMobileOpen(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onEsc]);

  return (
    <motion.nav
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={classNames(
        "navbar fixed inset-x-0 z-50 backdrop-blur transition-colors",
        scrolled ? "navbar--scrolled" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setMobileOpen(false)}
        >
          <motion.div whileHover={{ scale: 1.1 }} className="logo-img-wrapper">
            <img src={logo} alt="shannyTech logo" className="logo-img" />
          </motion.div>
          <span className="ml-3 text-2xl font-bold text-gray-800 dark:text-gray-200">
            shannyTech
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map(({ to, label }) => (
            <motion.div key={to} whileHover={{ y: -2 }}>
              <NavItem
                to={to}
                label={label}
                isActive={location.pathname === to}
              />
            </motion.div>
          ))}

          {/* Services dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((o) => !o)}
              className="flex items-center nav-link"
            >
              Services
              {servicesOpen ? (
                <FaChevronUp className="ml-1" />
              ) : (
                <FaChevronDown className="ml-1" />
              )}
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <Suspense
                  fallback={
                    <div className="dropdown-loading p-4">Loading…</div>
                  }
                >
                  <ServicesMenu onClose={() => setServicesOpen(false)} />
                </Suspense>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded focus:outline-none"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-40 p-6 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    classNames(
                      "block text-lg font-medium px-4 py-2 rounded-lg",
                      isActive
                        ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
              <hr className="border-gray-200 dark:border-gray-700 my-4" />
              <Link
                to="/services"
                className="block text-lg px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileOpen(false)}
              >
                Services
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
