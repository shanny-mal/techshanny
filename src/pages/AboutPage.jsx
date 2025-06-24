import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import AboutSection from "../components/sections/AboutSection";
import TeamSection from "../components/sections/TeamSection";

export default function AboutPage() {
  useDocumentMeta({
    title: "About Us | shannyTech",
    description: "Learn about shannyTech: mission, values, and our team.",
    og: {
      title: "About Us | shannyTech",
      description: "Learn about shannyTech: mission, values, and our team.",
      url: window.location.href,
    },
    twitter: {
      card: "summary",
      title: "About Us | shannyTech",
      description: "Learn about shannyTech: mission, values, and our team.",
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
      className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <motion.div variants={item}>
        <AboutSection />
      </motion.div>
      <motion.div variants={item}>
        <TeamSection />
      </motion.div>
    </motion.main>
  );
}
