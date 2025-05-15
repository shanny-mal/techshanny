// src/pages/Login.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { loading, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [pwdStrength, setPwdStrength] = useState(0);

  const errorRef = useRef();

  // Focus the error message when it appears
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  // Real-time email validation
  useEffect(() => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailValid(email === "" ? null : valid);
  }, [email]);

  // Simple password strength meter
  useEffect(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[\W]/.test(password)) score += 1;
    setPwdStrength(score);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Inline validations
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (pwdStrength < 2) {
      setError("Password is too weak.");
      return;
    }
    setError("");

    try {
      // **Changed** to match new AuthContext signature
      await signIn({ email: email.trim(), password });
      navigate("/member", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-backdrop">
      <div className="auth-modal" role="dialog" aria-labelledby="login-title">
        <h2 id="login-title" className="auth-title">
          Login to Your Account
        </h2>

        {error && (
          <div
            ref={errorRef}
            id="login-error"
            className="auth-alert"
            role="alert"
            tabIndex={-1}
          >
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div
            className={`floating-label ${
              emailValid === false ? "invalid" : ""
            }`}
          >
            <input
              id="login-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={emailValid === false}
            />
            <label htmlFor="login-email">Email address</label>
            {emailValid === false && (
              <span className="field-error">Invalid email</span>
            )}
          </div>

          {/* Password Field */}
          <div className="floating-label">
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-describedby="pwd-strength"
            />
            <label htmlFor="login-password">Password</label>
            <div id="pwd-strength" className="pwd-meter">
              <div className={`bar strength-${pwdStrength}`}></div>
            </div>
          </div>

          <button className="btn-auth primary" type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
