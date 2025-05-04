// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";

export const AuthContext = createContext({
  session: null,
  user: null,
  profile: null,
  isAdmin: false,
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
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // 1) Initialize session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) console.error("getSession:", error.message);
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2) Listen for session changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Whenever `user` changes, fetch their profile row
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setIsAdmin(false);
      return;
    }

    let mounted = true;
    (async () => {
      try {
        const { data: prof, error } = await supabase
          .from("profiles")
          .select("full_name, username, is_admin")
          .eq("id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          // 116 = no row found
          throw error;
        }

        if (!mounted) return;

        setProfile(prof || null);
        setIsAdmin(prof?.is_admin ?? false);
      } catch (err) {
        console.error("Error loading profile:", err.message);
        if (mounted) {
          setProfile(null);
          setIsAdmin(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [user]);

  // Sign up with email & password
  const signUp = async (email, password) => {
    if (!email || !password) throw new Error("Email and password required");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) throw error;
    // Optionally: create an empty profile row here via RPC or .insert()
    return data;
  };

  // Sign in with email & password
  const signIn = async (email, password) => {
    if (!email || !password) throw new Error("Email and password required");
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) throw error;
    return data;
  };

  // Sign out
  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (error) throw error;
  };

  // OAuth (Google)
  const signInWithGoogle = async () => {
    const redirectTo =
      import.meta.env.VITE_REDIRECT_URL || window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) throw error;
  };

  // Update a post by id, restricted to the author
  const updatePost = async (id, payload) => {
    const { error } = await supabase
      .from("posts")
      .update(payload)
      .eq("id", id)
      .eq("author_id", user.id);
    if (error) throw error;
  };

  // Delete a post by id, restricted to the author
  const deletePost = async (id) => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .eq("author_id", user.id);
    if (error) throw error;
  };

  // While initializing, don’t render children
  if (loading) return <p>Loading authentication…</p>;

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isAdmin,
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
