import React, { useState, useEffect, Suspense } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Portfolio from "./components/Portifolio/Portfolio/";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";

// Lazy-load Testimonials and Blog for performance
const Testimonials = React.lazy(() => import("./components/Testimonials/Testimonials"));
const Blog = React.lazy(() => import("./components/Blog/Blog"));

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <Helmet>
        <title>ShannyTechSolutions - Cutting-edge Technology Solutions</title>
        <meta
          name="description"
          content="ShannyTechSolutions provides innovative technology solutions including web development, networking, IT consulting, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Header />
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Suspense fallback={<div>Loading Testimonials...</div>}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div>Loading Blog...</div>}>
        <Blog />
      </Suspense>
      <Contact />
      <Footer />
      <LiveChat />
    </>
  );
}

// LiveChat component that loads a Tawk.to chat widget
const LiveChat = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/YOUR_PROPERTY_ID/default";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);
  return null;
};

export default App;
