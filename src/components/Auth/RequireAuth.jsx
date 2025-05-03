import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function RequireAuth({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // still determining auth state
    return <p>Loading…</p>;
  }
  if (!user) {
    // not signed in → redirect to login
    return <Navigate to="/login" replace />;
  }
  return children;
}
