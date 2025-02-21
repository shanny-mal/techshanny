import React from "react";
import { Button } from "react-bootstrap";
import "./DarkModeToggle.css";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <div className="dark-mode-toggle text-center my-3">
      <Button
        variant={darkMode ? "secondary" : "outline-secondary"}
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </Button>
    </div>
  );
};

export default DarkModeToggle;
