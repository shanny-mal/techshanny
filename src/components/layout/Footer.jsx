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
    { to: "/privacy", label: "Privacy" },
    { to: "/terms", label: "Terms" },
  ];

  const socialLinks = [
    {
      href: "https://facebook.com/shannyTech",
      icon: FaFacebook,
      color: "#1877F2",
    },
    {
      href: "https://twitter.com/shannyTech",
      icon: FaTwitter,
      color: "#1DA1F2",
    },
    {
      href: "https://linkedin.com/company/shannyTech",
      icon: FaLinkedin,
      color: "#0077B5",
    },
    { href: "https://github.com/shannyTech", icon: FaGithub, color: "#333" },
  ];

  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={container}
      className="bg-gradient-to-tr from-gray-900 to-indigo-900 text-gray-200"
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          variants={item}
          className="flex flex-col items-center md:items-start"
        >
          <div className="h-12 w-12 rounded-full overflow-hidden bg-white dark:bg-gray-700 flex items-center justify-center">
            <img
              src={logo}
              alt="shannyTech"
              className="h-10 w-10 object-contain"
            />
          </div>
          <span className="mt-2 text-2xl font-bold">shannyTech</span>
          <p className="mt-4 text-center md:text-left text-gray-300">
            Empowering your digital future with modern web, mobile, cloud, and
            security solutions.
          </p>
        </motion.div>
        <motion.nav
          variants={item}
          className="flex flex-col items-center md:items-start space-y-2"
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="hover:text-white transition text-lg"
            >
              {label}
            </Link>
          ))}
        </motion.nav>
        <motion.div
          variants={item}
          className="flex flex-col items-center md:items-start space-y-4"
        >
          <span className="text-lg font-semibold">Follow Us</span>
          <div className="flex space-x-4">
            {socialLinks.map(({ href, icon: Icon, color }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="p-2 rounded-full bg-gray-800"
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div variants={item} className="border-t border-gray-700">
        <p className="text-center text-sm py-4">
          &copy; {currentYear} shannyTech. All rights reserved.
        </p>
      </motion.div>
    </motion.footer>
  );
}
