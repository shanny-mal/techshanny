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
import logo from "../../assets/logo/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { FaMoon, FaSun, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import useScrollSpy from "../../hooks/useScrollSpy";
import SearchBar from "./SearchBar.jsx";
import { services } from "../../data/servicesData";
import "./Navbar.css";

// Lazy‑loaded desktop menu
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

  // Highlight nav item as you scroll
  const currentSection = useScrollSpy(
    NAV_LINKS.map((l) => l.sectionId).filter(Boolean),
    { offset: -80 }
  );

  // Shadow on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close desktop dropdown when clicking outside
  useOnClickOutside(dropdownRef, () =>
    startTransition(() => setServicesOpen(false))
  );

  // Close all on Escape
  const onEsc = useCallback((e) => {
    if (e.key === "Escape") {
      startTransition(() => {
        setMobileOpen(false);
        setServicesOpen(false);
        setMobileServicesOpen(false);
      });
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onEsc]);

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:underline fixed top-2 left-2 z-50 bg-white dark:bg-gray-800 p-2 rounded"
      >
        Skip to content
      </a>

      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={classNames(
          "fixed inset-x-0 top-0 z-40 backdrop-blur-lg transition-colors",
          scrolled
            ? "bg-white/70 dark:bg-gray-900/70 shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={() => startTransition(() => setMobileOpen(false))}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow"
              >
                <img
                  src={logo}
                  alt="shannyTech Logo"
                  className="h-8 w-8 object-cover"
                />
              </motion.div>
              <span className="font-heading text-xl text-gray-800 dark:text-gray-100">
                shannyTech
              </span>
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center space-x-6">
              {NAV_LINKS.map(({ to, label, isDropdown, sectionId }) =>
                isDropdown ? (
                  <div key={to} className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={servicesOpen}
                      onClick={() =>
                        startTransition(() => setServicesOpen((o) => !o))
                      }
                      className={classNames(
                        "nav-link flex items-center",
                        (currentSection === sectionId ||
                          location.pathname.startsWith("/services")) &&
                          "nav-link--active"
                      )}
                    >
                      {label}
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
                          <ServicesMenu
                            onClose={() => setServicesOpen(false)}
                          />
                        </Suspense>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      classNames(
                        "nav-link",
                        (isActive || currentSection === sectionId) &&
                          "nav-link--active"
                      )
                    }
                  >
                    {label}
                  </NavLink>
                )
              )}

              {/* Search */}
              <SearchBar />

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isDark ? <FaSun /> : <FaMoon />}
              </button>
            </div>

            {/* MOBILE / TABLET CONTROLS */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none"
              >
                {isDark ? <FaSun /> : <FaMoon />}
              </button>
              <button
                onClick={() => startTransition(() => setMobileOpen((o) => !o))}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="p-2 rounded focus:outline-none"
              >
                {mobileOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE SLIDE‑IN MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 bg-white dark:bg-gray-900 z-50 p-6 overflow-y-auto"
            >
              <nav className="flex flex-col space-y-4" role="menu">
                {NAV_LINKS.map(({ to, label, isDropdown }) =>
                  !isDropdown ? (
                    <NavLink
                      key={to}
                      to={to}
                      end={to === "/"}
                      role="menuitem"
                      className={({ isActive }) =>
                        classNames(
                          "block text-lg font-medium px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                          isActive
                            ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300"
                            : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )
                      }
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </NavLink>
                  ) : (
                    <div key={to} className="px-4">
                      <button
                        onClick={() => setMobileServicesOpen((o) => !o)}
                        aria-expanded={mobileServicesOpen}
                        aria-controls="mobile-services-submenu"
                        className="w-full flex justify-between items-center text-lg font-medium py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {label}
                        {mobileServicesOpen ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                      {mobileServicesOpen && (
                        <ul
                          id="mobile-services-submenu"
                          className="mt-2 space-y-1 pl-4 border-l border-gray-200 dark:border-gray-700"
                        >
                          {services.map((svc) => (
                            <li key={svc.id}>
                              <Link
                                to={`/services/${svc.slug || svc.id}`}
                                className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={() => setMobileOpen(false)}
                              >
                                {svc.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                )}

                <hr className="border-gray-200 dark:border-gray-700 my-4" />

                {/* Mobile search */}
                <SearchBar mobile />
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
