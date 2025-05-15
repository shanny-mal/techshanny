import axios from "axios";
import { TOKEN_KEY } from "./api.js";

// Configure your logging endpoint
const LOG_ENDPOINT =
  import.meta.env.VITE_LOGGING_URL ||
  `${import.meta.env.VITE_API_URL.replace(/\/+$/, "")}/logs/`;

function sendToServer(payload) {
  // Grab stored tokens if any
  let headers = { "Content-Type": "application/json" };
  try {
    const tokens = JSON.parse(localStorage.getItem(TOKEN_KEY)) || {};
    if (tokens.access) {
      headers.Authorization = `Bearer ${tokens.access}`;
    }
  } catch {
    // ignore
  }

  // Fire-and-forget
  axios.post(LOG_ENDPOINT, payload, { headers }).catch((err) => {
    console.error("Failed to send log to server:", err);
  });
}

export const logger = {
  info: (message, meta = {}) => {
    console.info(`[INFO] ${message}`, meta);
    sendToServer({ level: "info", message, meta, timestamp: new Date() });
  },
  warn: (message, meta = {}) => {
    console.warn(`[WARN] ${message}`, meta);
    sendToServer({ level: "warn", message, meta, timestamp: new Date() });
  },
  error: (message, meta = {}) => {
    console.error(`[ERROR] ${message}`, meta);
    sendToServer({ level: "error", message, meta, timestamp: new Date() });
  },
};
