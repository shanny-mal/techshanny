import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function CyberSecurityPage() {
  useDocumentMeta({
    title: "Cyber Security | shannyTech",
    description:
      "shannyTech Cyber Security services: protect your business with risk assessments, penetration testing, and compliance.",
    og: {
      title: "Cyber Security | shannyTech",
      description:
        "shannyTech Cyber Security services: protect your business with risk assessments, penetration testing, and compliance.",
      url: window.location.href,
    },
    twitter: {
      card: "summary_large_image",
      title: "Cyber Security | shannyTech",
      description:
        "shannyTech Cyber Security services: protect your business with risk assessments, penetration testing, and compliance.",
    },
  });
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-16 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <motion.h1
          variants={item}
          className="text-3xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          Cyber Security
        </motion.h1>
        <motion.p variants={item} className="text-gray-700 dark:text-gray-300">
          Protect your organization from evolving cyber threats with
          comprehensive security services designed to safeguard data,
          infrastructure, and applications.
        </motion.p>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Our Cyber Security Services
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Risk Assessment & Vulnerability Analysis</li>
            <li>Penetration Testing & Ethical Hacking</li>
            <li>Security Architecture & Design</li>
            <li>Incident Response & Forensics</li>
            <li>Compliance & Governance (GDPR, HIPAA, etc.)</li>
            <li>Continuous Monitoring & Threat Intelligence</li>
          </ul>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Why Choose shannyTech
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Experienced security professionals and certified experts</li>
            <li>
              Tailored security strategies aligned with business objectives
            </li>
            <li>Advanced tools and methodologies for proactive defense</li>
            <li>Clear reporting and actionable remediation plans</li>
            <li>Ongoing support and managed security services</li>
          </ul>
        </motion.div>
        <motion.div variants={item} className="mt-6">
          <Link to="/services" className="text-teal-600 hover:underline">
            ← Back to Services
          </Link>
        </motion.div>
      </div>
    </motion.main>
  );
}

export function MobileAppDevelopmentPage() {
  useDocumentMeta({
    title: "Mobile App Development | shannyTech",
    description:
      "shannyTech Mobile App Development: build native and cross-platform apps with seamless UX and performance.",
    og: {
      title: "Mobile App Development | shannyTech",
      description:
        "shannyTech Mobile App Development: build native and cross-platform apps with seamless UX and performance.",
      url: window.location.href,
    },
    twitter: {
      card: "summary_large_image",
      title: "Mobile App Development | shannyTech",
      description:
        "shannyTech Mobile App Development: build native and cross-platform apps with seamless UX and performance.",
    },
  });
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-16 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <motion.h1
          variants={item}
          className="text-3xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          Mobile App Development
        </motion.h1>
        <motion.p variants={item} className="text-gray-700 dark:text-gray-300">
          Develop high-quality mobile applications for iOS and Android,
          delivering engaging user experiences and robust performance.
        </motion.p>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Services Offered
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Native iOS and Android Development</li>
            <li>Cross-Platform Solutions (React Native, Flutter)</li>
            <li>UI/UX Design and Prototyping</li>
            <li>API Integration and Backend Connectivity</li>
            <li>App Testing, QA, and Performance Optimization</li>
            <li>Deployment and App Store Submission</li>
          </ul>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Why Choose shannyTech
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Skilled mobile developers with industry experience</li>
            <li>User-centric design and intuitive interfaces</li>
            <li>Agile development methodology and transparent process</li>
            <li>Ongoing maintenance and version updates</li>
            <li>Comprehensive testing for reliability and security</li>
          </ul>
        </motion.div>
        <motion.div variants={item} className="mt-6">
          <Link to="/services" className="text-teal-600 hover:underline">
            ← Back to Services
          </Link>
        </motion.div>
      </div>
    </motion.main>
  );
}

export function WebAppDevelopmentPage() {
  useDocumentMeta({
    title: "Web App Development | shannyTech",
    description:
      "shannyTech Web App Development: create responsive, scalable web applications and progressive web apps.",
    og: {
      title: "Web App Development | shannyTech",
      description:
        "shannyTech Web App Development: create responsive, scalable web applications and progressive web apps.",
      url: window.location.href,
    },
    twitter: {
      card: "summary_large_image",
      title: "Web App Development | shannyTech",
      description:
        "shannyTech Web App Development: create responsive, scalable web applications and progressive web apps.",
    },
  });
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-16 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <motion.h1
          variants={item}
          className="text-3xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          Web App Development
        </motion.h1>
        <motion.p variants={item} className="text-gray-700 dark:text-gray-300">
          Build modern, responsive, and scalable web applications, including
          SPAs and PWAs, tailored to your business needs.
        </motion.p>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Services Offered
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Single-Page Applications (React, Vue, Angular)</li>
            <li>Progressive Web Apps (PWA) Development</li>
            <li>Backend Integration and API Development</li>
            <li>Responsive Design and Cross-Browser Compatibility</li>
            <li>Performance Optimization and Scalability</li>
            <li>Security Best Practices and Testing</li>
          </ul>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Why Choose shannyTech
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Expert frontend and backend developers</li>
            <li>Focus on performance, SEO, and accessibility</li>
            <li>Modular architecture and maintainable code</li>
            <li>Continuous integration and deployment support</li>
            <li>Comprehensive testing and quality assurance</li>
          </ul>
        </motion.div>
        <motion.div variants={item} className="mt-6">
          <Link to="/services" className="text-teal-600 hover:underline">
            ← Back to Services
          </Link>
        </motion.div>
      </div>
    </motion.main>
  );
}
