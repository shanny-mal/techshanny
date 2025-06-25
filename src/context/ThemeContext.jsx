import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();
const STORAGE_KEY = "theme";

function getInitialTheme() {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia === "undefined"
  ) {
    return "light";
  }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch {
    //
  }
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  if (mql.matches) {
    return "dark";
  }
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [isUserToggled, setIsUserToggled] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    if (isUserToggled) {
      try {
        window.localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        //
      }
    }
  }, [theme, isUserToggled]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    ) {
      return;
    }
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!isUserToggled) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
    } else {
      mql.addListener(handleChange);
    }
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleChange);
      } else {
        mql.removeListener(handleChange);
      }
    };
  }, [isUserToggled]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    setIsUserToggled(true);
  }, []);

  const value = {
    isDark: theme === "dark",
    theme,
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

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
