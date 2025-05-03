// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";

// Conditionally load the language detector only in browser
let LanguageDetector;
if (typeof window !== "undefined") {
  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    LanguageDetector = require("i18next-browser-languagedetector").default;
  } catch (err) {
    console.warn(
      "i18next-browser-languagedetector not found, skipping language detection"
    );
  }
}

const detector = LanguageDetector
  ? LanguageDetector
  : {
      type: "languageDetector",
      detect: () => "en",
      init: () => {},
      cacheUserLanguage: () => {},
    };

i18n
  // Use the detector or fallback stub
  .use(detector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "fr", "es"],
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie", "localStorage"],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false, // disable suspense
    },
  });

export default i18n;
