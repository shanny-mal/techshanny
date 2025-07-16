// src/context/ApiContext.jsx
import React, { createContext, useContext } from "react";

const ApiContext = createContext({
  baseUrl: "",
});

export function ApiProvider({ children }) {
  const baseUrl = import.meta.env.VITE_API_URL || "";
  return (
    <ApiContext.Provider value={{ baseUrl }}>{children}</ApiContext.Provider>
  );
}

export function useApi() {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error("useApi must be inside ApiProvider");
  return ctx;
}
