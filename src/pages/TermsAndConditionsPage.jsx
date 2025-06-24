import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function TermsAndConditionsPage() {
  useDocumentMeta({
    title: "Terms & Conditions | shannyTech",
    description: "Read shannyTech Terms & Conditions.",
    og: {
      title: "Terms & Conditions | shannyTech",
      description: "Read shannyTech Terms & Conditions.",
      url: window.location.href,
    },
    twitter: {
      card: "summary",
      title: "Terms & Conditions | shannyTech",
      description: "Read shannyTech Terms & Conditions.",
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
          Terms & Conditions
        </motion.h1>
        <motion.p variants={item} className="text-gray-700 dark:text-gray-300">
          Your terms and conditions content goes here. Outline user
          responsibilities, disclaimers, limitations of liability, governing
          law, etc.
        </motion.p>
        <motion.p variants={item} className="text-gray-700 dark:text-gray-300">
          Replace with full legal text as appropriate.
        </motion.p>
      </div>
    </motion.main>
  );
}
