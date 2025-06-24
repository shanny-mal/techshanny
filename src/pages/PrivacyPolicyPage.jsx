import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function PrivacyPolicyPage() {
  useDocumentMeta({
    title: "Privacy Policy | shannyTech",
    description: "Read shannyTech Privacy Policy.",
    og: {
      title: "Privacy Policy | shannyTech",
      description: "Read shannyTech Privacy Policy.",
      url: window.location.href,
    },
    twitter: {
      card: "summary",
      title: "Privacy Policy | shannyTech",
      description: "Read shannyTech Privacy Policy.",
    },
  });
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-16 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <motion.h1
          variants={item}
          className="text-3xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          Privacy Policy
        </motion.h1>
        <motion.p variants={item} className="text-gray-700 dark:text-gray-300">
          Your privacy policy content goes here. Describe data collection,
          usage, cookies, third-party services, user rights, contact info, etc.
        </motion.p>
        <motion.p variants={item} className="text-gray-700 dark:text-gray-300">
          Update with actual legal text as provided by your legal counsel or
          template.
        </motion.p>
      </div>
    </motion.main>
  );
}
