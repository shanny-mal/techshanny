import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../../assets/images/hero-image.jpg";

export default function Hero({ backgroundImage = heroImage }) {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={container}
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <motion.div
        className="relative z-10 text-center px-4 max-w-2xl"
        variants={fadeUp}
      >
        <motion.h1
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4"
          variants={fadeUp}
        >
          Empowering Your Digital Future
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6"
          variants={fadeUp}
        >
          Innovative tech solutions—web, mobile, cloud, cybersecurity, data
          engineering, and more.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link
            to="/services"
            className="inline-block bg-white text-teal-600 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
          >
            Explore Services
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
