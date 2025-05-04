import React, { Suspense, lazy, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Contexts
import { DarkModeProvider } from "./context/DarkModeContext";
import { AuthProvider } from "./context/AuthContext";

// Core Components
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import Services from "./components/Services/Services.jsx";
import Portfolio from "./components/Portfolio/Portfolio.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle.jsx";

// Auth & Protected
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import RequireAuth from "./components/Auth/RequireAuth.jsx";
import MemberDashboard from "./pages/MemberDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

// Lazy-loaded Features
const Testimonials = lazy(() =>
  import("./components/Testimonials/Testimonials.jsx")
);
const BlogList = lazy(() => import("./components/Blog/BlogList.jsx"));
const BlogPost = lazy(() => import("./components/Blog/BlogPost.jsx"));
const BlogEdit = lazy(() => import("./components/Blog/BlogEdit.jsx"));
const ROICalculator = lazy(() =>
  import("./components/Tools/ROICalculator.jsx")
);
const ServiceQuiz = lazy(() => import("./components/Tools/ServiceQuiz.jsx"));
const ResourceList = lazy(() =>
  import("./components/ResourceLibrary/ResourceList.jsx")
);
const NewsletterForm = lazy(() =>
  import("./components/Newsletter/NewsletterForm.jsx")
);

// Tawk.to Live Chat ID from ENV
const TAWK_ID = import.meta.env.VITE_TAWK_PROPERTY_ID;

// -----------------
// Error Boundary
// -----------------
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="py-5 text-center text-danger">
          Oops—something went wrong.
        </div>
      );
    }
    return this.props.children;
  }
}

// -----------------
// Async Section Wrapper
// -----------------
function AsyncSection({ children, fallback }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="py-5 text-center">{fallback}</div>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

// -----------------
// Homepage Sections
// -----------------
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

// -----------------
// Live Chat Script Loader
// -----------------
function LiveChat() {
  useEffect(() => {
    if (!TAWK_ID) {
      console.warn("Missing VITE_TAWK_PROPERTY_ID in .env");
      return;
    }
    if (document.getElementById("tawk-script")) return;

    const script = document.createElement("script");
    script.id = "tawk-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_ID}/1ikjpu2t1`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => document.getElementById("tawk-script")?.remove();
  }, []);

  return null;
}

// -----------------
// Main App
// -----------------
function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>ShannyTechSolutions – Cutting‑edge Technology Solutions</title>
        <meta
          name="description"
          content="ShannyTechSolutions provides innovative technology solutions—from web development to IT consulting."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <AuthProvider>
        <DarkModeProvider>
          <Header />
          <DarkModeToggle />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Dashboard */}
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
                <AsyncSection fallback="Loading Post…">
                  <BlogPost />
                </AsyncSection>
              }
            />
            <Route
              path="/blog/edit/:id"
              element={
                <RequireAuth>
                  <AsyncSection fallback="Loading Editor…">
                    <BlogEdit />
                  </AsyncSection>
                </RequireAuth>
              }
            />

            {/* Tools */}
            <Route
              path="/tools/roi"
              element={
                <AsyncSection fallback="Loading ROI Calculator…">
                  <ROICalculator />
                </AsyncSection>
              }
            />
            <Route
              path="/tools/quiz"
              element={
                <AsyncSection fallback="Loading Service Quiz…">
                  <ServiceQuiz />
                </AsyncSection>
              }
            />

            {/* Resource Library */}
            <Route
              path="/resources"
              element={
                <AsyncSection fallback="Loading Resources…">
                  <ResourceList />
                </AsyncSection>
              }
            />

            {/* Newsletter Signup */}
            <Route
              path="/newsletter"
              element={
                <AsyncSection fallback="Loading Newsletter Form…">
                  <NewsletterForm />
                </AsyncSection>
              }
            />

            {/* Fallback 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <LiveChat />
        </DarkModeProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
