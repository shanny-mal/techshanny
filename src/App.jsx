// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Contexts
import { DarkModeProvider } from "./context/DarkModeContext";
import { AuthProvider } from "./context/AuthContext";

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

// Grab your Tawk.to ID from Vite env
const TAWK_ID = import.meta.env.VITE_TAWK_PROPERTY_ID;

// Error boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err, info) {
    console.error("ErrorBoundary caught:", err, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="py-5 text-center">Oops—something went wrong.</div>;
    }
    return this.props.children;
  }
}

// Wrapper for suspense + error boundary
function AsyncSection({ children, fallback }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="py-5 text-center">{fallback}</div>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

// The home page, composed of all sections
function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <AsyncSection fallback="Loading Testimonials…">
        <Testimonials />
      </AsyncSection>
      <AsyncSection fallback="Loading Blog…">
        <BlogList />
      </AsyncSection>
      <Contact />
      <Footer />
    </>
  );
}

// Live chat snippet injector
function LiveChat() {
  React.useEffect(() => {
    if (!TAWK_ID) {
      console.warn("Missing VITE_TAWK_PROPERTY_ID in .env");
      return;
    }
    if (document.getElementById("tawk-script")) return;

    const s = document.createElement("script");
    s.id = "tawk-script";
    s.async = true;
    s.src = `https://embed.tawk.to/${TAWK_ID}/default`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.body.appendChild(s);

    return () => document.getElementById("tawk-script")?.remove();
  }, []);

  return null;
}

function App() {
  // AOS init once
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>ShannyTechSolutions – Cutting-edge Technology Solutions</title>
        <meta
          name="description"
          content="ShannyTechSolutions provides innovative technology solutions—from web development to IT consulting."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      {/* Wrap the entire app in both Auth and DarkMode contexts */}
      <AuthProvider>
        <DarkModeProvider>
          <Header />
          {/* Anywhere in your tree, you can render a toggle */}
          <DarkModeToggle />

          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected */}
            <Route
              path="/member"
              element={
                <RequireAuth>
                  <MemberDashboard />
                </RequireAuth>
              }
            />

            {/* Blog */}
            <Route
              path="/blog"
              element={
                <AsyncSection fallback="Loading Blog…">
                  <BlogList />
                </AsyncSection>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <AsyncSection fallback="Loading Article…">
                  <BlogPost />
                </AsyncSection>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <LiveChat />
        </DarkModeProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
