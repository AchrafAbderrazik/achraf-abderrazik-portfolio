import type { Copy, Localized, Term } from "./i18n";

/*
 * The shape of every content file. Text fields typed `Copy` need both
 * languages; `Term` may be a plain string when it doesn't change (names,
 * technologies). Inline markup in headings and paragraphs:
 *   *serif accent*   →  the italic editorial accent
 *   **emphasis**     →  brighter text
 */

/** An internal link. Write it without the language: "/#work", "/work/aman". */
export type InternalHref = `/${string}`;

export type NavItem = { label: Copy; href: InternalHref };

export type SocialLink = {
  label: "LinkedIn" | "GitHub" | "X" | "Upwork" | "Malt" | "WhatsApp";
  href: string;
};

/** A social link as rendered, with its accessible name ("LinkedIn profile of …, opens in a new tab"). */
export type ProfileLink = SocialLink & { ariaLabel: string };

/** A numbered section heading: "01 —— Selected work" + title + optional intro. */
export type SectionHeading = { index: string; eyebrow: Copy; title: Copy; intro?: Copy };

/* ---- Site --------------------------------------------------------------- */

export type SiteContent = {
  name: string;
  /** First and last name, for search engines (structured data). */
  givenName: string;
  familyName: string;
  /** Professional title: with the name, the homepage's main heading; also titles and structured data. */
  role: Copy;
  /** Short descriptors for the app manifest and the share image's alt text. */
  positioning: Copy[];
  availability: { open: boolean; label: Copy };
  /** Shown on the page: "Marrakech, Morocco". */
  location: Copy;
  /** For search engines (structured data): city and two-letter country code. */
  address: { city: string; country: string };
  /** Decorative coordinates shown on the hero portrait. */
  coordinates: Copy;
  contact: {
    email: string;
    /** Optional scheduling link (Cal.com, Calendly…). Hidden when empty. */
    bookingUrl: string;
  };
  socials: SocialLink[];
  portrait: {
    /** A file in /public. While it's missing, the hero shows a monogram plate. */
    src: string;
    alt: Copy;
    /** CSS object-position: where your face sits in the frame. */
    position: string;
  };
  seo: {
    title: Copy;
    description: Copy;
    keywords: Localized<string[]>;
    /** Headline of the social share image, one string per line (*serif accent*). */
    shareHeadline: Localized<string[]>;
  };
  navigation: { main: NavItem[]; contact: NavItem; cta: NavItem };
  footer: { description: Copy };
};

/* ---- Homepage sections ---------------------------------------------------- */

export type HeroContent = {
  /** One string per line. A final "." is drawn in the accent colour. */
  headline: Localized<string[]>;
  intro: Copy;
  secondaryCta: NavItem;
  stack: { label: Copy; items: { label: string; keepCase?: boolean }[] };
};

/** A homepage headline number: a metric picked from a case study. */
export type HeadlineMetric = {
  project: string;
  metric: string;
  /** Overrides, since the homepage shows the number out of its case study. */
  label?: Copy;
  detail?: Copy;
};

export type WorkContent = {
  heading: SectionHeading;
  headline: { title: Copy; note: Copy; items: HeadlineMetric[] };
  more: { eyebrow: Copy; title: Copy; allRepositories: Copy };
};

export type ServiceId = "ai-llm-systems" | "ai-automation" | "backend-apis" | "intelligent-web-apps";

export type Service = { id: ServiceId; title: Copy; description: Copy; capabilities: Copy[] };

export type ServicesContent = { heading: SectionHeading; related: Copy; items: Service[] };

export type ExperienceItem = {
  organisation: string;
  location: Term;
  role: Copy;
  period: Copy;
  /** Names the case study link ("AeroManager case study"). */
  project?: string;
  summary: Copy;
  /** Slug of the case study that tells the full story. */
  caseStudy: string;
};

export type AboutContent = {
  heading: SectionHeading;
  paragraphs: Copy[];
  labels: {
    basedIn: Copy;
    education: Copy;
    languages: Copy;
    openTo: Copy;
    experience: Copy;
    /** Link to a case study when `project` is set: "{project} case study". */
    projectCaseStudy: Copy;
  };
  /** `acronym` is the school's short name and `campus` its city, both shown and used by search engines. */
  education: { school: string; acronym: string; campus?: string; degree: Copy; period: string; status: Copy };
  languages: Localized<string[]>;
  openTo: Copy[];
  experience: ExperienceItem[];
};

