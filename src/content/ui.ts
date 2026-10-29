import type { UiContent } from "./types";

/**
 * Labels used across the whole site: buttons, navigation, accessibility
 * labels, case-study section names, the 404 page. Section content lives in
 * the other files of this folder.
 */
export const ui: UiContent = {
  skipLink: { en: "Skip to content", fr: "Aller au contenu" },

  header: {
    home: { en: "{name}, back to top", fr: "{name}, retour en haut" },
    mainNav: { en: "Main", fr: "Principale" },
    openMenu: { en: "Open menu", fr: "Ouvrir le menu" },
    closeMenu: { en: "Close menu", fr: "Fermer le menu" },
    menu: { en: "Menu", fr: "Menu" },
    mobileNav: { en: "Mobile", fr: "Mobile" },
  },

  language: { label: { en: "Language", fr: "Langue" } },

  // The LinkedIn and GitHub links, for screen readers. Starts with the visible label.
  profileLink: {
    en: "{network} profile of {name} (opens in a new tab)",
    fr: "{network} : profil d’{name} (s’ouvre dans un nouvel onglet)",
  },

  theme: {
    label: { en: "Theme", fr: "Thème" },
    current: { en: "Theme: {theme}", fr: "Thème : {theme}" },
    dark: { en: "Dark", fr: "Sombre" },
    light: { en: "Light", fr: "Clair" },
    system: { en: "System", fr: "Système" },
  },

  footer: {
    navigate: { en: "Navigate", fr: "Navigation" },
    getInTouch: { en: "Get in touch", fr: "Me contacter" },
    inquiry: { en: "Send a project inquiry", fr: "Envoyer une demande de projet" },
    rights: { en: "All rights reserved.", fr: "Tous droits réservés." },
    backToTop: { en: "Back to top", fr: "Retour en haut" },
    nav: { en: "Footer", fr: "Pied de page" },
  },

  hero: {
    portraitPlaceholder: {
      en: "Portrait placeholder. Add your photo at",
      fr: "Portrait en attente. Ajoutez votre photo dans",
    },
  },

  work: {
    readCaseStudy: { en: "Read the case study", fr: "Lire l’étude de cas" },
    pipeline: { en: "Pipeline", fr: "Pipeline" },
    technologies: { en: "Technologies", fr: "Technologies" },
    githubRepo: {
      en: "(GitHub repository, opens in a new tab)",
      fr: "(dépôt GitHub, s’ouvre dans un nouvel onglet)",
    },
  },

  caseStudy: {
    allWork: { en: "All work", fr: "Tous les projets" },
    position: { en: "Case study {n} / {total}", fr: "Étude de cas {n} / {total}" },
    keyFigures: { en: "Key figures", fr: "Chiffres clés" },
    sections: {
      context: { en: "Context", fr: "Contexte" },
      problem: { en: "Problem", fr: "Problème" },
      solution: { en: "Solution", fr: "Solution" },
      architecture: { en: "Architecture", fr: "Architecture" },
      contribution: { en: "My contribution", fr: "Ma contribution" },
      team: { en: "Team", fr: "Équipe" },
      decisions: { en: "Technical decisions", fr: "Choix techniques" },
      results: { en: "Results", fr: "Résultats" },
      technologies: { en: "Stack", fr: "Stack" },
      github: { en: "GitHub", fr: "GitHub" },
      links: { en: "Links", fr: "Liens" },
      source: { en: "Source code", fr: "Code source" },
    },
    architectureLabel: { en: "{title}: architecture", fr: "{title} : architecture" },
    viewOnGithub: { en: "View on GitHub", fr: "Voir sur GitHub" },
    viewDemo: { en: "View the demo", fr: "Voir la démo" },
    sourcePrivate: {
      en: "The source code isn’t public: it was written during an internship and stays private.",
      fr: "Le code source n’est pas public : il a été écrit pendant un stage et reste privé.",
    },
    sourceNone: {
      en: "There’s no public repository for this project.",
      fr: "Il n’y a pas de dépôt public pour ce projet.",
    },
    otherProjects: { en: "Other projects are on", fr: "D’autres projets sont sur" },
    next: { en: "Next case study", fr: "Étude de cas suivante" },
    similar: { en: "Building something similar?", fr: "Vous construisez quelque chose de similaire ?" },
    metaTitle: { en: "{title}: {subtitle}", fr: "{title} : {subtitle}" },
  },

  notFound: {
    eyebrow: { en: "Error 404", fr: "Erreur 404" },
    title: {
      en: "This page doesn’t exist, *but your project can.*",
      fr: "Cette page n’existe pas, *mais votre projet, si.*",
    },
    text: {
      en: "The link may be broken or the page may have moved. Head back to the homepage to see services, case studies and how to get in touch.",
      fr: "Le lien est peut-être cassé ou la page a été déplacée. Revenez à l’accueil pour découvrir les services, les études de cas et comment me contacter.",
    },
    back: { en: "Back to homepage", fr: "Retour à l’accueil" },
    metaTitle: { en: "Page not found", fr: "Page introuvable" },
  },

  // Social share images.
  og: {
    caseStudy: { en: "Case study", fr: "Étude de cas" },
    caseStudyAlt: { en: "Case study by {name}", fr: "Étude de cas — {name}" },
  },
};
