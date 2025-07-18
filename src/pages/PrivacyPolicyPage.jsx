// src/pages/PolicyPages.jsx
import { motion } from "framer-motion";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function PolicyPage({ id, title, intro, sections, meta }) {
  useDocumentMeta(meta);

  return (
    <motion.main
      role="main"
      aria-labelledby={id}
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex-grow bg-surface-light dark:bg-surface-dark py-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <motion.h1
          id={id}
          variants={item}
          className="font-heading text-primary text-[clamp(1.75rem,5vw,2.5rem)]"
        >
          {title}
        </motion.h1>

        <motion.p variants={item} className="font-body text-body">
          {intro}
        </motion.p>

        {sections.map(({ heading, content, items }, i) => (
          <motion.section key={i} variants={item} className="space-y-4">
            <h2 className="font-heading text-[clamp(1.25rem,3vw,1.5rem)] text-primary">
              {heading}
            </h2>
            {content && <p className="font-body text-body">{content}</p>}
            {items && (
              <ul className="list-disc list-inside font-body text-body space-y-1">
                {items.map((txt, j) => (
                  <li key={j}>{txt}</li>
                ))}
              </ul>
            )}
          </motion.section>
        ))}
      </div>
    </motion.main>
  );
}

export function PrivacyPolicyPage() {
  const meta = {
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
  };
  const intro = `This Privacy Policy describes how shannyTech ("we", "us", or "our") collects, uses, discloses, and protects personal information when you visit our website or use our services. By accessing or using our website or services, you agree to the collection and use of information in accordance with this policy.`;
  const sections = [
    {
      heading: "1. Information We Collect",
      items: [
        "Personal Information: name, email, phone, company, etc.",
        "Usage Data: pages viewed, time spent, IP, browser, device info.",
        "Cookies & Tracking Technologies: to enhance UX and analytics.",
        "Communications: records of emails, support requests, feedback.",
      ],
    },
    {
      heading: "2. How We Use Your Information",
      items: [
        "To Provide & Improve Services: process requests, personalize content.",
        "Communication: send updates, newsletters (with consent).",
        "Analytics: monitor usage patterns & site performance.",
        "Security: detect & prevent fraud, protect data.",
        "Compliance: legal obligations, dispute resolution.",
      ],
    },
    {
      heading: "3. Cookies and Tracking Technologies",
      content:
        "We use cookies and similar technologies to track activity. You can control cookies via browser settings; disabling may limit functionality.",
    },
    {
      heading: "4. Third-Party Services",
      content:
        "We may employ third‑party providers (analytics, email, payments) who have their own privacy policies—please review them.",
    },
    {
      heading: "5. Data Sharing and Disclosure",
      items: [
        "Service Providers: vendors assisting with site ops & marketing.",
        "Legal Requirements: when mandated by law or to protect rights.",
        "Business Transfers: in mergers or acquisitions, with privacy safeguards.",
      ],
    },
    {
      heading: "6. Data Retention",
      content:
        "We keep personal data as long as needed for the stated purposes or legal obligations, then securely delete or anonymize it.",
    },
    {
      heading: "7. Your Rights",
      items: [
        "Access & Correction: request access or updates to your data.",
        "Deletion: request deletion, subject to legal requirements.",
        "Opt‑Out: unsubscribe from marketing at any time.",
        "Cookie Controls: manage cookies via browser/consent tools.",
        "Portability: request data export in a structured format.",
      ],
    },
    {
      heading: "8. Security",
      content:
        "We implement appropriate technical & organizational measures to protect your data, but no system is 100% secure.",
    },
    {
      heading: "9. Children’s Privacy",
      content:
        "Our site is not directed to under‑16s. We do not knowingly collect data from minors. Contact us to remove any such data.",
    },
    {
      heading: "10. International Transfers",
      content:
        "Data may be processed outside your country. We ensure adequate protections under applicable laws.",
    },
    {
      heading: "11. Changes to This Policy",
      content:
        "We may update this policy; continued use after changes indicates your acceptance.",
    },
    {
      heading: "12. Contact Us",
      items: [
        "Email: privacy@shannytech.solutions",
        "Address: shannyTech, 2964 Batonga, Kariba",
      ],
    },
  ];

  return (
    <PolicyPage
      id="privacy-heading"
      title="Privacy Policy"
      intro={intro}
      sections={sections}
      meta={meta}
    />
  );
}

export function TermsAndConditionsPage() {
  const meta = {
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
  };
  const intro = `These Terms and Conditions govern your use of the shannyTech website and services. By accessing or using the site, you agree to comply with and be bound by these terms.`;
  const sections = [
    {
      heading: "1. Definitions",
      items: [
        "“Company” refers to shannyTech.",
        "“User” refers to anyone accessing or using the site/services.",
        "“Services” refers to our offerings and products.",
        "“Website” refers to shannyTech's domain and content.",
      ],
    },
    {
      heading: "2. Acceptance of Terms",
      content:
        "By using our site or services, you confirm you’ve read and agree to these Terms. If you disagree, do not use the site.",
    },
    {
      heading: "3. Changes to Terms",
      content:
        "We may modify these Terms at any time. Updates will be posted here. Continued use indicates acceptance.",
    },
    {
      heading: "4. Use of Services",
      items: [
        "Use for lawful purposes only.",
        "Do not disrupt or reverse‑engineer our systems.",
        "No bots or unauthorized data scraping.",
      ],
    },
    {
      heading: "5. Intellectual Property",
      content:
        "All site content—logos, text, graphics—is owned or licensed by shannyTech. No reproduction without permission.",
    },
    {
      heading: "6. Privacy",
      content:
        "Personal data handled per our Privacy Policy. By using the site, you consent to those practices.",
    },
    {
      heading: "7. Disclaimers",
      content:
        "Services provided “as is” without warranties. We disclaim all implied warranties.",
    },
    {
      heading: "8. Limitation of Liability",
      content:
        "To the fullest extent allowed by law, we are not liable for indirect or consequential damages.",
    },
    {
      heading: "9. Indemnification",
      content:
        "You agree to hold harmless shannyTech and its officers from any claims arising from your use.",
    },
    {
      heading: "10. Third‑Party Links",
      content:
        "We’re not responsible for external sites linked here. Access at your own risk.",
    },
    {
      heading: "11. Termination",
      content:
        "We may suspend or terminate your access for violations without notice.",
    },
    {
      heading: "12. Governing Law",
      content:
        "These Terms governed by the laws where shannyTech is established. Disputes go to those courts.",
    },
    {
      heading: "13. Changes to Services",
      content:
        "We can modify or discontinue features at any time. Continued use indicates acceptance.",
    },
    {
      heading: "14. Contact Information",
      items: ["support@shannytech.solutions"],
    },
  ];

  return (
    <PolicyPage
      id="terms-heading"
      title="Terms & Conditions"
      intro={intro}
      sections={sections}
      meta={meta}
    />
  );
}