export type StackContent = {
  heading: SectionHeading;
  groups: { id: string; label: Copy; items: Term[] }[];
  footnote: { languagesLabel: Copy; languages: string[]; methodsLabel: Copy; methods: Term[] };
};

/** Values the contact form submits: stable, whatever the language. */
export type ContactTopic = "AI / LLM system" | "AI automation" | "Backend / API" | "Web application" | "Not sure yet";

export type ContactContent = {
  heading: SectionHeading;
  nextSteps: { title: Copy; steps: Copy[] };
  direct: { title: Copy; bookCall: Copy; copy: Copy; copied: Copy; copiedStatus: Copy };
  form: {
    label: Copy;
    name: Copy;
    email: Copy;
    company: Copy;
    optional: Copy;
    topics: { legend: Copy; optional: Copy; options: { value: ContactTopic; label: Copy }[] };
    message: { label: Copy; placeholder: Copy };
    honeypot: Copy;
    privacy: Copy;
    submit: Copy;
    sending: Copy;
    /** `{min}` and `{max}` are replaced with the limits in src/lib/contact.ts. */
    errors: { name: Copy; email: Copy; companyTooLong: Copy; messageTooShort: Copy; messageTooLong: Copy };
    /** `{name}` is the visitor's first name. */
    success: { title: Copy; body: Copy; again: Copy };
    failure: { unavailable: Copy; failed: Copy; fallback: Copy; retry: Copy; sendByEmail: Copy };
    /** The email the "send by email instead" fallback opens (`{name}` in the subject). */
    mailto: { subject: Copy; name: Copy; email: Copy; company: Copy; topics: Copy };
  };
};

/* ---- Projects --------------------------------------------------------------- */

/**
 * How a project came to be. Every project shows this so visitors can tell
 * real-world and internship work apart from academic and personal work.
 */
export type ProjectKind = "real-world" | "internship" | "academic" | "personal" | "project";

/** A documented, verifiable number. Never add a metric without a source. */
export type Metric = {
  /** Stable key, used to pick metrics for the homepage and project cards. */
  id: string;
  /** As displayed, per language when the format differs ("0.895" / "0,895"). */
  value: Term;
  label: Copy;
  /** Short context under the number on the homepage and project cards. */
  detail?: Copy;
  /** Plain-language explanation of what the number measures (case study page). */
  meaning: Copy;
  /** Animate the number on first view (only for clean numeric values). */
  count?: { to: number; decimals?: number; prefix?: Term; suffix?: Term };
};

/** Metrics that only make sense in order (one model after another). */
export type MetricProgression = {
  title: Copy;
  /** What the shared measure means, shown once for all steps. */
  note: Copy;
  /** Metric ids, first to last. The last step is the result. */
  steps: string[];
  /** Upper bound of the meter (1 for scores such as F1). */
  max: number;
};

export type DiagramNode = {
  /** Small label above the title: "Input", "Model"… */
  kicker: Term;
  title: Term;
  detail?: Term;
  /** One highlighted fact at most per diagram, on the node that produces it. */
  metric?: Term;
  emphasis?: boolean;
};

/** One step of the pipeline. Several nodes in a stage run in parallel. */
export type DiagramStage = { nodes: DiagramNode[] };

export type Architecture = {
  caption: Copy;
  /** Short labels for the one-line pipeline on the homepage card. */
  compact: Term[];
  stages: DiagramStage[];
};

export type Decision = { title: Copy; body: Copy };

export type ProjectLinks = { github?: string; demo?: string };

type ProjectBase = {
  /** The URL: /en/work/<slug>. Lowercase, hyphens only. */
  slug: string;
  title: Term;
  /** Real-world, internship, academic… (sets the badge dot). */
  kind: ProjectKind;
  /** Badge text, e.g. "Real-world · Internship". */
  badge: Copy;
  /** Field of the project. Used in structured data for search engines. */
  category: Copy;
  year?: number;
  technologies: Term[];
  /** Keywords for search engines. Not displayed. */
  tags?: Term[];
  links?: ProjectLinks;
};

