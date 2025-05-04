// src/components/Auth/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading…</p>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
