// src/components/Header/Header.jsx
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
  const { darkMode, setDarkMode } = useDarkMode();
  const [expanded, setExpanded] = useState(false);
  const [shrink, setShrink] = useState(false);
  const { pathname } = useLocation();

  // shrink on scroll
  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // auto‐close mobile menu on nav change
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  return (
    <header
      className={`header ${shrink ? "shrink" : ""} ${darkMode ? "dark" : ""}`}
      role="navigation"
    >
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={setExpanded}
        className="modern-navbar"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand">
            <div className="logo-circle">
              <img src="/logo.png" alt="ShannyTechSolutions Logo" />
            </div>
            <span>ShannyTechSolutions</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />

          <Navbar.Collapse id="main-nav" className="justify-content-end">
            <Nav className="align-items-center">
              {/* hide these when logged in */}
              {!user && (
                <>
                  <Nav.Link as={NavLink} to="/" end className="nav-link">
                    Home
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/blog" className="nav-link">
                    Blog
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/resources" className="nav-link">
                    Resources
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/case-studies"
                    className="nav-link"
                  >
                    Case Studies
                  </Nav.Link>
                </>
              )}

              <NavDropdown
                title="Tools"
                id="tools-dropdown"
                className="nav-link"
              >
                <NavDropdown.Item as={NavLink} to="/tools/roi">
                  ROI Calculator
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/tools/quiz">
                  Service Quiz
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={NavLink} to="/member" className="nav-link">
                {user ? "Dashboard" : "Member"}
              </Nav.Link>

              {user ? (
                <Nav.Link onClick={signOut} className="nav-link">
                  Logout
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login" className="nav-link">
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/signup"
                    className="nav-link signup-btn"
                  >
                    Sign Up
                  </Nav.Link>
                </>
              )}

              <div className="nav-icon">
                <LanguageSwitcher />
              </div>
              <div className="nav-icon">
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
