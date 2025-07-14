import { motion } from "framer-motion";
import aboutImage from "../../assets/images/about-illustration.jpg";

export default function AboutSection() {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
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
      className="py-20 bg-gradient-to-r from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">
        <motion.div variants={item} className="space-y-6">
          <motion.h2
            id="about-heading"
            className="text-4xl sm:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400"
            variants={item}
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300"
            variants={item}
          >
            At shannyTech, our mission is to empower businesses through
            innovative technology solutions. Founded in 2022, we specialize in:
          </motion.p>
          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={item}
          >
            <li className="flex items-start space-x-3">
              <span className="mt-1 text-indigo-600 dark:text-indigo-400">
                •
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                Web & Mobile Development
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="mt-1 text-indigo-600 dark:text-indigo-400">
                •
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                Cloud Architecture
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="mt-1 text-indigo-600 dark:text-indigo-400">
                •
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                Cybersecurity
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="mt-1 text-indigo-600 dark:text-indigo-400">
                •
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                Data Engineering
              </span>
            </li>
          </motion.ul>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300"
            variants={item}
          >
            We believe in collaboration, quality, and continuous improvement.
            Whether you’re a startup seeking an MVP or an enterprise on a
            digital transformation journey, shannyTech partners with you every
            step of the way.
          </motion.p>
          <motion.div variants={item}>
            <a
              href="/contact"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
        <motion.div variants={item} className="relative">
          <div className="absolute -inset-4 bg-indigo-100 dark:bg-gray-800 rounded-xl transform rotate-3"></div>
          <div className="relative">
            <img
              src={aboutImage}
              alt="Team collaboration illustration"
              className="w-full rounded-xl shadow-xl"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