/** A project with its own page at /<lang>/work/<slug>. */
export type CaseStudyProject = ProjectBase & {
  caseStudy: true;
  /** true: listed under Selected work. false: shown with the smaller projects. */
  featured: boolean;
  /** Short name for compact places (the homepage numbers). Defaults to the title. */
  shortTitle?: Term;
  subtitle: Copy;
  /** One plain-language sentence: cards and the top of the case study. */
  summary: Copy;
  /** Optional longer introduction, under the summary. */
  description?: Copy;
  /** Key facts under the title: organisation, role, timeline… */
  facts: { label: Copy; value: Term }[];
  /** Optional image (see docs/CONTENT-GUIDE.md for sizes). */
  cover?: { src: string; alt: Copy };
  /** Confidentiality or context note, shown near the top. */
  note?: Copy;
  /** The full documented metric set, each explained on the case study page. */
  metrics: Metric[];
  /** Ids of the 1–2 metrics on the homepage card. Pick ones the homepage doesn't already show. */
  cardMetrics: [string] | [string, string];
  progression?: MetricProgression;
  context: Copy;
  problem: Copy;
  /** Optional "Solution" section, between Problem and Architecture. */
  solution?: Copy;
  architecture: Architecture;
  /**
   * Your own part ("My contribution"). For team projects, leave it out until
   * you describe it: the page then shows `team` instead.
   */
  contribution?: Copy;
  /**
   * Team projects ("Team" section): the team and the project's technical
   * scope, worded as team work. Don't attribute parts to yourself here.
   */
  team?: Copy;
  decisions: Decision[];
  /** Outcomes in words. Numbers belong in `metrics`, so they aren't repeated. */
  results: Copy[];
  /** Services this project proves: it's listed under them as a related case study. */
  services?: ServiceId[];
  seo: { description: Copy };
};

/** A smaller project, shown as a card linking to its repository. */
export type SecondaryProject = ProjectBase & {
  caseStudy: false;
  description: Copy;
  highlights: Copy[];
};

export type Project = CaseStudyProject | SecondaryProject;

/* ---- Interface ------------------------------------------------------------------ */

/** Labels used across the site: buttons, accessibility labels, section names. */
export type UiContent = {
  skipLink: Copy;
  header: { home: Copy; mainNav: Copy; openMenu: Copy; closeMenu: Copy; menu: Copy; mobileNav: Copy };
  language: { label: Copy };
  /** Accessible name of the LinkedIn and GitHub links: `{network}` and `{name}`. */
  profileLink: Copy;
  /** The theme switch. `current` takes `{theme}`, the name of the current choice. */
  theme: { label: Copy; current: Copy; dark: Copy; light: Copy; system: Copy };
  footer: { navigate: Copy; getInTouch: Copy; inquiry: Copy; rights: Copy; backToTop: Copy; nav: Copy };
  hero: { portraitPlaceholder: Copy };
  work: { readCaseStudy: Copy; pipeline: Copy; technologies: Copy; githubRepo: Copy };
  caseStudy: {
    allWork: Copy;
    /** `{n}` and `{total}`. */
    position: Copy;
    keyFigures: Copy;
    sections: {
      context: Copy;
      problem: Copy;
      solution: Copy;
      architecture: Copy;
      contribution: Copy;
      team: Copy;
      decisions: Copy;
      results: Copy;
      technologies: Copy;
      github: Copy;
      links: Copy;
      source: Copy;
    };
    /** `{title}`. */
    architectureLabel: Copy;
    viewOnGithub: Copy;
    viewDemo: Copy;
    sourcePrivate: Copy;
    sourceNone: Copy;
    otherProjects: Copy;
    next: Copy;
    similar: Copy;
    /** `{title}` and `{subtitle}`. */
    metaTitle: Copy;
  };
  notFound: { eyebrow: Copy; title: Copy; text: Copy; back: Copy; metaTitle: Copy };
  og: { caseStudy: Copy; caseStudyAlt: Copy };
};
