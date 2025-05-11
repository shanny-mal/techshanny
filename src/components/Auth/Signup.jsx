import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Signup() {
  const navigate = useNavigate();
  const { user, loading, signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [pwdStrength, setPwdStrength] = useState(0);

  const errorRef = useRef();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) navigate("/member", { replace: true });
  }, [user, loading, navigate]);

  // Focus error alert when it appears
  useEffect(() => {
    if (error && errorRef.current) errorRef.current.focus();
  }, [error]);

  // Validate email as user types
  useEffect(() => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailValid(email === "" ? null : valid);
  }, [email]);

  // Compute a simple password strength score
  useEffect(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[\W]/.test(password)) score++;
    setPwdStrength(score);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // inline checks
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (pwdStrength < 2) {
      setError("Please choose a stronger password.");
      return;
    }
    setError("");
    try {
      await signUp(email.trim(), password);
      navigate("/member", { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed—please try again.");
    }
  };

  if (loading) {
    return (
      <div className="auth-backdrop">
        <div className="auth-modal text-center">Signing you up…</div>
      </div>
    );
  }

  return (
    <div className="auth-backdrop">
      <div className="auth-modal" role="dialog" aria-labelledby="signup-title">
        <h2 id="signup-title" className="auth-title">
          Create Your Account
        </h2>

        {error && (
          <div
            ref={errorRef}
            id="signup-error"
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
              id="signup-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={emailValid === false}
            />
            <label htmlFor="signup-email">Email address</label>
            {emailValid === false && (
              <span className="field-error">Invalid email</span>
            )}
          </div>

          {/* Password Field */}
          <div className="floating-label">
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-describedby="signup-pwd-strength"
            />
            <label htmlFor="signup-password">Password</label>
            <div id="signup-pwd-strength" className="pwd-meter">
              <div className={`bar strength-${pwdStrength}`}></div>
            </div>
          </div>

          <button className="btn-auth primary" type="submit" disabled={loading}>
            {loading ? "Signing up…" : "Sign Up"}
          </button>
        </form>

        <p className="small text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
