import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import ContactSection from "../components/sections/ContactSection";

export default function ContactPage() {
  useDocumentMeta({
    title: "Contact Us | shannyTech",
    description:
      "Get in touch with shannyTech for inquiries or project quotes.",
    og: {
      title: "Contact Us | shannyTech",
      description:
        "Get in touch with shannyTech for inquiries or project quotes.",
      url: window.location.href,
    },
    twitter: {
      card: "summary",
      title: "Contact Us | shannyTech",
      description:
        "Get in touch with shannyTech for inquiries or project quotes.",
    },
  });
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-16 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <motion.div variants={item}>
        <ContactSection />
      </motion.div>
    </motion.main>
  );
}
