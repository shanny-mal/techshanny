// src/components/Auth/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { loading, signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // signIn throws on error
      await signIn(email.trim(), password);
      // direct navigation on success
      navigate("/member", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      // signInWithGoogle throws on error
      await signInWithGoogle();
      // navigate on success
      navigate("/member", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to Your Account</h2>
      {error && <p className="error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPwd(e.target.value)}
          required
        />

        <button className="btn-auth" type="submit" disabled={loading}>
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>

      <button
        className="btn-auth google"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        {loading ? "Logging in…" : "Login with Google"}
      </button>
    </div>
  );
};

export default Login;
