import NewsletterForm from "../forms/NewsletterForm";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-20 bg-gradient-to-r from-teal-500 to-indigo-600 dark:from-teal-700 dark:to-indigo-800"
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          id="newsletter-heading"
          className="text-4xl font-extrabold text-white mb-4"
          variants={item}
        >
          Stay Updated
        </motion.h2>
        <motion.p
          className="text-lg text-white/90 mb-8 max-w-lg mx-auto"
          variants={item}
        >
          Join our newsletter for product updates, tutorials, and exclusive
          insights from the shannyTech team.
        </motion.p>
        <motion.div variants={item}>
          <NewsletterForm />
        </motion.div>
      </div>
    </motion.section>
  );
}
