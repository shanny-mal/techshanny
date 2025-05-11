// src/components/DarkModeToggle/DarkModeToggle.jsx
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
// Note: import from ThemeContext (not the older DarkModeContext)
import { useDarkMode } from "../../context/ThemeContext.jsx";
import "./DarkModeToggle.css";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      type="button"
      className={`dark-mode-toggle ${darkMode ? "dark" : ""}`}
      onClick={toggleDarkMode}
      aria-pressed={darkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="sr-only">
        {darkMode ? "Switch to light mode" : "Switch to dark mode"}
      </span>
      <div className="toggle-track">
        <FaSun className="icon sun" />
        <FaMoon className="icon moon" />
        <span className="toggle-thumb" />
      </div>
    </button>
  );
}
