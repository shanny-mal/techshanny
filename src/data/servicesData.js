import { FaCode, FaMobileAlt, FaLock } from "react-icons/fa";

export const services = [
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    shortDescription:
      "Custom websites and web applications built with modern technologies to scale your business.",
    detailedDescription: `
    We design and develop responsive, performant, and SEO-friendly web applications tailored to your needs. Our expertise covers:
    - Frontend frameworks: React, Vue, Angular
    - Backend: Node.js, Django, Ruby on Rails, etc.
    - Static sites: for blogs or marketing, using frameworks or static site generators.
    - E-commerce: integration with payment gateways, shopping carts, and product management.
        `.trim(),
    icon: FaCode,
    features: [
      "Modern frontend frameworks (React, Vue, Angular)",
      "Reusable component-based architecture",
      "Responsive design for all devices",
      "SEO optimization and performance tuning",
      "Progressive Web App (PWA) support",
      "Integration with headless CMS or APIs",
      "Single Page Applications (SPAs) and Multi-Page Apps as needed",
    ],
    benefits: [
      "Enhanced user engagement and conversion",
      "Scalable architecture supporting growth",
      "Maintainable codebase for faster feature delivery",
      "Faster load times and better SEO rankings",
      "Cross-browser compatibility",
    ],
    processSteps: [
      {
        step: 1,
        title: "Requirement Gathering",
        description:
          "We collaborate with stakeholders to understand goals, target audience, and core features.",
      },
      {
        step: 2,
        title: "UI/UX Design & Prototyping",
        description:
          "Wireframes and prototypes are created to visualize user flows and interface before development.",
      },
      {
        step: 3,
        title: "Development & Testing",
        description:
          "Iterative implementation of features with continuous testing (unit, integration, E2E) and code reviews.",
      },
      {
        step: 4,
        title: "Deployment & Monitoring",
        description:
          "Deploy to production environment (e.g., Vercel, Netlify, AWS) with CI/CD pipelines and set up monitoring.",
      },
      {
        step: 5,
        title: "Maintenance & Iteration",
        description:
          "Provide ongoing support, performance monitoring, and iterative improvements based on user feedback.",
      },
    ],
    image: "/images/services/web-development.jpg", // place an image at public/images/services/web-development.jpg
    faq: [
      {
        question: "What technologies do you use for frontend?",
        answer:
          "We primarily use React.js for dynamic SPAs, but can also work with Vue.js or Angular based on project requirements.",
      },
      {
        question: "Can you integrate with existing backend or CMS?",
        answer:
          "Yes. We can integrate with REST or GraphQL APIs, headless CMS (e.g., Contentful, Strapi), or existing backend systems.",
      },
    ],
    contactCTA: "Request a Web Development Quote",
    tags: ["web", "frontend", "backend", "SPA", "PWA", "SEO"],
  },
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription:
      "Native and cross-platform mobile applications for iOS and Android to reach users on the go.",
    detailedDescription: `
    We build performant mobile applications tailored to your requirements:
    - Native: Swift (iOS), Kotlin/Java (Android)
    - Cross-platform: React Native, Flutter
    - Backend integration: REST/GraphQL APIs, real-time features via WebSockets
    - App store submission guidance and post-launch support
        `.trim(),
    icon: FaMobileAlt,
    features: [
      "Native app development (iOS, Android)",
      "Cross-platform frameworks (React Native, Flutter)",
      "Offline support and data synchronization",
      "Push notifications and in-app messaging",
      "Integration with device features: camera, GPS, sensors",
      "App store deployment support",
    ],
    benefits: [
      "Reach a wider mobile audience",
      "Consistent UX across platforms",
      "Faster development via shared codebase (for cross-platform)",
      "Improved user engagement and retention",
    ],
    processSteps: [
      {
        step: 1,
        title: "Concept & Requirement Analysis",
        description:
          "Define app objectives, target devices, platforms, and key functionalities.",
      },
      {
        step: 2,
        title: "Design & Prototyping",
        description:
          "Design user interfaces and experiences optimized for mobile interactions.",
      },
      {
        step: 3,
        title: "Development & QA",
        description:
          "Implement features, integrate with backend, and perform rigorous testing on multiple devices.",
      },
      {
        step: 4,
        title: "App Store & Play Store Deployment",
        description:
          "Handle submission processes, comply with platform guidelines, and monitor approval.",
      },
      {
        step: 5,
        title: "Maintenance & Updates",
        description:
          "Release updates, monitor crash reports, and iterate based on user feedback.",
      },
    ],
    image: "/images/services/mobile-app-development.jpg",
    faq: [
      {
        question: "Should I choose native or cross-platform?",
        answer:
          "It depends on budget, timeline, performance requirements, and target audience. We advise based on your project specifics.",
      },
    ],
    contactCTA: "Get a Mobile App Consultation",
    tags: ["mobile", "iOS", "Android", "React Native", "Flutter"],
  },
  {
    id: "cybersecurity",
    slug: "cybersecurity",
    title: "Cybersecurity",
    shortDescription:
      "Security assessments, audits, and implementation of best practices to protect your digital assets.",
    detailedDescription: `
    We help safeguard your systems with:
    - Security audits & vulnerability assessments
    - Penetration testing
    - Secure architecture design
    - Incident response planning
    - Compliance (e.g., GDPR, HIPAA)
        `.trim(),
    icon: FaLock,
    features: [
      "Vulnerability scanning & penetration testing",
      "Secure code reviews",
      "Threat modeling and risk assessments",
      "Security architecture and hardening",
      "Incident response and recovery planning",
      "Compliance consulting (GDPR, HIPAA, etc.)",
    ],
    benefits: [
      "Reduced risk of breaches and data loss",
      "Improved customer trust and brand reputation",
      "Compliance with industry regulations",
      "Proactive threat detection and mitigation",
    ],
    processSteps: [
      {
        step: 1,
        title: "Initial Assessment",
        description:
          "Conduct vulnerability scans and review existing security posture.",
      },
      {
        step: 2,
        title: "In-Depth Testing",
        description:
          "Perform penetration tests and code reviews to uncover critical issues.",
      },
      {
        step: 3,
        title: "Remediation & Hardening",
        description:
          "Recommend and implement security improvements and hardening measures.",
      },
      {
        step: 4,
        title: "Monitoring & Incident Response",
        description:
          "Set up continuous monitoring, logging, and incident response processes.",
      },
      {
        step: 5,
        title: "Training & Compliance",
        description:
          "Provide security awareness training and help achieve regulatory compliance.",
      },
    ],
    image: "/images/services/cybersecurity.jpg",
    faq: [
      {
        question: "How often should we perform security audits?",
        answer:
          "We recommend at least annual comprehensive audits, with more frequent automated scans depending on your risk profile.",
      },
    ],
    contactCTA: "Schedule a Security Assessment",
    tags: ["security", "compliance", "audit", "penetration-testing"],
  },
];
