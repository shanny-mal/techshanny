// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";

export const AuthContext = createContext({
  session: null,
  user: null,
  loading: false,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  signInWithGoogle: async () => {},
  updatePost: async () => {},
  deletePost: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) initialize session
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("getSession error:", error.message);
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    })();

    // 2) subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    // cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign up with email & password
  const signUp = async (email, password) => {
    if (!email || !password) throw new Error("Email and password are required");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      console.error("signUp error:", error.message);
      throw error;
    }
    return data;
  };

  // Sign in with email & password
  const signIn = async (email, password) => {
    if (!email || !password) throw new Error("Email and password are required");
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      console.error("signIn error:", error.message);
      throw error;
    }
    return data;
  };

  // Sign out
  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (error) {
      console.error("signOut error:", error.message);
      throw error;
    }
  };

  // Google OAuth
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/member" },
    });
    if (error) {
      console.error("Google sign-in error:", error.message);
      throw error;
    }
  };

  // Update a post
  const updatePost = async (id, payload) => {
    const { error } = await supabase.from("posts").update(payload).eq("id", id);
    if (error) {
      console.error("updatePost error:", error.message);
      throw error;
    }
  };

  // Delete a post
  const deletePost = async (id) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.error("deletePost error:", error.message);
      throw error;
    }
  };

  // While loading initial session
  if (loading) {
    return <p>Loading authentication…</p>;
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signUp,
        signIn,
        signOut,
        signInWithGoogle,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
