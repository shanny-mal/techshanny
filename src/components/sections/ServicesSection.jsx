import ServiceCard from "./ServiceCard";
import { services } from "../../data/servicesData";
import { motion } from "framer-motion";

export default function ServicesSection() {
  if (!services || services.length === 0) {
    return null;
  }

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="py-16 bg-gray-50 dark:bg-gray-900"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          id="services-heading"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
          variants={item}
        >
          Our Services
        </motion.h2>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
        >
          {services.map((svc) => {
            const IconComp = svc.icon;
            const link = svc.slug
              ? `/services/${svc.slug}`
              : svc.id
              ? `/services/${svc.id}`
              : null;
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
