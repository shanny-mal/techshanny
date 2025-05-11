import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDarkMode } from "../../context/DarkModeContext";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import "./Header.css";

const Header = () => {
  const { user, signOut } = useAuth();
  const { darkMode } = useDarkMode();
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { pathname } = useLocation();

  // Shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything when navigating
  useEffect(() => {
    setExpanded(false);
    setToolsOpen(false);
  }, [pathname]);

  // Toggle dropdown on mobile (click)
  const handleToolsToggle = (e) => {
    e.preventDefault();
    setToolsOpen((open) => !open);
  };

  return (
    <header
      className={[
        "header",
        scrolled && "header--shrink",
        darkMode && "header--dark",
      ]
        .filter(Boolean)
        .join(" ")}
      role="banner"
    >
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded((ex) => !ex)}
        className="header__navbar"
        role="navigation"
        aria-label="Main navigation"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="header__brand">
            <div className="header__logo-circle">
              <img
                src="/logo.png"
                alt="ShannyTechSolutions logo"
                className="header__logo"
              />
            </div>
            <span className="header__brand-text">ShannyTechSolutions</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="main-nav"
            aria-expanded={expanded}
            className="header__toggler"
            aria-label="Toggle navigation menu"
          />

          <Navbar.Collapse
            id="main-nav"
            className={`header__collapse ${expanded ? "show" : ""}`}
          >
            <Nav className="header__nav" role="menubar">
              {!user && (
                <>
                  <Nav.Link as={NavLink} to="/" end className="header__link">
                    Home
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/blog" className="header__link">
                    Blog
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/resources"
                    className="header__link"
                  >
                    Resources
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/case-studies"
                    className="header__link"
                  >
                    Case Studies
                  </Nav.Link>
                </>
              )}

              <NavDropdown
                title="Tools"
                id="tools-dropdown"
                show={toolsOpen}
                onClick={handleToolsToggle}
                className="header__link header__dropdown"
                menuVariant={darkMode ? "dark" : "light"}
              >
                <NavDropdown.Item as={NavLink} to="/tools/roi">
                  ROI Calculator
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/tools/quiz">
                  Service Quiz
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={NavLink} to="/member" className="header__link">
                {user ? "Dashboard" : "Member"}
              </Nav.Link>

              {user ? (
                <Nav.Link
                  onClick={signOut}
                  className="header__link header__link--action"
                >
                  Logout
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login" className="header__link">
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/signup"
                    className="header__link header__link--signup"
                  >
                    Sign Up
                  </Nav.Link>
                </>
              )}

              <div className="header__icon">
                <LanguageSwitcher />
              </div>
              <div className="header__icon">
                <DarkModeToggle />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
