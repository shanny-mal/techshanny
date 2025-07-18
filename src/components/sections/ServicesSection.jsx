// src/components/sections/ServicesSection.jsx
import { useState, useMemo } from "react";
import ServiceCard from "./ServiceCard";
import { services } from "../../data/servicesData";
import { motion, useReducedMotion } from "framer-motion";
import useInViewLazy from "../../hooks/useInViewLazy";

export default function ServicesSection() {
  const [filter, setFilter] = useState("");
  const reduceMotion = useReducedMotion();
  const filtered = useMemo(
    () =>
      services.filter((s) =>
        s.title.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter]
  );

  if (!services.length) return null;

  // Lazy‑load container
  const [ref, inView] = useInViewLazy({ rootMargin: "200px" });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, when: "beforeChildren" },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      id="services"
      aria-labelledby="services-heading"
      className="relative py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      {/* Blob background moved to CSS */}
      <div className="service-blob" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter / Search */}
        <div className="mb-8 text-center">
          <input
            type="search"
            aria-label="Search services"
            placeholder="Search services…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-1/2 mx-auto px-4 py-2 rounded-lg border focus:ring focus:ring-teal-300 transition"
          />
        </div>

        {/* Header */}
        <motion.div
          variants={item}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
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

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {inView
            ? filtered.map((svc) => (
                <motion.div key={svc.id} variants={item}>
                  <ServiceCard {...svc} />
                </motion.div>
              ))
            : // Skeleton placeholders before inView
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl"
                />
              ))}
        </motion.div>

        {/* “View All” CTA */}
        {filtered.length < services.length && (
          <div className="mt-12 text-center">
            <a
              href="#services"
              onClick={() => setFilter("")}
              className="inline-block text-teal-600 hover:underline font-medium"
            >
              View All Services
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
