import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import ServiceCard from "../components/sections/ServiceCard";
import { services } from "../data/servicesData";

export default function ServicesPage() {
  useDocumentMeta({
    title: "Services | shannyTech",
    description:
      "Explore shannyTech services: web development, mobile apps, cloud solutions, cybersecurity, data engineering, and more.",
    og: {
      title: "Services | shannyTech",
      description:
        "Explore shannyTech services: web development, mobile apps, cloud solutions, cybersecurity, data engineering, and more.",
      url: window.location.href,
    },
    twitter: {
      card: "summary_large_image",
      title: "Services | shannyTech",
      description:
        "Explore shannyTech services: web development, mobile apps, cloud solutions, cybersecurity, data engineering, and more.",
    },
  });
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  if (!services || services.length === 0) {
    return (
      <motion.main
        initial="hidden"
        animate="visible"
        variants={container}
        className="py-16 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center"
      >
        <motion.p variants={item} className="text-gray-700 dark:text-gray-300">
          No services available at this time.
        </motion.p>
      </motion.main>
    );
  }
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-16 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          variants={item}
          className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-8"
        >
          Our Services
        </motion.h1>
        <motion.div
          variants={container}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((svc) => {
            const IconComp = svc.icon;
            const link = svc.slug
              ? `/services/${svc.slug}`
              : `/services/${svc.id}`;
            return (
              <motion.div key={svc.id} variants={item}>
                <ServiceCard
                  icon={IconComp}
                  title={svc.title}
                  description={svc.shortDescription}
                  link={link}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.main>
  );
}
