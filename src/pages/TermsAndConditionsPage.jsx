import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function TermsAndConditionsPage() {
  useDocumentMeta({
    title: "Terms & Conditions | shannyTech",
    description:
      "Terms and conditions for using shannyTech website and services.",
    og: {
      title: "Terms & Conditions | shannyTech",
      description:
        "Terms and conditions for using shannyTech website and services.",
      url: window.location.href,
    },
    twitter: {
      card: "summary",
      title: "Terms & Conditions | shannyTech",
      description:
        "Terms and conditions for using shannyTech website and services.",
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
          Terms & Conditions
        </motion.h1>
        <motion.p variants={item} className="text-gray-700 dark:text-gray-300">
          These Terms and Conditions govern your use of the shannyTech website
          and services. By accessing or using the site, you agree to comply with
          and be bound by these terms.
        </motion.p>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            1. Definitions
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>
              <strong>“Company”</strong> refers to shannyTech.
            </li>
            <li>
              <strong>“User”</strong> refers to any individual or entity
              accessing or using the website or services.
            </li>
            <li>
              <strong>“Services”</strong> refers to any products, features, or
              offerings provided by shannyTech.
            </li>
            <li>
              <strong>“Website”</strong> refers to shannyTech’s web domain and
              all associated pages and content.
            </li>
          </ul>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            2. Acceptance of Terms
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            By using the Website or Services, you confirm that you have read,
            understood, and agree to these Terms & Conditions and any additional
            guidelines or rules posted by shannyTech. If you do not agree, you
            must not access or use the Website.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            3. Changes to Terms
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            shannyTech may modify these Terms at any time. Updates will be
            posted on this page with an updated effective date. Continued use
            after changes indicates acceptance of the revised Terms.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            4. Use of Services
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Users may access and use Services in accordance with these Terms and
            any documentation or instructions provided. You agree not to:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Use Services for unlawful or unauthorized purposes.</li>
            <li>Interfere with or disrupt the Website or servers.</li>
            <li>
              Reverse engineer any component of the Services unless permitted by
              law.
            </li>
            <li>
              Use bots or automated scripts to access or scrape data without
              permission.
            </li>
          </ul>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            5. Intellectual Property
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            All content, trademarks, logos, and materials on the Website and
            within Services are owned by or licensed to shannyTech. You may not
            reproduce, distribute, modify, or create derivative works without
            prior written consent.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            6. Privacy
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Use of personal data is governed by our Privacy Policy. By using the
            Website or Services, you consent to the data practices described in
            the Privacy Policy.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-indigo-400">
            7. Disclaimers
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Services and content are provided “as is” without warranties of any
            kind. shannyTech disclaims all warranties, whether express or
            implied, including merchantability, fitness for a particular
            purpose, and non-infringement.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-indigo-400">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            To the maximum extent permitted by law, shannyTech and its
            affiliates are not liable for any indirect, incidental, special,
            consequential, or punitive damages arising out of or related to your
            use of the Website or Services.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-indigo-400">
            9. Indemnification
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            You agree to indemnify and hold harmless shannyTech and its
            officers, directors, employees, and agents from any claims,
            liabilities, losses, damages, or expenses arising from your use of
            the Website or Services or violation of these Terms.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-indigo-400">
            10. Third-Party Links
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            The Website may contain links to third-party sites. shannyTech is
            not responsible for their content or practices. Accessing
            third-party links is at your own risk.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-indigo-400">
            11. Termination
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            shannyTech may suspend or terminate access to the Website or
            Services at any time without notice for violations of these Terms or
            other reasons. Upon termination, your right to use Services ceases
            immediately.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-indigo-400">
            12. Governing Law
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            These Terms are governed by the laws of the jurisdiction where
            shannyTech is established, without regard to conflict of law
            principles. Disputes shall be resolved in the competent courts of
            that jurisdiction.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-indigo-400">
            13. Changes to Services
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            shannyTech may modify or discontinue features or Services at any
            time without liability. Continued use indicates acceptance of any
            changes.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-indigo-400">
            14. Contact Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            For questions about these Terms, contact us at:
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Email: support@shannytech.solutions
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-indigo-400">
            15. Miscellaneous
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            If any provision is held invalid, the remainder of the Terms remain
            in effect. These Terms constitute the entire agreement between you
            and shannyTech regarding the Website and Services.
          </p>
        </motion.div>
      </div>
    </motion.main>
  );
}
