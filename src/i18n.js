// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";

i18n
  // 1) browser language detection
  .use(LanguageDetector)
  // 2) bind react-i18next
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
      // where to look for the user language
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      // where to cache the language
      caches: ["cookie", "localStorage"],
    },
    interpolation: {
      escapeValue: false, // React already does XSS protection
    },
    react: {
      useSuspense: false, // disable suspense for translations
    },
  });

export default i18n;
