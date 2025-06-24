import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function NotFoundPage() {
  useDocumentMeta({
    title: "404 Not Found | shannyTech",
    description: "Page not found. Return to shannyTech homepage.",
    og: {
      title: "404 Not Found | shannyTech",
      description: "Page not found. Return to shannyTech homepage.",
      url: window.location.href,
    },
    twitter: {
      card: "summary",
      title: "404 Not Found | shannyTech",
      description: "Page not found. Return to shannyTech homepage.",
    },
  });
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <h1 className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">
        404
      </h1>
      <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
        Page Not Found
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
      >
        Go Home
      </Link>
    </motion.main>
  );
}
