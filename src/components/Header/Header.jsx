import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle.jsx";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import "./Header.css";

export default function Header() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const btnRef = useRef();

  // Shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/resources", label: "Resources" },
    { to: "/case-studies", label: "Case Studies" },
    { to: "/tools/roi", label: "ROI Calculator" },
    { to: "/tools/quiz", label: "Service Quiz" },
    { to: "/member", label: "Dashboard" },
  ];

  return (
    <header className={`ht-header${scrolled ? " ht-shrink" : ""}`}>
      <a href="#main-content" className="ht-skip">
        Skip to content
      </a>

      <div className="ht-toolbar">
        {/* Mobile Hamburger */}
        <button
          ref={btnRef}
          className={`ht-menu-btn${menuOpen ? " open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="ht-nav-mobile"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path className="line top" d="M4,7 L20,7" />
            <path className="line middle" d="M4,12 L20,12" />
            <path className="line bottom" d="M4,17 L20,17" />
          </svg>
        </button>

        {/* Logo */}
        <div className="ht-logo">
          <NavLink to="/" aria-label="Home">
            <img src="/logo.png" alt="ShannyTechSolutions logo" />
            <span>ShannyTechSolutions</span>
          </NavLink>
        </div>

        {/* Desktop Full Nav */}
        <nav className="ht-nav-desktop">
          {links.map(({ to, label }) => (
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

      {/* Mobile Slide-Over Nav */}
      <nav
        id="ht-nav-mobile"
        className={`ht-nav-mobile${menuOpen ? " open" : ""}`}
        aria-label="Mobile menu"
      >
        <ul>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            </li>
          ))}

          <li>
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
                className="ht-cta"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="ht-cta"
              >
                Login
              </NavLink>
            )}
          </li>
          {!user && (
            <li>
              <NavLink
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="ht-cta"
              >
                Sign Up
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
