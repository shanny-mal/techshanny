import { useParams, Link } from "react-router-dom";
import { services } from "../data/servicesData";
import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const svc = services.find((s) => s.id === id);
  if (!svc) {
    return (
      <div className="py-16 flex flex-col items-center">
        <Link to="/services" className="text-teal-600 hover:underline">
          Back to Services
        </Link>
      </div>
    );
  }
  useDocumentMeta({
    title: `${svc.title} | shannyTech`,
    description: svc.shortDescription,
    og: {
      title: `${svc.title} | shannyTech`,
      description: svc.shortDescription,
      url: window.location.href,
    },
    twitter: {
      card: "summary_large_image",
      title: `${svc.title} | shannyTech`,
      description: svc.shortDescription,
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          variants={item}
          className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4"
        >
          {svc.title}
        </motion.h1>
        <motion.p
          variants={item}
          className="text-gray-700 dark:text-gray-300 mb-6"
        >
          {svc.detailedDescription || svc.shortDescription}
        </motion.p>
        {Array.isArray(svc.features) && svc.features.length > 0 && (
          <motion.ul
            variants={container}
            className="list-disc list-inside space-y-2 mb-6"
          >
            {svc.features.map((feat, idx) => (
              <motion.li
                key={idx}
                variants={item}
                className="text-gray-700 dark:text-gray-300"
              >
                {feat}
              </motion.li>
            ))}
          </motion.ul>
        )}
        <Link to="/services" className="text-teal-600 hover:underline">
          ← Back to Services
        </Link>
      </div>
    </motion.main>
  );
}
