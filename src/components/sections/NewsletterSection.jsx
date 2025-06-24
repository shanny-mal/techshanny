import NewsletterForm from "../forms/NewsletterForm";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, when: "beforeChildren" },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800"
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          id="newsletter-heading"
          className="text-3xl font-bold text-white mb-4"
          variants={item}
        >
          Stay Updated
        </motion.h2>
        <motion.p className="text-white mb-6" variants={item}>
          Subscribe to our newsletter to get the latest news, articles, and
          resources from shannyTech.
        </motion.p>
        <motion.div variants={item}>
          <NewsletterForm />
        </motion.div>
      </div>
    </motion.section>
  );
}
