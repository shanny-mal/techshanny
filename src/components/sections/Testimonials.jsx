// src/components/sections/Testimonials.jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import useGoogleReviews from "../../hooks/useGoogleReviews";
import TestimonialSkeleton from "./TestimonialSkeleton";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;
  const { reviews, loading, error } = useGoogleReviews({
    placeId: PLACE_ID,
  });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      role="region"
      aria-labelledby="testimonials-heading"
      className="relative py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="testimonials-heading"
          className="text-4xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 mb-16"
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>

        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        )}

        {error && (
          <p role="alert" className="text-center text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <TestimonialCard
                  name={r.author_name}
                  role={r.author_url}
                  quote={r.text}
                  avatar={r.profile_photo_url}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
