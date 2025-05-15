import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { FaGlobe } from "react-icons/fa";
import "./LanguageSwitcher.css";

// Supported languages — match your src/locales/<code>.json files
const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current =
    LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0];

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <Dropdown align="end" className="language-switcher">
      <Dropdown.Toggle
        id="language-switcher-toggle"
        variant="link"
        className="language-switcher-toggle"
        aria-label="Select language"
      >
        <FaGlobe className="lang-icon" /> {current.label}
      </Dropdown.Toggle>

      <Dropdown.Menu className="language-switcher-menu">
        {LANGUAGES.map(({ code, label }) => (
          <Dropdown.Item
            key={code}
            active={i18n.language === code}
            onClick={() => handleSelect(code)}
          >
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
