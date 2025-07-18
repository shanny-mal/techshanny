// src/pages/ServicesPage.jsx
import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import ServiceCard from "../components/sections/ServiceCard";
import { services } from "../data/servicesData";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesPage() {
  useDocumentMeta({
    title: "Our Services | shannyTech",
    description:
      "Explore shannyTech's offerings: web/apps, cloud, security, data engineering, and more.",
    og: {
      title: "Our Services | shannyTech",
      description:
        "Explore shannyTech's offerings: web/apps, cloud, security, data engineering, and more.",
      url: window.location.href,
    },
    twitter: {
      card: "summary_large_image",
      title: "Our Services | shannyTech",
      description:
        "Explore shannyTech's offerings: web/apps, cloud, security, data engineering, and more.",
    },
  });

  if (!services.length) {
    return (
      <motion.main
        role="main"
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex-grow flex items-center justify-center bg-surface-light dark:bg-surface-dark py-16"
      >
        <motion.p variants={item} className="text-body">
          No services available at this time.
        </motion.p>
      </motion.main>
    );
  }

  return (
    <motion.main
      role="main"
      initial="hidden"
      animate="visible"
      variants={container}
      className="bg-surface-light dark:bg-surface-dark py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.h1
          variants={item}
          className="font-heading text-center text-primary text-[clamp(2rem,5vw,3rem)]"
        >
          Our Services
        </motion.h1>

        <motion.div
          variants={container}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((svc) => {
            const slug = svc.slug || svc.id;
            return (
              <motion.div key={slug} variants={item}>
                <ServiceCard
                  icon={svc.icon}
                  title={svc.title}
                  description={svc.shortDescription}
                  link={`/services/${slug}`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.main>
  );
}
