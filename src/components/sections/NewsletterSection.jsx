// src/components/sections/NewsletterSection.jsx
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Blob } from "../ui/Blob";
import "./NewsletterSection.css";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, ease: "easeOut" },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      // Replace with real API call
      await new Promise((r) => setTimeout(r, 1000));
      setSuccess(true);
      setEmail("");
    } catch {
      // handle error…
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative overflow-hidden"
    >
      {/* Decorative blobs */}
      {!reduceMotion && (
        <>
          <Blob
            className="hidden lg:block w-[400px] h-[400px] right-[-100px] top-[-50px]"
            style={{ background: "rgba(14,165,233,0.2)" }}
          />
          <Blob
            className="hidden lg:block w-[500px] h-[500px] left-[-150px] bottom-[-80px]"
            style={{ background: "rgba(107,99,246,0.2)" }}
          />
        </>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
        className="newsletter-section py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <motion.h2
            id="newsletter-heading"
            variants={item}
            className="text-4xl sm:text-5xl font-extrabold text-white"
          >
            Stay in the Loop
          </motion.h2>
          <motion.p variants={item} className="text-white/90 text-lg">
            Subscribe for the latest updates, tutorials, and behind‑the‑scenes
            insights from shannyTech.
          </motion.p>

          <motion.form
            variants={item}
            onSubmit={handleSubmit}
            className="relative mt-8"
          >
            <div className="floating-label-group">
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer"
                placeholder=" "
                required
                disabled={submitting}
              />
              <label htmlFor="newsletter-email">Your email address</label>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full flex justify-center items-center btn-submit"
            >
              {submitting
                ? "Subscribing…"
                : success
                ? "You're In! 🎉"
                : "Subscribe"}
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
