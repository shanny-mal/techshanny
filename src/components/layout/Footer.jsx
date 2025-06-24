import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../../assets/logo/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms of Service" },
  ];

  const socialLinks = [
    {
      href: "https://facebook.com/shannyTech",
      label: "Facebook",
      icon: FaFacebook,
      color: "#1877F2",
    },
    {
      href: "https://twitter.com/shannyTech",
      label: "Twitter",
      icon: FaTwitter,
      color: "#1DA1F2",
    },
    {
      href: "https://linkedin.com/company/shannyTech",
      label: "LinkedIn",
      icon: FaLinkedin,
      color: "#0077B5",
    },
    {
      href: "https://github.com/shannyTech",
      label: "GitHub",
      icon: FaGithub,
      color: "#333333",
    },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const linkVariants = {
    hover: { scale: 1.2 },
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="bg-indigo-900 dark:bg-gray-800 text-gray-200"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={footerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={footerVariants}
          className="flex items-center space-x-2 mb-6 md:mb-0"
        >
          <Link
            to="/"
            aria-label="shannyTech Home"
            className="flex items-center"
          >
            <div className="h-10 w-10 rounded-full overflow-hidden bg-white dark:bg-gray-700 flex items-center justify-center">
              <img
                src={logo}
                alt="shannyTech Logo"
                className="h-8 w-8 object-cover"
              />
            </div>
            <span className="ml-2 text-xl font-semibold text-white">
              shannyTech
            </span>
          </Link>
        </motion.div>
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={footerVariants}
          aria-label="Footer navigation"
          className="flex flex-wrap justify-center md:justify-start space-x-4 mb-6 md:mb-0"
        >
          {navLinks.map(({ to, label }) => (
            <motion.div key={to} whileHover="hover" variants={linkVariants}>
              <Link
                to={to}
                className="text-sm text-gray-200 hover:underline hover:text-white"
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={footerVariants}
          className="flex space-x-4"
        >
          {socialLinks.map(({ href, label, icon: IconComp, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.2 }}
              className="text-gray-200"
            >
              <IconComp
                className="w-5 h-5"
                style={{ color }}
                aria-hidden="true"
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={footerVariants}
        className="border-t border-gray-700"
      >
        <motion.p
          initial="hidden"
          animate="visible"
          variants={footerVariants}
          className="text-center text-sm py-4"
        >
          &copy; {currentYear} shannyTech. All rights reserved.
        </motion.p>
      </motion.div>
    </motion.footer>
  );
}
