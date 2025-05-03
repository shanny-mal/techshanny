// src/components/DarkModeToggle/DarkModeToggle.jsx
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./DarkModeToggle.css";

export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      type="button"
      className={`dark-mode-toggle ${darkMode ? "dark" : ""}`}
      onClick={() => setDarkMode((prev) => !prev)}
      aria-pressed={darkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* visually hidden for screen readers */}
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
