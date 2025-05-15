import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import api, { auth, TOKEN_KEY } from "../services/api.js";

// Simple logger — replace with Sentry/logger of your choice
const log = (...args) => console.debug("[Auth]", ...args);

const AuthContext = createContext({
  user: null,
  isAdmin: false,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: () => {},
  refreshUser: async () => {},
  updatePost: async () => {},
  deletePost: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // ─── Refresh current user from server ──────────────────────────────────────
  const refreshUser = useCallback(async () => {
    log("refreshUser: start");
    const tokens = JSON.parse(localStorage.getItem(TOKEN_KEY) || "{}");
    if (!tokens.access) {
      log("refreshUser: no access token found");
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const me = await auth.currentUser();
      log("refreshUser: fetched user", me);
      setUser(me);
      setIsAdmin(!!me.is_staff || !!me.is_superuser);
    } catch (err) {
      console.error("[Auth] refreshUser failed:", err);
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
      log("refreshUser: done");
    }
  }, []);

  // On mount, load the user
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // ─── Sign Up ───────────────────────────────────────────────────────────────
  const signUp = async ({ email, password, first_name, last_name }) => {
    log("signUp: payload", { email, first_name, last_name });
    setLoading(true);
    try {
      await auth.register({ email, password, first_name, last_name });
      log("signUp: success");
      return true;
    } catch (err) {
      console.error("[Auth] signUp error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ─── Sign In ───────────────────────────────────────────────────────────────
  const signIn = async ({ email, password }) => {
    log("signIn: attempt", email);
    setLoading(true);
    try {
      await auth.login({ email, password });
      log("signIn: login API success");
      await refreshUser();
      return true;
    } catch (err) {
      console.error("[Auth] signIn error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ─── Sign Out ──────────────────────────────────────────────────────────────
  const signOut = () => {
    log("signOut: clearing tokens and redirecting");
    auth.logout(); // clears tokens & redirects
    setUser(null);
    setIsAdmin(false);
  };

  // ─── Update a Post ────────────────────────────────────────────────────────
  const updatePost = async (id, payload) => {
    log("updatePost:", id, payload);
    try {
      const updated = await api.update("posts", id, payload);
      log("updatePost: success", updated);
      return updated;
    } catch (err) {
      console.error("[Auth] updatePost error:", err);
      throw err;
    }
  };

  // ─── Delete a Post ────────────────────────────────────────────────────────
  const deletePost = async (id) => {
    log("deletePost:", id);
    try {
      await api.remove("posts", id);
      log("deletePost: success");
      return true;
    } catch (err) {
      console.error("[Auth] deletePost error:", err);
      throw err;
    }
  };

  // While initial auth state is loading, render a spinner/gateway
  if (loading) {
    return (
      <div className="auth-loading">
        {/* Replace with your favorite Spinner */}
        Authenticating…
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        signUp,
        signIn,
        signOut,
        refreshUser,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
