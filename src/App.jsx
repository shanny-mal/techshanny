import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar.jsx";
import HomePage from "./pages/Home.jsx";
import Footer from "./components/layout/Footer.jsx";

export default function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
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
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
