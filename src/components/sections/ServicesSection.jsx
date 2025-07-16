// src/components/sections/ServicesSection.jsx
import ServiceCard from "./ServiceCard";
import { services } from "../../data/servicesData";
import { motion } from "framer-motion";
import "./ServicesSection.css";

export default function ServicesSection() {
  if (!services || services.length === 0) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, when: "beforeChildren" },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="relative py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="service-blob" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={item} className="text-center mb-16">
          <h2
            id="services-heading"
            className="text-5xl font-extrabold text-gray-900 dark:text-white"
          >
            Our Services
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated suite of tech solutions designed to drive innovation and
            growth.
          </p>
        </motion.div>
        <motion.div
          variants={container}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((svc) => (
            <motion.div key={svc.id} variants={item}>
              <ServiceCard
                icon={svc.icon}
                title={svc.title}
                description={svc.shortDescription}
                link={
                  svc.slug ? `/services/${svc.slug}` : `/services/${svc.id}`
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
