// src/components/Auth/Signup.jsx
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
  const [emailValid, setEmailValid] = useState(null); // null = untouched
  const [pwdStrength, setPwdStrength] = useState(0);

  const errorRef = useRef();

  // 1) Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/member", { replace: true });
    }
  }, [user, loading, navigate]);

  // 2) Focus error alert when it appears
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  // 3) Email format validation
  useEffect(() => {
    if (email === "") {
      setEmailValid(null);
    } else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(re.test(email));
    }
  }, [email]);

  // 4) Password strength meter (0–4)
  useEffect(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;
    setPwdStrength(score);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // inline validations
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (pwdStrength < 2) {
      setError("Password is too weak, please make it stronger.");
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

  // Show a backdrop while loading
  if (loading) {
    return (
      <div className="auth-backdrop">
        <div className="auth-modal loading">Signing you up…</div>
      </div>
    );
  }

  return (
    <div className="auth-backdrop">
      <div
        className="auth-modal"
        role="dialog"
        aria-labelledby="signup-title"
        aria-modal="true"
      >
        <h2 id="signup-title" className="auth-title">
          Create Your Account
        </h2>

        {error && (
          <div ref={errorRef} className="auth-alert" role="alert" tabIndex={-1}>
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div
            className={`floating-label ${
              emailValid === false ? "invalid" : ""
            }`}
          >
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={emailValid === false}
              aria-describedby="email-error"
            />
            <label htmlFor="signup-email">Email address</label>
            {emailValid === false && (
              <span id="email-error" className="field-error">
                Please provide a valid email.
              </span>
            )}
          </div>

          {/* Password */}
          <div className="floating-label">
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-describedby="password-strength"
            />
            <label htmlFor="signup-password">Password</label>
            <div id="password-strength" className="pwd-meter">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`bar strength-${pwdStrength >= level ? level : 0}`}
                />
              ))}
            </div>
          </div>

          <button className="btn-auth primary" type="submit" disabled={loading}>
            Sign Up
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
