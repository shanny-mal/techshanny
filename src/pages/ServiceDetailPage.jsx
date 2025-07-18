// src/pages/ServiceDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { services } from "../data/servicesData";
import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ServiceDetailPage() {
  const { id } = useParams();
  const svc = services.find((s) => (s.slug || s.id) === id);

  if (!svc) {
    return (
      <motion.main
        role="main"
        aria-live="polite"
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex-grow flex items-center justify-center bg-surface-light dark:bg-surface-dark py-16"
      >
        <motion.p variants={item} className="text-body text-center">
          Service not found.
        </motion.p>
        <Link to="/services" className="mt-4 btn-outline inline-block">
          ← Back to Services
        </Link>
      </motion.main>
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

  return (
    <motion.main
      role="main"
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex-grow bg-surface-light dark:bg-surface-dark py-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <motion.h1
          variants={item}
          className="font-heading text-primary text-[clamp(1.75rem,5vw,2.25rem)]"
        >
          {svc.title}
        </motion.h1>
        <motion.p variants={item} className="text-body">
          {svc.detailedDescription || svc.shortDescription}
        </motion.p>

        {Array.isArray(svc.features) && svc.features.length > 0 && (
          <motion.ul
            variants={item}
            className="list-disc list-inside space-y-2 text-body"
          >
            {svc.features.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </motion.ul>
        )}

        <Link to="/services" className="btn-outline">
          ← Back to Services
        </Link>
      </div>
    </motion.main>
  );
}
