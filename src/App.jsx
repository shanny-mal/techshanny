import React, { useState, useEffect, Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Portfolio from "./components/Portifolio/Portfolio/"; // Verify path if needed
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";

// Lazy-load components for better performance
const Testimonials = React.lazy(() =>
  import("./components/Testimonials/Testimonials")
);
const Blog = React.lazy(() => import("./components/Blog/Blog"));
const BlogPostDetail = React.lazy(() =>
  import("./components/Blog/BlogPostDetail")
);

// Error Boundary to catch errors in lazy-loaded components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong loading this section.</div>;
    }
    return this.props.children;
  }
}

// Consolidate homepage content into its own component
const HomePage = () => (
  <>
    <Hero />
    <About />
    <Services />
    <Portfolio />
    <ErrorBoundary>
      <Suspense fallback={<div>Loading Testimonials...</div>}>
        <Testimonials />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<div>Loading Blog...</div>}>
        <Blog />
      </Suspense>
    </ErrorBoundary>
    <Contact />
    <Footer />
  </>
);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize AOS animations on mount
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Retrieve dark mode preference from localStorage on load
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
  }, []);

  // Update dark mode class on body and persist the preference
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>ShannyTechSolutions - Cutting-edge Technology Solutions</title>
        <meta
          name="description"
          content="ShannyTechSolutions provides innovative technology solutions including web development, networking, IT consulting, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Header />
      {/* Dark Mode Toggle fixed at the top-right */}
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/blog"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Blog...</div>}>
                <Blog />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Blog Post...</div>}>
                <BlogPostDetail />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Routes>
      <LiveChat />
    </HelmetProvider>
  );
}

const LiveChat = () => {
  useEffect(() => {
    const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID;

    if (!propertyId) {
      console.warn(
        "Tawk.to property ID is not set. Please check your .env file."
      );
      return;
    }

    // Prevent duplicate script injection
    if (document.getElementById("tawk-chat-script")) return;

    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = `https://embed.tawk.to/${propertyId}/1ikjpu2t1`;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s1.id = "tawk-chat-script";

    document.body.appendChild(s1);
  }, []);

  return null;
};

export default App;
