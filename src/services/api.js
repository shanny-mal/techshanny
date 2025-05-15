// src/services/api.js

import axios from "axios";

/** ─── Configuration & Logging Endpoint ─────────────────────────────────────── */
const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") ||
  "http://localhost:8000/api";

// If you have a dedicated logging endpoint (e.g. `/logs/`), configure it here:
const LOGGING_URL =
  import.meta.env.VITE_LOGGING_URL?.replace(/\/+$/, "") || null; // e.g. "http://localhost:8000/api/logs/"

/** Key under which we store JWT tokens in localStorage */
export const TOKEN_KEY = "authTokens";

/** ─── Simple Logger Utility ─────────────────────────────────────────────────── */
export const logger = {
  /** send to console and optionally to remote */
  _sendRemote: async (level, message, meta) => {
    if (!LOGGING_URL) return;
    try {
      await fetch(LOGGING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, message, meta, timestamp: new Date() }),
      });
    } catch {
      // swallow
    }
  },
  info: (message, meta = {}) => {
    console.info("[API]", message, meta);
    logger._sendRemote("info", message, meta);
  },
  warn: (message, meta = {}) => {
    console.warn("[API]", message, meta);
    logger._sendRemote("warn", message, meta);
  },
  error: (message, meta = {}) => {
    console.error("[API]", message, meta);
    logger._sendRemote("error", message, meta);
  },
};

