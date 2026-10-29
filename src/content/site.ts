import type { SiteContent } from "./types";

/**
 * Who you are and how to reach you: name, contact details, social links,
 * portrait, navigation and search-engine text.
 * Source of truth: CV (EN/FR, 2026), LinkedIn and GitHub profile.
 */
export const site: SiteContent = {
  name: "Achraf Abderrazik",
  givenName: "Achraf",
  familyName: "Abderrazik",

  // The professional title: the homepage heading, titles and structured data.
  role: { en: "AI & Data Science Engineer", fr: "Ingénieur IA & Data Science" },

  positioning: [
    { en: "AI & Data Science Engineer", fr: "Ingénieur IA & Data Science" },
    { en: "AI Automation", fr: "Automatisation IA" },
    { en: "Backend & Intelligent Systems", fr: "Backend & systèmes intelligents" },
  ],

  availability: {
    open: true,
    label: { en: "Available for new projects", fr: "Disponible pour de nouveaux projets" },
  },

  location: { en: "Marrakech, Morocco", fr: "Marrakech, Maroc" },
  address: { city: "Marrakech", country: "MA" },
  coordinates: { en: "31.63° N · 7.98° W", fr: "31,63° N · 7,98° O" },

  contact: {
    // Source: CV header.
    email: "achraf.abderrazik@yahoo.fr",
    bookingUrl: "",
  },

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/achraf-abderrazik/" },
    { label: "GitHub", href: "https://github.com/AchrafAbderrazik" },
  ],

  // A tall photo is shown as a horizontal band: the second `position` value
  // moves your face up or down in the frame.
  portrait: {
    src: "/achraf-abderrazik.png",
    alt: { en: "Portrait of Achraf Abderrazik", fr: "Portrait d’Achraf Abderrazik" },
    position: "50% 45%",
  },

  seo: {
    // The homepage title: your name first, then what you do. Other pages are
    // titled "<page> | Achraf Abderrazik" (src/app/[locale]/layout.tsx).
    title: {
      en: "Achraf Abderrazik | AI & Data Science Engineer",
      fr: "Achraf Abderrazik | Ingénieur IA & Data Science",
    },
    // Search results and social cards: keep under ~160 characters.
    description: {
      en: "Portfolio of Achraf Abderrazik, AI & Data Science Engineer in Marrakech and final-year engineering student at EMSI: machine learning, NLP and LLM projects.",
      fr: "Portfolio d’Achraf Abderrazik, ingénieur IA & Data Science à Marrakech et élève ingénieur en dernière année à l’EMSI : projets de machine learning, NLP et LLM.",
    },
    keywords: {
      en: [
        "Achraf Abderrazik",
        "AI engineer",
        "machine learning engineer",
        "LLM applications",
        "AI automation",
        "NLP",
        "Moroccan Darija NLP",
        "backend engineer",
        "FastAPI",
        "Claude API",
        "Marrakech",
        "Morocco",
      ],
      fr: [
        "Achraf Abderrazik",
        "ingénieur IA",
        "ingénieur machine learning",
        "applications LLM",
        "automatisation IA",
        "NLP",
        "NLP darija",
        "ingénieur backend",
        "FastAPI",
        "Claude API",
        "Marrakech",
        "Maroc",
      ],
    },
    // The image shown when the site is shared on LinkedIn, X, Slack…
    shareHeadline: {
      en: ["I build *intelligent systems*", "from model to *production.*"],
      fr: ["Je construis des", "*systèmes intelligents*", "du modèle à la *production.*"],
    },
  },

  navigation: {
    main: [
      { label: { en: "Work", fr: "Projets" }, href: "/#work" },
      { label: { en: "Services", fr: "Services" }, href: "/#services" },
      { label: { en: "About", fr: "À propos" }, href: "/#about" },
      { label: { en: "Stack", fr: "Stack" }, href: "/#stack" },
    ],
    contact: { label: { en: "Contact", fr: "Contact" }, href: "/#contact" },
    cta: { label: { en: "Start a project", fr: "Lancer un projet" }, href: "/#contact" },
  },

  footer: {
    description: {
      en: "AI & Data Science Engineer building intelligent systems from model to production: machine learning, LLM applications, AI automation and backend APIs.",
      fr: "Ingénieur IA & Data Science, je construis des systèmes intelligents du modèle à la production : machine learning, applications LLM, automatisation IA et API backend.",
    },
  },
};
