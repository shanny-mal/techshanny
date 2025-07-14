// src/components/sections/ServicesSection.jsx
import ServiceCard from "./ServiceCard";
import { services } from "../../data/servicesData";
import { motion } from "framer-motion";

export default function ServicesSection() {
  if (!services || services.length === 0) {
    return null;
  }

  const container = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="py-20 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={item} className="text-center mb-12">
          <h2
            id="services-heading"
            className="text-4xl font-extrabold text-gray-900 dark:text-white"
          >
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We offer a comprehensive suite of technology solutions designed to
            accelerate your business growth.
          </p>
        </motion.div>
        <motion.div
          variants={container}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
    </motion.section>
  );
}
