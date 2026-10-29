import type { AboutContent } from "./types";

/**
 * The About section: introduction, key facts and experience.
 * Source of truth: CV (EN/FR, 2026) and LinkedIn.
 */
export const about: AboutContent = {
  heading: {
    index: "03",
    eyebrow: { en: "About", fr: "À propos" },
    title: { en: "The whole system, *not just the model.*", fr: "Le système entier, *pas seulement le modèle.*" },
  },

  paragraphs: [
    {
      en: "I’m **Achraf Abderrazik**, a final-year Software Engineering student at EMSI, specialising in Artificial Intelligence & Data Science.",
      fr: "Je suis **Achraf Abderrazik**, élève ingénieur en dernière année de génie logiciel à l’EMSI, spécialisé en Intelligence Artificielle & Data Science.",
    },
    {
      en: "While I complete my engineering degree, my professional focus is **AI / ML engineering, AI automation, and backend & intelligent systems**.",
      fr: "Pendant que je termine mon diplôme d’ingénieur, mon activité professionnelle se concentre sur **l’ingénierie IA / ML, l’automatisation IA, le backend et les systèmes intelligents**.",
    },
    {
      en: "In both of my internships I was the sole developer, from design to production: first AeroManager for ONDA, Morocco’s national airports authority, then a multilingual LLM pipeline for a real-estate agency in Marrakech.",
      fr: "Lors de mes deux stages, j’étais le seul développeur, de la conception à la mise en production : d’abord AeroManager pour l’ONDA, l’Office National Des Aéroports, puis un pipeline LLM multilingue pour une agence immobilière à Marrakech.",
    },
  ],

  labels: {
    basedIn: { en: "Based in", fr: "Basé à" },
    education: { en: "Education", fr: "Formation" },
    languages: { en: "Languages", fr: "Langues" },
    openTo: { en: "Open to", fr: "Ouvert à" },
    experience: { en: "Experience", fr: "Expérience" },
    projectCaseStudy: { en: "{project} case study", fr: "Étude de cas {project}" },
  },

  // Source: CV — Education.
  education: {
    school: "École Marocaine des Sciences de l’Ingénieur",
    acronym: "EMSI",
    campus: "Marrakech",
    degree: {
      en: "Engineering degree in Computer Science & Networks, Artificial Intelligence & Data Science",
      fr: "Cycle ingénieur en Informatique et Réseaux, spécialité Intelligence Artificielle & Data Science",
    },
    period: "2022–2027",
    status: { en: "Final year", fr: "Dernière année" },
  },

  // Source: CV — Languages.
  languages: {
    en: ["Arabic", "Moroccan Darija", "French", "English"],
    fr: ["Arabe", "darija marocain", "français", "anglais"],
  },

  openTo: [
    { en: "Freelance projects", fr: "Missions freelance" },
    { en: "End-of-studies internship (PFE), 2026–2027", fr: "Stage de fin d’études (PFE), 2026–2027" },
  ],

  // Source: CV — Professional experience.
  experience: [
    {
      organisation: "Safe Invest Property",
      location: "Marrakech",
      role: { en: "AI Engineering Intern · Sole developer", fr: "Stagiaire ingénierie IA · Seul développeur" },
      period: { en: "Jul – Aug 2026 · 9 weeks", fr: "Juil. – août 2026 · 9 semaines" },
      summary: {
        en: "Designed and deployed to production a multilingual LLM pipeline that turns WhatsApp, Instagram and Messenger conversations into structured CRM leads.",
        fr: "Conception et mise en production d’un pipeline LLM multilingue qui transforme les conversations WhatsApp, Instagram et Messenger en fiches CRM structurées.",
      },
      caseStudy: "safe-invest",
    },
    {
      organisation: "ONDA · Office National Des Aéroports",
      location: "Marrakech",
      role: {
        en: "Software Engineering Intern · Sole developer",
        fr: "Stagiaire développement logiciel · Seul développeur",
      },
      period: { en: "Jul – Aug 2025 · 1 month", fr: "Juil. – août 2025 · 1 mois" },
      project: "AeroManager",
      summary: {
        en: "Built AeroManager, an institutional web platform covering flights, hotels, transport, recruitment and public tenders, on a React SPA and a Flask REST API with role-based access.",
        fr: "Développement d’AeroManager, une plateforme web institutionnelle couvrant les vols, les hôtels, les transports, l’emploi et les appels d’offres, sur une SPA React et une API REST Flask avec contrôle d’accès par rôles.",
      },
      caseStudy: "aeromanager",
    },
  ],
};
