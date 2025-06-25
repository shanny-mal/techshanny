import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "./Home.jsx";
import AboutPage from "./AboutPage.jsx";
import ServicesPage from "./ServicesPage.jsx";
import ServiceDetailPage from "./ServiceDetailPage.jsx";
import ContactPage from "./ContactPage.jsx";
import PrivacyPolicyPage from "./PrivacyPolicyPage.jsx";
import TermsAndConditionsPage from "./TermsAndConditionsPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function App() {
  const location = useLocation();
  return (
    <>
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsAndConditionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    
    </>
  );
}
