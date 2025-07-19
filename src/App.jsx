import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ApiProvider } from "./context/ApiContext";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import ChatbotWidget from "./components/chat/ChatbotWidget.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

// code‑split pages
const HomePage = lazy(() => import("./pages/Home.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.jsx"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage.jsx"));
const TermsAndConditionsPage = lazy(() =>
  import("./pages/TermsAndConditionsPage.jsx")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

const CyberSecurityPage = lazy(() =>
  import("./pages/ServiceSubPages.jsx").then((m) => ({
    default: m.CyberSecurityPage,
  }))
);
const MobileAppDevelopmentPage = lazy(() =>
  import("./pages/ServiceSubPages.jsx").then((m) => ({
    default: m.MobileAppDevelopmentPage,
  }))
);
const WebAppDevelopmentPage = lazy(() =>
  import("./pages/ServiceSubPages.jsx").then((m) => ({
    default: m.WebAppDevelopmentPage,
  }))
);

const BlogList = lazy(() => import("./components/sections/BlogList.jsx"));
const BlogDetail = lazy(() => import("./components/sections/BlogDetail.jsx"));

export default function App() {
  const location = useLocation();

  return (
    <ApiProvider>
      <ErrorBoundary>
        {/* Skip Link for a11y */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white dark:bg-gray-800 p-2 rounded shadow"
        >
          Skip to content
        </a>

        <Navbar />

        <AnimatePresence mode="wait">
          <motion.main
            id="main-content"
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="flex-grow"
          >
            <Suspense
              fallback={
                <div className="py-16 flex justify-center">
                  <motion.div
                    className="w-12 h-12 border-4 border-t-teal-600 border-gray-200 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                </div>
              }
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route
                  path="/services/cyber-security"
                  element={<CyberSecurityPage />}
                />
                <Route
                  path="/services/mobile-app-development"
                  element={<MobileAppDevelopmentPage />}
                />
                <Route
                  path="/services/web-app-development"
                  element={<WebAppDevelopmentPage />}
                />
                <Route path="/services/:id" element={<ServiceDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsAndConditionsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </motion.main>
        </AnimatePresence>

        <ChatbotWidget />
        <Footer />
      </ErrorBoundary>
    </ApiProvider>
  );
}
