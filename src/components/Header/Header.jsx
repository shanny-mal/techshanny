import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle.jsx";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import "./Header.css";

export default function Header() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtnRef = useRef();

  // 1) Shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2) Close on Escape or outside click
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setToolsOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const onClick = (e) => {
      if (
        menuOpen &&
        !e.target.closest(".ht-nav") &&
        !e.target.closest(".ht-menu-btn")
      ) {
        setMenuOpen(false);
      }
      if (toolsOpen && !e.target.closest(".ht-nav__dropdown")) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen, toolsOpen]);

  // 3) Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

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

  // When switching between mobile & desktop, close dropdown
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <header
      role="banner"
      className={`ht-header ${scrolled ? "ht-header--shrink" : ""}`}
    >
      <a href="#main-content" className="ht-skip">
        Skip to main content
      </a>

      <div className="ht-toolbar">
        <button
          ref={menuBtnRef}
          className={`ht-menu-btn ${menuOpen ? "open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen((open) => !open);
            setToolsOpen(false);
          }}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <NavLink to="/" className="ht-logo" aria-label="Go to homepage">
          <img
            src="/logo.png"
            alt="ShannyTechSolutions logo"
            className="ht-logo__img"
          />
          <span className="ht-logo__text">ShannyTechSolutions</span>
        </NavLink>

        <div className="ht-utils">
          <LanguageSwitcher />
          <DarkModeToggle />
        </div>
      </div>

      {/* ─── Slide-over nav (mobile) ─────────────────── */}
      <nav
        role="navigation"
        className={`ht-nav ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="ht-nav__list">
          {mainLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className="ht-nav__link"
                onClick={() => setMenuOpen(false)}
                end
              >
                {label}
              </NavLink>
            </li>
          ))}

          <li className="ht-nav__dropdown">
            <button
              className="ht-nav__dropdown-toggle"
              aria-haspopup="true"
              aria-expanded={toolsOpen}
              onClick={() => setToolsOpen((o) => !o)}
            >
              Tools ▾
            </button>
            <ul className={`ht-nav__dropdown-menu ${toolsOpen ? "open" : ""}`}>
              {toolsLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className="ht-nav__dropdown-link"
                    onClick={() => {
                      setMenuOpen(false);
                      setToolsOpen(false);
                    }}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>

          <li className="ht-nav__auth">
            {user ? (
              <button
                className="ht-nav__cta"
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="ht-nav__cta"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="ht-nav__cta"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </li>
        </ul>
      </nav>

      {/* ─── Inline nav (tablet & desktop) ───────────────── */}
      <nav role="navigation" className="ht-inline-nav">
        <ul>
          {mainLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className="ht-inline-link" end>
                {label}
              </NavLink>
            </li>
          ))}

          <li className="ht-inline-dropdown">
            <NavLink
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setToolsOpen((o) => !o);
              }}
              className="ht-inline-link"
            >
              Tools ▾
            </NavLink>
            {toolsOpen && (
              <ul className="ht-inline-submenu">
                {toolsLinks.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink to={to} className="ht-inline-sublink">
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            {user ? (
              <button onClick={signOut} className="ht-inline-link">
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="ht-inline-link">
                Login
              </NavLink>
            )}
          </li>

          {!user && (
            <li>
              <NavLink to="/signup" className="ht-inline-cta">
                Sign Up
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
