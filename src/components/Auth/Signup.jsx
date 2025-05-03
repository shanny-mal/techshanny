// src/components/Auth/Signup.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const { user, loading, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [error, setError] = useState("");

  // If already logged in, send to dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate("/member", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // signUp returns { user, session }
      const { user: newUser, session } = await signUp(email.trim(), password);
      // On success, go straight to member area
      navigate("/member", { replace: true });
    } catch (err) {
      // err.message contains Supabase error
      setError(err.message || "An unexpected error occurred");
    }
  };

  // While checking auth state, show loading
  if (loading) {
    return <p>Loading…</p>;
  }

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPwd(e.target.value)}
          required
        />

        <button className="btn-auth" type="submit" disabled={loading}>
          {loading ? "Signing up…" : "Sign Up"}
        </button>
      </form>

      <p className="small">
        Already have an account?{" "}
        <Link to="/login" className="link">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
