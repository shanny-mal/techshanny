import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function PrivacyPolicyPage() {
  useDocumentMeta({
    title: "Privacy Policy | shannyTech",
    description: "Read shannyTech Privacy Policy.",
    og: {
      title: "Privacy Policy | shannyTech",
      description: "Read shannyTech Privacy Policy.",
      url: window.location.href,
    },
    twitter: {
      card: "summary",
      title: "Privacy Policy | shannyTech",
      description: "Read shannyTech Privacy Policy.",
    },
  });
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
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
          Privacy Policy
        </motion.h1>
        <motion.div variants={item} className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            This Privacy Policy describes how shannyTech ("we", "us", or "our")
            collects, uses, discloses, and protects personal information when
            you visit our website or use our services. By accessing or using our
            website or services, you agree to the collection and use of
            information in accordance with this policy.
          </p>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>
              Personal Information: name, email address, phone number, company
              name, and other contact details you provide when filling out
              contact forms, subscribing to newsletters, or requesting services.
            </li>
            <li>
              Usage Data: information about how you access and use our website
              and services, including pages viewed, time spent on pages,
              referring URLs, IP addresses, browser type, and device
              information.
            </li>
            <li>
              Cookies and Tracking Technologies: data collected through cookies,
              web beacons, and similar technologies to enhance user experience
              and analyze usage patterns.
            </li>
            <li>
              Communications: records of communications between you and
              shannyTech, including email correspondence, support requests, and
              feedback.
            </li>
          </ul>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>
              To Provide and Improve Services: process requests, deliver
              services, manage projects, and personalize content.
            </li>
            <li>
              Communication: send administrative messages, updates, marketing
              communications (with your consent), newsletters, and respond to
              inquiries.
            </li>
            <li>
              Analytics and Performance: understand usage trends, monitor and
              analyze website performance, and improve user experience.
            </li>
            <li>
              Security and Fraud Prevention: detect and prevent malicious
              activity, secure our systems, and protect user data.
            </li>
            <li>
              Compliance: comply with legal obligations, resolve disputes, and
              enforce our agreements.
            </li>
          </ul>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            3. Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            We use cookies and similar tracking technologies to track activity
            on our website and hold certain information. You can control cookies
            through browser settings or other tools. Disabling cookies may limit
            functionality.
          </p>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            4. Third-Party Services
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            We may use third-party services (e.g., analytics providers, email
            service providers, payment processors) that collect, store, and
            process information on our behalf. These providers have their own
            privacy policies and we encourage you to review them.
          </p>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            5. Data Sharing and Disclosure
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>
              Service Providers: share information with vendors and service
              providers who assist in website operation, analytics, marketing,
              or other business functions.
            </li>
            <li>
              Legal Requirements: disclose information when required by law or
              to protect rights, property, or safety of shannyTech, users, or
              others.
            </li>
            <li>
              Business Transfers: in the event of a merger, acquisition, or sale
              of assets, user information may be transferred as part of the
              transaction, subject to assurances of privacy protection.
            </li>
          </ul>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            6. Data Retention
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            We retain personal information only as long as necessary to fulfill
            the purposes outlined in this policy or to comply with legal
            obligations. Data no longer needed is securely deleted or
            anonymized.
          </p>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            7. Your Rights
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>
              Access and Correction: you may request access to or correction of
              your personal data.
            </li>
            <li>
              Deletion: you may request deletion of personal data, subject to
              legal obligations or legitimate business needs.
            </li>
            <li>
              Opt-Out: you may opt-out of marketing communications at any time
              by following unsubscribe instructions.
            </li>
            <li>
              Cookie Controls: you can manage or disable cookies through browser
              settings or consent management tools.
            </li>
            <li>
              Data Portability: where applicable, you may request export of your
              data in a structured format.
            </li>
          </ul>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            8. Security
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            We implement reasonable technical and organizational measures to
            protect personal data against unauthorized access, alteration, or
            destruction. However, no method of transmission or storage is
            completely secure.
          </p>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            9. Children’s Privacy
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Our website and services are not directed to children under 16. We
            do not knowingly collect personal data from children under 16. If
            you believe we have collected data from a child, contact us to
            request deletion.
          </p>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            10. International Transfers
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Personal data may be processed in countries other than your own. We
            take measures to ensure data protection in accordance with
            applicable laws when transferring data internationally.
          </p>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            11. Changes to This Policy
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            We may update this Privacy Policy periodically. We will post the
            updated effective date. Continued use after changes indicates
            acceptance of the revised policy.
          </p>
        </motion.div>
        <motion.div variants={item} className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            12. Contact Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            For questions or requests regarding this Privacy Policy, contact:
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Email: privacy@shannytech.solutions
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Address: shannyTech, 2964 Batonga, Kariba
          </p>
        </motion.div>
      </div>
    </motion.main>
  );
}
