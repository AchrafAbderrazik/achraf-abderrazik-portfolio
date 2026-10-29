# Content guide

How to change what the site says, in English and French, without touching the
components. Everything below is an edit to a file in `src/content/` (or an
image in `public/`), followed by a build.

- [How the site is organised](#how-the-site-is-organised)
- [How English and French work](#how-english-and-french-work)
- [Add a project](#add-a-project)
- [Images](#images)
- [Edit other content](#edit-other-content)
- [Translations](#translations)
- [Check and deploy](#check-and-deploy)
- [When the build fails](#when-the-build-fails)

---

## How the site is organised

```
src/content/   CONTENT   every text, number, link and project, in both languages
     ↓
src/lib/       LOGIC     picks one language, checks cross-references, builds metadata
     ↓
src/components UI        sections, case-study layout, diagrams, header, footer
     ↓
src/app/       PAGES     /en, /fr and /<lang>/work/<slug>, generated from the content
```

Components never contain copy: they receive plain, single-language data from
`getContent(locale)` (`src/lib/content.ts`). If you are looking for a sentence,
it is in `src/content/`.

| File                        | What it holds                                                        |
| --------------------------- | -------------------------------------------------------------------- |
| `site.ts`                   | Name, role, positioning, availability, location, email, social links, portrait, navigation, search-engine title and description, footer text |
| `hero.ts`                   | Hero headline, introduction, second button, core-stack readout       |
| `work.ts`                   | "Selected work" heading, the headline numbers under the hero, "Also built" heading |
| `projects/*.ts`             | One file per project; `projects/index.ts` sets the order            |
| `services.ts`               | The four services and their capabilities                             |
| `about.ts`                  | About paragraphs, education, languages, "Open to", experience        |
| `stack.ts`                  | Stack groups, programming languages, methods                         |
| `contact.ts`                | Contact section, next steps, form labels, errors and messages        |
| `ui.ts`                     | Interface labels: buttons, section names, accessibility labels, 404 page, share-image text |
| `i18n.ts`                   | The list of languages and the default one                            |
| `types.ts`                  | The shape of every file above, with a comment on each field          |

---

## How English and French work

### In the content files

Every visible text is written once per language, side by side:

```ts
title: { en: "Selected work", fr: "Sélection de projets" },
```

There are two kinds of fields (see `src/content/i18n.ts`):

- **`Copy`** must have both languages. Forgetting one is a TypeScript error,
  so the build tells you exactly what is missing.
- **`Term`** is a name or technical term. Write a plain string when it reads the
  same in both languages (`"PostgreSQL"`, `"AMAN"`), or `{ en, fr }` when it
  doesn't (`{ en: "Model registry", fr: "Registre de modèles" }`).

Conventions:

- **French spacing is automatic.** Type ordinary spaces: the no-break spaces
  before `: ; ? ! %`, inside `« »`, in `179 000` and in `12 h` are added for you.
- **Inline styling** in headings and paragraphs: `*serif accent*` for the italic
  editorial accent, `**emphasis**` for brighter text.
- **Placeholders** such as `{name}`, `{title}`, `{min}` are filled in by the
  code. Keep them in both languages.
- **Numbers** are written the way each language displays them:
  `value: { en: "0.895", fr: "0,895" }`, `{ en: "98%", fr: "98 %" }`.

### In the URLs

| URL                              | Page                                         |
| -------------------------------- | -------------------------------------------- |
| `/`                              | Permanent redirect (308) to `/en`            |
| `/en`, `/fr`                     | Homepage                                     |
| `/en/work/<slug>`, `/fr/work/<slug>` | Case study; the slug is the same in both languages |
| `/work/<slug>`                   | Old links: permanent redirect to `/en/work/<slug>` |
| Anything else                    | 404 page, in French for `/fr/…`, otherwise in English |

**English is the default, always.** `/` sends every visitor to `/en`, whatever
their browser language. This is deliberate: the address of a page never
depends on who opens it, links shared in French stay in French, and search
engines see one stable version of each page. Visitors change language with
**EN · FR** in the header (and in the mobile menu); it keeps them on the same
page, and on the homepage, at the same section.

The redirects are in `next.config.ts`. Each page declares its other-language
version to search engines (`hreflang`, with English as `x-default`), and the
sitemap lists both.

---

## Add a project

A project is either:

- a **case study**: its own page at `/en/work/<slug>` and `/fr/work/<slug>`, a
  card on the homepage, a share image and a sitemap entry; or
- a **secondary project**: a card under "Also built" that links to its
  repository.

### 1. Create the file

Copy the closest existing project in `src/content/projects/` and rename it
`<slug>.ts`:

| New project is…                 | Copy                            |
| ------------------------------- | ------------------------------- |
| An internship or real-world job | `safe-invest.ts` or `aeromanager.ts` |
| A team / academic project       | `distributed-model-serving.ts` or `aman.ts` |
| A smaller project (card only)   | `car-rental-system.ts`          |

### 2. Fill in the fields

Fields shared by every project:

| Field          | Required | Notes                                                                 |
| -------------- | -------- | --------------------------------------------------------------------- |
| `slug`         | yes      | The URL. Lowercase words joined by hyphens: `"trend-radar"`. Never change it once published (or add a redirect in `next.config.ts`). |
| `caseStudy`    | yes      | `true` for a case study, `false` for a card                           |
| `title`        | yes      | Keep the project's real name. Translate it only if it has an established French title (`{ en, fr }`). |
| `kind`         | yes      | `"real-world"`, `"internship"`, `"academic"`, `"personal"` or `"project"`. Real-world and internship work get the accent dot. |
| `badge`        | yes      | The label shown on the project, e.g. `{ en: "Academic · Team of 4", fr: "Académique · Équipe de 4" }` |
| `category`     | yes      | Field of the project, for search engines                             |
| `year`         | no       | Year of the project                                                   |
| `technologies` | yes      | Shown as tags. Technology names stay as they are.                    |
| `tags`         | no       | Extra keywords for search engines (not displayed)                    |
| `links`        | no       | `{ github: "https://github.com/…", demo: "https://…" }`. Leave a link out rather than inventing one: the page then says there is no public repository. |

Case studies also have:

| Field          | Required | Where it shows                                                        |
| -------------- | -------- | --------------------------------------------------------------------- |
| `featured`     | yes      | `true`: under Selected work. `false`: with the smaller project cards (the page still exists). |
| `shortTitle`   | no       | Compact places such as the headline numbers. Defaults to `title`.     |
| `subtitle`     | yes      | The serif line under the title                                        |
| `summary`      | yes      | One plain sentence: homepage card and top of the page                 |
| `description`  | no       | A longer introduction under the summary                               |
| `facts`        | yes      | The row of key facts under the title (context, year, role…)           |
| `note`         | no       | Confidentiality or context note, with a lock icon                     |
| `cover`        | no       | An image at the top of the page; see [Images](#images)                |
| `metrics`      | yes      | Every documented number: `id`, `value`, `label`, `meaning` (what it measures, in plain words), optional `detail` and `count` (animated count-up, for clean numbers only) |
| `cardMetrics`  | yes      | 1 or 2 metric `id`s for the homepage card                             |
| `progression`  | no       | Metrics that only make sense in order (like AMAN's teacher → teacher → student) |
| `context`, `problem` | yes | The first two sections                                           |
| `solution`     | no       | An extra section between Problem and Architecture                     |
| `architecture` | yes      | The diagram: `stages` (nodes in the same stage run in parallel), `compact` (the one-line pipeline on the homepage card), `caption` |
| `contribution` | no       | Your own part, under "My contribution". Only for what you can document as yours: it also names you as the author in search-engine data. When it's empty, the page shows `team` instead. |
| `team`         | no       | For team projects, under "Team": the team size and the project's technical scope, worded as team work ("Team project (4 members) focused on…"). Search-engine data then lists you as a contributor. |
| `decisions`    | yes      | Technical decisions, each with a `title` and a `body`                 |
| `results`      | yes      | Outcomes in words. Numbers belong in `metrics`.                       |
| `services`     | no       | Service ids this project proves (`"ai-llm-systems"`, `"ai-automation"`, `"backend-apis"`, `"intelligent-web-apps"`); the project is then listed under those services |
| `seo.description` | yes   | Search-result description, under ~160 characters                     |

Secondary projects have `description` and `highlights` (a short list) instead.

Honesty rules (they apply to the existing projects too):

- Only add a number your CV, a README or the project's documentation backs up,
  and say what it measures in `meaning`.
- Label the project for what it is (`kind` and `badge`): internship,
  academic, personal. Don't present academic work as client work.
- For team work, describe the team; claim only the part you did.
- No invented clients, testimonials, revenue or business results.

### 3. Register it

Import the file in `src/content/projects/index.ts` and add it to the list. The
order of the list is the order on the site (and of "Next case study").

### 4. Optional connections

- **Headline numbers** under the hero: `work.headline.items` in `work.ts`
  (`{ project: "<slug>", metric: "<metric id>" }`). Keep that metric out of the
  project's `cardMetrics`, so it isn't shown twice.
- **Experience** in About: `caseStudy: "<slug>"` on an item in `about.ts`.

### 5. Check it

```bash
npm run typecheck   # every Copy has both languages, every field has the right type
npm run build       # fails with a clear message if a slug or metric id is wrong
npm run dev         # then open /en/work/<slug> and /fr/work/<slug>
```

Everything else is automatic: both pages, the homepage card, "Next case
study", the sitemap, `hreflang`, the share images and the structured data.

---

## Images

### Portrait

- File: `public/achraf-abderrazik.png` (currently 941 × 1672), set by
  `portrait.src` in `src/content/site.ts`. Keep a descriptive file name.
- Portrait orientation, at least 1200 px tall; a dark, low-key photo suits
  the design. JPG, PNG or WebP.
- `portrait.position` (a CSS `object-position`, now `"50% 45%"`) frames your
  face: the second value moves it up or down.
- `portrait.alt` is the description read by screen readers, in both languages.

### Case-study cover (optional)

- Put the file in `public/projects/<slug>/`, for example
  `public/projects/trendradar/cover.jpg`.
- Reference it in the project: `cover: { src: "/projects/trendradar/cover.jpg",
  alt: { en: "…", fr: "…" } }`.
- It is shown at **16:10**, up to 1184 px wide. Export **1600 × 1000 px**
  (at least 1184 × 740). JPG for screenshots and photos, PNG for diagrams;
  aim for under 500 KB. Next.js serves resized AVIF/WebP automatically.
- It must be a file in `public/` (not a link to another site).
- The build doesn't check that the file exists: open the page once to make
  sure the image shows.
- Only use images you are allowed to publish: no confidential client screens
  (Safe Invest's code and data are confidential).

### Generated images

The share images for LinkedIn, X, Slack… (`/en/opengraph-image/card`, one per
case study and per language) are generated from the content. There is nothing
to upload. Their headline is `site.seo.shareHeadline`.

The favicon and app icons are `src/app/icon.svg`, `src/app/apple-icon.png`
(180 × 180) and `src/app/favicon.ico`.

---

## Edit other content

**Services** (`services.ts`): change titles, descriptions and capabilities
directly. To add a fifth service, add its id to `ServiceId` in `types.ts`, then
the service to `services.items`. Projects link themselves to services with
their `services` field.

**About** (`about.ts`): `paragraphs` (inline `**emphasis**` allowed),
`education`, `languages`, `openTo` and `experience`. Each experience item can
link to a case study with `caseStudy: "<slug>"`; `project` names that link
("AeroManager case study").

**Contact details** (`site.ts`):

- `contact.email`: shown in the contact section, footer and menu, used by the
  "send by email" fallback, and the default recipient of the form.
- `contact.bookingUrl`: a scheduling link (Cal.com, Calendly…). Hidden while empty.
- `socials`: LinkedIn and GitHub, with icons. Other labels in the
  `SocialLink` type (X, Upwork, Malt, WhatsApp) work as text links.
- `availability`: the "Available for new projects" pill (`open: false` hides it).
- `location` (shown) and `address` (city and two-letter country code, for
  search engines).

**Contact form** (`contact.ts`): every label, error and message. The topic
`value`s are what your webhook or email receives, so keep them stable; change
only their `label`s. Each inquiry includes the visitor's language (`locale`),
so you know which one to reply in.

**Search engines** (`site.ts` → `seo`): the homepage title and description
for each language, keywords and the share-image headline. Keep your name first
in the title ("Achraf Abderrazik | AI & Data Science Engineer"): other pages are
titled "<page> | Achraf Abderrazik" automatically. `givenName` and `familyName`
(`site.ts`) and the school's `acronym` and `campus` (`about.ts`) go into the
structured data, so keep them identical to how you appear on LinkedIn and
GitHub. Each case study has its own `seo.description`.

**Interface labels** (`ui.ts`): buttons, section names, screen-reader labels,
the 404 page.

---

## Translations

- Translate meaning, not word by word. Keep the French as natural as the
  English.
- Technology and product names stay unchanged: Python, FastAPI, Docker,
  PostgreSQL, Claude API, n8n… Common terms such as fine-tuning, pipeline or
  prompt engineering can stay in English in the French text, as French
  engineers use them.
- Project names stay unless the project has an established French title (the
  French CV calls Distributed Model Serving "Service de Model Serving
  distribué").
- Use the formats of each language for numbers (`0,895`, `98 %`, `179 000`) and
  dates (`Juil. – août 2026`).
- French copy is often 15–30% longer: check new headings on a phone.
- The French site should contain no English sentence or label. A quick check:
  open `/fr` and the French case studies and read every label, button and
  message, including the form's errors.

---

## Check and deploy

Before publishing:

```bash
npm run typecheck
npm run lint
npm run build
npm run start       # production build on http://localhost:3000
```

Then open `/` (it should land on `/en`), `/fr`, a case study in both
languages, switch with **EN · FR**, and an unknown address such as
`/fr/nimporte-quoi` (the French 404).

**Publishing (Netlify):** the site deploys from GitHub. Commit, then push to
`main` (`github.com/AchrafAbderrazik/achraf-abderrazik-portfolio`): Netlify builds and
publishes https://achraf-abderrazik.online automatically. Follow the build
in Netlify → Deploys.

Environment variables (all listed, without values, in `.env.example`):

| Variable | Where it's set | Purpose |
| -------- | -------------- | ------- |
| `NEXT_PUBLIC_SITE_URL` | `netlify.toml` | The public production URL, `https://achraf-abderrazik.online`. Used for canonical URLs, `hreflang`, the sitemap, robots.txt and share links. Read at build time, so a change needs a new deploy. Locally, leave it unset: the site falls back to `http://localhost:3000`. |
| `RESEND_API_KEY` | Netlify → Project configuration → Environment variables | Sends inquiries by email with Resend (configured) |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Netlify environment variables (optional) | Recipient (defaults to the email in `site.ts`) and sender. The sender needs a domain verified in Resend; without one, Resend's test sender only delivers to your Resend account's email. |
| `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET` | Netlify environment variables (optional) | Send inquiries to a webhook (e.g. n8n) instead of Resend |

Keys never go in the repository: `.env*` files are git-ignored, except
`.env.example`, which has no values.

**Domains:** `achraf-abderrazik.online` is the primary domain (Netlify → Domain
management); `www` and `achraf-abderrazik.netlify.app` redirect to it (301). If
the primary domain ever changes, update `NEXT_PUBLIC_SITE_URL` and the redirect
in `netlify.toml`, and push.

Without a webhook or Resend key, the form offers to send the inquiry from the
visitor's email app instead.

---

## When the build fails

| Message                                                    | Fix                                                        |
| ---------------------------------------------------------- | ---------------------------------------------------------- |
| `Property 'fr' is missing in type …`                       | A text has only one language: add the other.               |
| `Project slug "…" must be lowercase words joined by hyphens.` | Rename the slug, e.g. `"Trend Radar"` → `"trend-radar"`.   |
| `Two projects share the slug "…".`                         | Every slug must be unique.                                 |
| `"…" refers to a metric "…" it doesn't define.`            | A `cardMetrics` or `progression` id has a typo, or the metric is missing from `metrics`. |
| `Headline metric "…" isn't defined in "…".`                | Fix the `metric` id in `work.ts`.                          |
| `"…" lists an unknown service "…".`                        | Use one of the ids in `services.ts`.                       |
| `Experience links to an unknown case study "…".`           | Fix `caseStudy` in `about.ts`.                             |
