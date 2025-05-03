// src/components/LanguageSwitcher/LanguageSwitcher.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import { NavDropdown } from "react-bootstrap";
import "./LanguageSwitcher.css";

// List of supported languages — match your src/locales/<code>.json filenames
const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // Determine which label to show based on current language
  const current =
    LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0];

  const handleSelect = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <NavDropdown
      title={current.label}
      id="language-switcher"
      className="language-switcher"
      align="end"
    >
      {LANGUAGES.map((lang) => (
        <NavDropdown.Item
          key={lang.code}
          active={i18n.language === lang.code}
          onClick={() => handleSelect(lang.code)}
        >
          {lang.label}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default LanguageSwitcher;
