// src/App.jsx
import React, { useState, useEffect, Suspense, lazy } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Core (eager) imports
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Portfolio from "./components/Portfolio/Portfolio";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";

// Lazy imports
const Testimonials = lazy(() =>
  import("./components/Testimonials/Testimonials")
);
const BlogList = lazy(() => import("./components/Blog/BlogList"));
const BlogPost = lazy(() => import("./components/Blog/BlogPost"));

// Error boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err, info) {
    console.error(err, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="py-5 text-center">Oops—something went wrong.</div>;
    }
    return this.props.children;
  }
}

// Suspense + ErrorBoundary wrapper
const AsyncSection = ({ children, fallback }) => (
  <ErrorBoundary>
    <Suspense fallback={<div className="py-5 text-center">{fallback}</div>}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

// Home page aggregator
const HomePage = () => (
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

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // AOS init
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Load darkMode preference, honor system
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === null) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    } else {
      setDarkMode(stored === "true");
    }
  }, []);

  // Apply & persist darkMode on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
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
        <Route path="/" element={<HomePage />} />
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
      </Routes>

      <LiveChat />
    </HelmetProvider>
  );
}

// Tawk.to live chat integration
const LiveChat = () => {
  useEffect(() => {
    const id = import.meta.env.VITE_TAWK_PROPERTY_ID;
    if (!id) {
      console.warn("VITE_TAWK_PROPERTY_ID not set");
      return;
    }
    if (document.getElementById("tawk-script")) return;

    const s = document.createElement("script");
    s.id = "tawk-script";
    s.async = true;
    s.src = `https://embed.tawk.to/${id}/1ikjpu2t1`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.body.appendChild(s);
  }, []);

  return null;
};

export default App;