/** ─── Axios Client Setup ───────────────────────────────────────────────────── */
const client = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Attach Access Token
client.interceptors.request.use((config) => {
  const start = Date.now();
  config.metadata = { start };
  let tokens = {};
  try {
    tokens = JSON.parse(localStorage.getItem(TOKEN_KEY)) || {};
  } catch {
    tokens = {};
  }
  if (tokens.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  logger.info("Request sent", {
    method: config.method,
    url: config.url,
    data: config.data,
  });
  return config;
});

// Handle 401 + Refresh & log responses
let isRefreshing = false;
let refreshQueue = [];

client.interceptors.response.use(
  (res) => {
    const { config } = res;
    const duration = Date.now() - config.metadata.start;
    logger.info("Response received", {
      method: config.method,
      url: config.url,
      status: res.status,
      duration: `${duration}ms`,
    });
    return res;
  },
  async (err) => {
    const { config, response } = err;
    const duration = config?.metadata
      ? Date.now() - config.metadata.start
      : null;

    logger.error("Response error", {
      method: config?.method,
      url: config?.url,
      status: response?.status,
      duration: duration != null ? `${duration}ms` : "n/a",
      data: response?.data,
    });

    // token refresh logic…
    if (
      response?.status === 401 &&
      !config._retry &&
      response.data?.code === "token_not_valid"
    ) {
      config._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        })
          .then((newAccess) => {
            config.headers.Authorization = `Bearer ${newAccess}`;
            return client(config);
          })
          .catch((e) => Promise.reject(e));
      }

      isRefreshing = true;
      try {
        const stored = JSON.parse(localStorage.getItem(TOKEN_KEY) || "{}");
        const refreshRes = await axios.post(
          `${API_BASE}/auth/refresh/`,
          { refresh: stored.refresh },
          { headers: { "Content-Type": "application/json" } }
        );

        const newTokens = {
          access: refreshRes.data.access,
          refresh: refreshRes.data.refresh || stored.refresh,
        };
        localStorage.setItem(TOKEN_KEY, JSON.stringify(newTokens));
        logger.info("Token refreshed");

        refreshQueue.forEach(({ resolve }) => resolve(newTokens.access));
        refreshQueue = [];

        config.headers.Authorization = `Bearer ${newTokens.access}`;
        return client(config);
      } catch (refreshErr) {
        refreshQueue.forEach(({ reject }) => reject(refreshErr));
        refreshQueue = [];
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = "/login";
        logger.warn("Refresh failed, logging out");
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

/** ─── Utility: flatten DRF error payloads ───────────────────────────────────── */
function getErrorMessage(error) {
  const data = error.response?.data;
  if (data) {
    if (typeof data === "string") return data;
    const [key] = Object.keys(data);
    const val = data[key];
    return Array.isArray(val) ? val.join(" ") : String(val);
  }
  return error.message;
}

/** ─── Authentication API (with logging) ───────────────────────────────────── */
export const auth = {
  register: async (payload) => {
    logger.info("Register attempt", { payload });
    try {
      const res = await client.post("/auth/register/", payload);
      logger.info("Register success", { user: res.data });
      return res.data;
    } catch (e) {
      const msg = getErrorMessage(e);
      logger.error("Register failed", { message: msg });
      throw new Error(msg);
    }
  },
  login: async ({ email, password }) => {
    logger.info("Login attempt", { email });
    try {
      const res = await client.post("/auth/login/", { email, password });
      const tokens = { access: res.data.access, refresh: res.data.refresh };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
      logger.info("Login success");
      return tokens;
    } catch (e) {
      const msg = getErrorMessage(e);
      logger.error("Login failed", { message: msg });
      throw new Error(msg);
    }
  },
  logout: () => {
    logger.info("Logout");
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
  },
  currentUser: async () => {
    logger.info("Fetching current user");
    try {
      const stored = JSON.parse(localStorage.getItem(TOKEN_KEY) || "{}");
      if (!stored.access) throw new Error("No access token");
      // decode JWT to get user_id…
      const base64 = stored.access.split(".")[1];
      const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
      const payload = JSON.parse(json);
      const userId = payload.user_id;
      if (!userId) throw new Error("Invalid token payload");

      const res = await client.get(`/users/${userId}/`);
      logger.info("Fetched current user", { user: res.data });
      return res.data;
    } catch (e) {
      const msg = e.message;
      logger.error("Fetch currentUser failed", { message: msg });
      throw new Error(msg);
    }
  },
};

/** ─── Generic CRUD API (with logging) ─────────────────────────────────────── */
export const api = {
  getList: async (resource, params = {}) => {
    logger.info(`GET list: ${resource}`, { params });
    try {
      const res = await client.get(`/${resource}/`, { params });
      logger.info(`GET list success: ${resource}`, { count: res.data.length });
      return res.data;
    } catch (e) {
      const msg = getErrorMessage(e);
      logger.error(`GET list failed: ${resource}`, { message: msg });
      throw new Error(msg);
    }
  },
  getOne: async (resource, id) => {
    logger.info(`GET one: ${resource}/${id}`);
    try {
      const res = await client.get(`/${resource}/${id}/`);
      logger.info(`GET one success: ${resource}/${id}`);
      return res.data;
    } catch (e) {
      const msg = getErrorMessage(e);
      logger.error(`GET one failed: ${resource}/${id}`, { message: msg });
      throw new Error(msg);
    }
  },
  create: async (resource, payload) => {
    logger.info(`CREATE: ${resource}`, { payload });
    try {
      const res = await client.post(`/${resource}/`, payload);
      logger.info(`CREATE success: ${resource}`, { id: res.data.id });
      return res.data;
    } catch (e) {
      const msg = getErrorMessage(e);
      logger.error(`CREATE failed: ${resource}`, { message: msg });
      throw new Error(msg);
    }
  },
  update: async (resource, id, payload) => {
    logger.info(`UPDATE: ${resource}/${id}`, { payload });
    try {
      const res = await client.patch(`/${resource}/${id}/`, payload);
      logger.info(`UPDATE success: ${resource}/${id}`);
      return res.data;
    } catch (e) {
      const msg = getErrorMessage(e);
      logger.error(`UPDATE failed: ${resource}/${id}`, { message: msg });
      throw new Error(msg);
    }
  },
  remove: async (resource, id) => {
    logger.info(`DELETE: ${resource}/${id}`);
    try {
      await client.delete(`/${resource}/${id}/`);
      logger.info(`DELETE success: ${resource}/${id}`);
      return true;
    } catch (e) {
      const msg = getErrorMessage(e);
      logger.error(`DELETE failed: ${resource}/${id}`, { message: msg });
      throw new Error(msg);
    }
  },
};

export default api;
