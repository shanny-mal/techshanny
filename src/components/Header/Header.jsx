// src/components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle.jsx";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import "./Header.css";

const Header = ({ darkMode, setDarkMode }) => {
  const { user, signOut } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [shrink, setShrink] = useState(false);
  const { pathname } = useLocation();

  // Shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => setShrink(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  return (
    <header role="navigation" className={shrink ? "navbar-shrink" : ""}>
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={(val) => setExpanded(val)}
        className="modern-navbar"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="modern-brand">
            <div className="logo-circle">
              <img
                src="/logo.png"
                alt="ShannyTechSolutions Logo"
                className="logo"
              />
            </div>
            <span className="brand-text">ShannyTechSolutions</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto modern-nav" activeKey={pathname}>
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blog">
                Blog
              </Nav.Link>
              <Nav.Link as={NavLink} to="/resources">
                Resources
              </Nav.Link>
              <Nav.Link as={NavLink} to="/case-studies">
                Case Studies
              </Nav.Link>

              <NavDropdown title="Tools" id="tools-dropdown">
                <NavDropdown.Item as={NavLink} to="/tools/roi">
                  ROI Calculator
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/tools/quiz">
                  Service Quiz
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={NavLink} to="/member">
                {user ? "Dashboard" : "Member"}
              </Nav.Link>

              {user ? (
                <Nav.Link onClick={signOut}>Logout</Nav.Link>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/signup">
                    Sign Up
                  </Nav.Link>
                </>
              )}

              <Nav.Item className="nav-icon-wrapper">
                <LanguageSwitcher />
              </Nav.Item>
              <Nav.Item className="nav-icon-wrapper">
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
