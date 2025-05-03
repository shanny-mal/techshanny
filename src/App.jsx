// src/App.jsx
import React, { useState, useEffect, Suspense, lazy } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Core (eager) imports
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import Services from "./components/Services/Services.jsx";
import Portfolio from "./components/Portfolio/Portfolio.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle.jsx";

// Auth & Member imports
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import RequireAuth from "./components/Auth/RequireAuth.jsx";
import MemberDashboard from "./pages/MemberDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

// Lazy imports
const Testimonials = lazy(() =>
  import("./components/Testimonials/Testimonials.jsx")
);
const BlogList = lazy(() => import("./components/Blog/BlogList.jsx"));
const BlogPost = lazy(() => import("./components/Blog/BlogPost.jsx"));

// Error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="py-5 text-center">Oops—something went wrong.</div>;
    }
    return this.props.children;
  }
}

// Suspense + ErrorBoundary wrapper
function AsyncSection({ children, fallback }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="py-5 text-center">{fallback}</div>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

// Home page aggregator
function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <AsyncSection fallback={<span>Loading Testimonials…</span>}>
        <Testimonials />
      </AsyncSection>
      <AsyncSection fallback={<span>Loading Blog Posts…</span>}>
        <BlogList />
      </AsyncSection>
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // AOS init once
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Load & honor dark mode system preference or stored setting
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === null) {
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefers);
    } else {
      setDarkMode(stored === "true");
    }
  }, []);

  // Apply to <html> & persist
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>ShannyTechSolutions – Cutting-edge Technology Solutions</title>
        <meta
          name="description"
          content="ShannyTechSolutions provides innovative technology solutions — from web development to IT consulting."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <Header />
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected member area */}
        <Route
          path="/member"
          element={
            <RequireAuth>
              <MemberDashboard />
            </RequireAuth>
          }
        />

        {/* Blog pages */}
        <Route
          path="/blog"
          element={
            <AsyncSection fallback={<span>Loading Blog…</span>}>
              <BlogList />
            </AsyncSection>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <AsyncSection fallback={<span>Loading Article…</span>}>
              <BlogPost />
            </AsyncSection>
          }
        />

        {/* Fallback 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <LiveChat />
    </HelmetProvider>
  );
}

// Tawk.to live chat integration
function LiveChat() {
  // Read the env var into a constant
  const TAWK_PROPERTY_ID = import.meta.env.VITE_TAWK_PROPERTY_ID;

  useEffect(() => {
    // If missing, warn and exit
    if (!TAWK_PROPERTY_ID) {
      console.warn(
        "Tawk.to property ID not set in .env (VITE_TAWK_PROPERTY_ID)"
      );
      return;
    }
    // Prevent multiple script inserts
    if (document.getElementById("tawk-script")) return;

    const s = document.createElement("script");
    s.id = "tawk-script";
    s.async = true;
    s.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/default`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.body.appendChild(s);

    return () => {
      // Clean up if unmounted
      document.getElementById("tawk-script")?.remove();
    };
  }, [TAWK_PROPERTY_ID]);

  return null;
}

export default App;
