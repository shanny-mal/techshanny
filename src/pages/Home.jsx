import { useEffect } from "react";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import Hero from "../components/sections/Hero";
import ServicesSection from "../components/sections/ServicesSection";
import AboutSection from "../components/sections/AboutSection";
import Testimonials from "../components/sections/Testimonials";
import ContactSection from "../components/sections/ContactSection";
import NewsletterSection from "../components/sections/NewsletterSection";
import { motion } from "framer-motion";

export default function Home() {
  useDocumentMeta({
    title: "shannyTech | Empowering Your Digital Future",
    description:
      "shannyTech offers web development, mobile apps, cloud solutions, cybersecurity, data engineering, and more. Transform your business with innovative tech solutions.",
    og: {
      title: "shannyTech | Empowering Your Digital Future",
      description:
        "Innovative tech solutions: web development, mobile apps, cloud, cybersecurity, data engineering, and more.",
      url: "https://www.shannytech.com/",
      image: "https://www.shannytech.com/images/social-preview.jpg",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "shannyTech | Empowering Your Digital Future",
      description:
        "Innovative tech solutions: web development, mobile apps, cloud, cybersecurity, data engineering, and more.",
      image: "https://www.shannytech.com/images/social-preview.jpg",
    },
    viewport: "width=device-width, initial-scale=1",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.section
        id="hero"
        className="scroll-mt-16"
        variants={sectionVariants}
      >
        <Hero />
      </motion.section>
      <motion.section
        id="services"
        className="pt-16 scroll-mt-16"
        variants={sectionVariants}
      >
        <ServicesSection />
      </motion.section>
      <motion.section
        id="about"
        className="pt-16 scroll-mt-16"
        variants={sectionVariants}
      >
        <AboutSection />
      </motion.section>
      <motion.section
        id="testimonials"
        className="pt-16 scroll-mt-16"
        variants={sectionVariants}
      >
        <Testimonials />
      </motion.section>
      <motion.section
        id="newsletter"
        className="pt-16 scroll-mt-16"
        variants={sectionVariants}
      >
        <NewsletterSection />
      </motion.section>
      <motion.section
        id="contact"
        className="pt-16 scroll-mt-16"
        variants={sectionVariants}
      >
        <ContactSection />
      </motion.section>
    </motion.div>
  );
}
