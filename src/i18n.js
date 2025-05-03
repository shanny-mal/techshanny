// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";

i18n
  // Detect user language
  .use(LanguageDetector)
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
      // Order and from where user language should be detected
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      // Cache user language on
      caches: ["cookie", "localStorage"],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false, // true by default - set to false if you don't want to wrap your components in Suspense
    },
  });

export default i18n;
