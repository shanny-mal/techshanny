// src/components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  const currentHash = window.location.hash || "#home";
  const [expanded, setExpanded] = useState(false);
  const [shrink, setShrink] = useState(false);

  // Shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header role="navigation" className={shrink ? "navbar-shrink" : ""}>
      <Navbar
        className="modern-navbar"
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      >
        <Container>
          <Navbar.Brand href="#home" className="modern-brand">
            <div className="logo-circle">
              <img
                src="/logo.png"
                alt="ShannyTechSolutions Logo"
                className="logo"
              />
            </div>
            <span className="brand-text">ShannyTechSolutions</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbar-nav"
            aria-label="Toggle navigation"
            aria-expanded={expanded}
            className="modern-toggler"
          />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto modern-nav" aria-label="Main menu">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#services", label: "Services" },
                { href: "#portfolio", label: "Portfolio" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <Nav.Link
                  key={link.href}
                  href={link.href}
                  className="modern-nav-link"
                  aria-current={currentHash === link.href ? "page" : undefined}
                >
                  {link.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
