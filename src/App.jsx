// src/App.jsx
import React, { useEffect, Suspense, lazy } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import { logger } from "./services/logger.js";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import Layout from "./components/Layout/Layout.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import Services from "./components/Services/Services.jsx";
import Portfolio from "./components/Portfolio/Portfolio.jsx";
import Contact from "./components/Contact/Contact.jsx";

import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import RequireAuth from "./components/Auth/RequireAuth.jsx";
import MemberDashboard from "./pages/MemberDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

const Testimonials = lazy(() =>
  import("./components/Testimonials/Testimonials.jsx")
);
const BlogList = lazy(() => import("./components/Blog/BlogList.jsx"));
const BlogPost = lazy(() => import("./components/Blog/BlogPostDetail.jsx"));
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
const CaseStudyList = lazy(() =>
  import("./components/CaseStudies/CaseStudyList.jsx")
);
const CaseStudyDetail = lazy(() =>
  import("./components/CaseStudies/CaseStudyDetail.jsx")
);

const TAWK_ID = import.meta.env.VITE_TAWK_PROPERTY_ID;

// ——— ErrorBoundary ——————————————————————————————————————————————————————
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logger.error("Uncaught error in ErrorBoundary", { error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-5 text-center text-secondary">
          Oops—something went wrong. Please try again later.
        </div>
      );
    }
    return this.props.children;
  }
}

// ——— AsyncSection with logging ————————————————————————————————————————————
function AsyncSection({ name, children, fallback }) {
  useEffect(() => {
    logger.info("AsyncSection mount", { section: name });
  }, [name]);

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <>
            {logger.info("Showing fallback", { section: name })}
            <div className="py-5 text-center text-muted">{fallback}</div>
          </>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

// ——— HomePage ————————————————————————————————————————————————————————
function HomePage() {
  useEffect(() => {
    logger.info("Rendering HomePage");
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <AsyncSection name="Testimonials" fallback="Loading testimonials…">
        <Testimonials />
      </AsyncSection>
      <AsyncSection name="BlogList" fallback="Loading recent posts…">
        <BlogList />
      </AsyncSection>
      <Contact />
    </>
  );
}

// ——— LiveChat loader ————————————————————————————————————————————————————
function LiveChat() {
  useEffect(() => {
    if (!TAWK_ID) {
      logger.warn("TAWK_ID not provided—live chat disabled");
      return;
    }
    if (document.getElementById("tawk-script")) return;
    const s = document.createElement("script");
    s.id = "tawk-script";
    s.async = true;
    s.src = `https://embed.tawk.to/${TAWK_ID}/1ikjpu2t1`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    s.onload = () => logger.info("Tawk live chat script loaded");
    s.onerror = () => logger.error("Failed to load Tawk script");
    document.body.appendChild(s);
    return () => {
      document.getElementById("tawk-script")?.remove();
      logger.info("Tawk live chat script removed");
    };
  }, []);
  return null;
}

// ——— AppContent ———————————————————————————————————————————————————————
function AppContent() {
  const location = useLocation();

  // Log page views
  useEffect(() => {
    logger.info("Page view", { path: location.pathname });
  }, [location.pathname]);

  // Global error handlers
  useEffect(() => {
    const handleRejection = (e) => {
      logger.error("Unhandled Promise rejection", { reason: e.reason });
    };
    const handleError = (e) => {
      logger.error("Uncaught error", {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
      });
    };
    window.addEventListener("unhandledrejection", handleRejection);
    window.addEventListener("error", handleError);
    return () => {
      window.removeEventListener("unhandledrejection", handleRejection);
      window.removeEventListener("error", handleError);
    };
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    logger.info("AOS initialized");
  }, []);

  return (
    <Layout header={<Header />} footer={<Footer />}>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<SignupWrapper />} />

        <Route
          path="/member"
          element={
            <RequireAuth>
              <MemberDashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/blog"
          element={
            <AsyncSection name="BlogListRoute" fallback="Loading blog…">
              <BlogList />
            </AsyncSection>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <AsyncSection name="BlogPostRoute" fallback="Loading post…">
              <BlogPost />
            </AsyncSection>
          }
        />
        <Route
          path="/blog/edit/:id"
          element={
            <RequireAuth>
              <AsyncSection name="BlogEditRoute" fallback="Loading editor…">
                <BlogEdit />
              </AsyncSection>
            </RequireAuth>
          }
        />

        <Route
          path="/tools/roi"
          element={
            <AsyncSection
              name="ROICalculator"
              fallback="Loading ROI calculator…"
            >
              <ROICalculator />
            </AsyncSection>
          }
        />
        <Route
          path="/tools/quiz"
          element={
            <AsyncSection name="ServiceQuiz" fallback="Loading service quiz…">
              <ServiceQuiz />
            </AsyncSection>
          }
        />

        <Route
          path="/resources"
          element={
            <AsyncSection name="ResourceList" fallback="Loading resources…">
              <ResourceList />
            </AsyncSection>
          }
        />

        <Route
          path="/newsletter"
          element={
            <AsyncSection
              name="NewsletterForm"
              fallback="Loading newsletter form…"
            >
              <NewsletterForm />
            </AsyncSection>
          }
        />

        <Route
          path="/case-studies"
          element={
            <AsyncSection name="CaseStudyList" fallback="Loading case studies…">
              <CaseStudyList />
            </AsyncSection>
          }
        />
        <Route
          path="/case-studies/:id"
          element={
            <AsyncSection name="CaseStudyDetail" fallback="Loading case study…">
              <CaseStudyDetail />
            </AsyncSection>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <LiveChat />
    </Layout>
  );
}

// ——— Wrappers for logging in Login/Signup ————————————————————————————
function LoginWrapper() {
  useEffect(() => logger.info("Rendering Login page"), []);
  return <Login />;
}
function SignupWrapper() {
  useEffect(() => logger.info("Rendering Signup page"), []);
  return <Signup />;
}

// ——— App root ——————————————————————————————————————————————————————
function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>ShannyTechSolutions – Cutting-edge Tech Solutions</title>
        <meta
          name="description"
          content="ShannyTechSolutions delivers innovative technology solutions—web, IT consulting, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
