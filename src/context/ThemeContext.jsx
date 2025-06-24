// src/context/ThemeContext.jsx

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import PropTypes from "prop-types";

// Create Context
const ThemeContext = createContext();

// Key used in localStorage
const STORAGE_KEY = "theme"; // stores 'light' or 'dark'

// Utility to get initial theme:
// - If window is undefined (e.g., SSR), default to 'light'.
// - If localStorage has 'theme', use that.
// - Otherwise, use OS preference if available.
// - Fallback to 'light'.
function getInitialTheme() {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia === "undefined"
  ) {
    // SSR or older browsers: default to light
    return "light";
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch (err) {
    // localStorage might be unavailable, ignore
    console.warn("Could not access localStorage for theme:", err);
  }

  // No saved preference, use OS preference
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  if (mql.matches) {
    return "dark";
  }
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  // Track whether user explicitly toggled theme
  const [isUserToggled, setIsUserToggled] = useState(false);

  // Effect: apply theme class to <html> and persist if user toggled
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Persist only if user toggled
    if (isUserToggled) {
      try {
        window.localStorage.setItem(STORAGE_KEY, theme);
      } catch (err) {
        console.warn("Could not write theme to localStorage:", err);
      }
    }
  }, [theme, isUserToggled]);

  // Optional: listen to OS theme changes if user has NOT explicitly toggled
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    ) {
      return;
    }
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // Only update if user hasn't toggled manually
      if (!isUserToggled) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    // Listen to changes
    mql.addEventListener
      ? mql.addEventListener("change", handleChange)
      : mql.addListener(handleChange);
    return () => {
      mql.removeEventListener
        ? mql.removeEventListener("change", handleChange)
        : mql.removeListener(handleChange);
    };
  }, [isUserToggled]);

  // toggleTheme: flips between light and dark; mark as user-toggled
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    setIsUserToggled(true);
  }, []);

  // Expose boolean isDark and toggleTheme
  const value = {
    isDark: theme === "dark",
    theme, // 'light' or 'dark' if needed
    toggleTheme,
    setLight: useCallback(() => {
      setTheme("light");
      setIsUserToggled(true);
    }, []),
    setDark: useCallback(() => {
      setTheme("dark");
      setIsUserToggled(true);
    }, []),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook for consuming context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
