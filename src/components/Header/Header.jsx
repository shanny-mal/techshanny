import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle.jsx";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import "./Header.css";

export default function Header() {
  const { user, signOut } = useAuth();
  const { pathname } = useLocation();

  // mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);
  // tools dropdown state
  const [toolsOpen, setToolsOpen] = useState(false);
  // shrink on scroll
  const [scrolled, setScrolled] = useState(false);

  const toolsRef = useRef();
  const mobileRef = useRef();

  // 1) shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2) close mobile menu & tools dropdown on navigation
  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  // 3) close menus when clicking outside or pressing Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setToolsOpen(false);
      }
    };
    const onClick = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
      // mobileRef covers entire mobile menu area
      if (
        mobileRef.current &&
        !mobileRef.current.contains(e.target) &&
        !e.target.closest(".ht-hamburger")
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const mainLinks = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/resources", label: "Resources" },
    { to: "/case-studies", label: "Case Studies" },
  ];

  const toolsLinks = [
    { to: "/tools/roi", label: "ROI Calculator" },
    { to: "/tools/quiz", label: "Service Quiz" },
  ];

  return (
    <header className={`ht-header${scrolled ? " ht-shrink" : ""}`}>
      <a href="#main-content" className="ht-skip">
        Skip to content
      </a>
      <div className="ht-toolbar">
        {/* Mobile Hamburger */}
        <button
          className="ht-hamburger"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className={`bar${mobileOpen ? " open" : ""}`} />
          <span className={`bar${mobileOpen ? " open" : ""}`} />
          <span className={`bar${mobileOpen ? " open" : ""}`} />
        </button>

        {/* Logo */}
        <NavLink to="/" className="ht-logo" aria-label="Home">
          <img src="/logo.png" alt="" />
          <span>ShannyTechSolutions</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="ht-nav-desktop" role="menubar">
          {mainLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                "ht-nav-link" + (isActive ? " active" : "")
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Tools dropdown */}
          <div className="ht-dropdown" ref={toolsRef}>
            <button
              className="ht-dropdown-toggle"
              aria-haspopup="true"
              aria-expanded={toolsOpen}
              onClick={() => setToolsOpen((o) => !o)}
            >
              Tools ▾
            </button>
            {toolsOpen && (
              <ul className="ht-dropdown-menu" role="menu">
                {toolsLinks.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className="ht-dropdown-item"
                      onClick={() => setToolsOpen(false)}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Auth */}
          {user ? (
            <button onClick={signOut} className="ht-cta">
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="ht-cta">
                Login
              </NavLink>
              <NavLink to="/signup" className="ht-cta">
                Sign Up
              </NavLink>
            </>
          )}
        </nav>

        {/* Utilities */}
        <div className="ht-utils">
          <LanguageSwitcher />
          <DarkModeToggle />
        </div>
      </div>

      {/* Mobile Collapsible Menu */}
      <nav
        className={`ht-nav-mobile${mobileOpen ? " open" : ""}`}
        ref={mobileRef}
        role="menu"
      >
        <ul>
          {mainLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            </li>
          ))}

          <li className="mobile-submenu-header">Tools</li>
          {toolsLinks.map(({ to, label }) => (
            <li key={to} className="mobile-submenu-item">
              <NavLink
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            </li>
          ))}

          <li className="mobile-divider" />
          {user ? (
            <li>
              <button
                onClick={() => {
                  signOut();
                  setMobileOpen(false);
                }}
                className="ht-cta"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="ht-cta"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="ht-cta"
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
