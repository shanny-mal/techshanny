// src/components/DarkModeToggle/DarkModeToggle.jsx
import React, { useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./DarkModeToggle.css";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  // Detect system preference on first load if no stored preference
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === null) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, [setDarkMode]);

  // Apply dark-mode class to <html> and persist
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleMode}
      aria-pressed={darkMode}
      aria-label="Toggle dark mode"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default DarkModeToggle;
