import { motion } from "framer-motion";

export default function AboutSection() {
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
      className="py-16 bg-gradient-to-r from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
      aria-labelledby="about-heading"
    >
      <motion.div
        variants={container}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.h2
          id="about-heading"
          className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4"
          variants={item}
        >
          About Us
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 mb-4"
          variants={item}
        >
          At shannyTech, our mission is to empower businesses through innovative
          technology solutions. Founded in 2022, we specialize in web and mobile
          development, cloud architecture, cybersecurity, and data engineering.
        </motion.p>
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300"
          variants={item}
        >
          We believe in collaboration, quality, and continuous improvement. Our
          team works closely with clients to deliver custom, scalable solutions
          that drive growth and efficiency. Whether you’re a startup seeking to
          launch an MVP or an enterprise embarking on digital transformation,
          shannyTech partners with you every step of the way.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
