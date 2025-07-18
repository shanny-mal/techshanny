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
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import "./Navbar.css";

const LazyServicesMenu = lazy(() => import("../menus/ServicesMenu"));

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services", isDropdown: true },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useOnClickOutside(dropdownRef, () => setServicesOpen(false));

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setServicesOpen(false);
      setMobileOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <motion.nav
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={classNames(
        "navbar fixed inset-x-0 z-50 backdrop-blur-md transition-colors",
        scrolled && "navbar--scrolled"
      )}
    >
      <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          to="/"
          className="logo flex items-center"
          onClick={() => setMobileOpen(false)}
        >
          <motion.div whileHover={{ rotate: 5 }} className="logo__img-wrapper">
            <img src={logo} alt="shannyTech logo" className="logo__img" />
          </motion.div>
          <span className="logo__text">shannyTech</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map(({ to, label, isDropdown }) =>
            isDropdown ? (
              <div key={to} className="relative" ref={dropdownRef}>
                <button
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((o) => !o)}
                  className="nav-link flex items-center"
                >
                  {label}
                  {servicesOpen ? (
                    <FaTimes className="ml-1" />
                  ) : (
                    <FaBars className="ml-1" />
                  )}
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <Suspense
                      fallback={
                        <div className="dropdown--loading">Loading…</div>
                      }
                    >
                      <LazyServicesMenu
                        onClose={() => setServicesOpen(false)}
                      />
                    </Suspense>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div key={to} whileHover={{ y: -2 }}>
                <NavItem
                  to={to}
                  label={label}
                  isActive={location.pathname === to}
                />
              </motion.div>
            )
          )}

          <button
            onClick={toggleTheme}
            className="theme-toggle p-2 rounded-full bg-surface dark:bg-surface-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Toggle dark mode"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="theme-toggle--mobile p-2 rounded-full bg-surface dark:bg-surface-dark focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="mobile-toggle p-2 rounded focus:outline-none"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="mobile-menu fixed inset-0 bg-surface dark:bg-surface-dark z-40 p-6 overflow-y-auto"
          >
            <nav className="mobile-menu__nav flex flex-col space-y-4">
              {NAV_LINKS.map(({ to, label }) => (
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
              <Link
                to="/services"
                className="mobile-link"
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
