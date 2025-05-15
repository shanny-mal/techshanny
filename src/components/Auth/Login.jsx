import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Login.css";

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
      await signIn({ email: email.trim(), password });
      navigate("/member", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card" role="dialog" aria-labelledby="login-title">
        <h1 id="login-title" className="login-title">
          Welcome Back
        </h1>

        {error && (
          <div
            ref={errorRef}
            tabIndex={-1}
            className="login-error"
            role="alert"
          >
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div
            className={`field-group ${emailValid === false ? "invalid" : ""}`}
          >
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={emailValid === false}
              required
            />
            {emailValid === false && (
              <small className="field-error">Invalid email</small>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="pwd-strength"
              required
            />
            <div id="pwd-strength" className="pwd-meter">
              <div className={`bar strength-${pwdStrength}`}></div>
            </div>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
