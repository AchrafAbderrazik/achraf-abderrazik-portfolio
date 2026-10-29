# Achraf Abderrazik — Portfolio

Portfolio of **Achraf Abderrazik — AI & Data Science Engineer** (AI automation,
backend and intelligent systems). Dark, editorial and technical: a cinematic portrait hero,
five case studies with animated architecture diagrams, and a contact flow. In
English and French, at `/en` and `/fr`.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · deployed on Netlify.

**Live:** https://achraf-abderrazik.online

**To change any text, project or image, see [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md).**

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Local development with hot reload (Turbopack) |
| `npm run build`     | Production build                              |
| `npm run start`     | Serve the production build locally            |
| `npm run lint`      | ESLint (Next.js core-web-vitals rules)        |
| `npm run typecheck` | Generate route types and run TypeScript       |
| `npm run brand`     | Regenerate the favicon, app icons and logo files from `src/lib/logo.ts` (Node.js 22.18+) |

Requires Node.js 20.9 or newer.

---

## Before you launch

1. **Portrait:** `public/achraf-abderrazik.png` is in place (941 × 1672). See
   below to change it.
2. **Team projects:** AMAN, TrendRadar and Distributed Model Serving were team
   projects. Their "Team" section describes the team's work, without
   attributing parts of it to you. If you can document your own part, add
   `contribution` (English and French) in the project's file in
   `src/content/projects/`; the section then becomes "My contribution".
3. **Check the details** in `src/content/` match what you'd say in an interview.
   Every number comes from your CV or your GitHub READMEs.
4. **Contact form:** `RESEND_API_KEY` is set in Netlify. Check the sender
   limits in [Contact form](#contact-form).
5. **Domain:** `achraf-abderrazik.online` is the primary domain; see
   [Deploying](#deploying).

### Your portrait

The photo is `public/achraf-abderrazik.png`, set by `portrait.src` in
`src/content/site.ts`. To use another file, put it in `public/` and update
`portrait.src` to match. Keep a descriptive file name (your name), since it
appears in the image's address. The old `/achraf-portrait.png` address
redirects to it (`next.config.ts`).

- Portrait orientation, at least 1200 px tall.
- A dark, low-key photo suits the design.
- If your face isn't framed well, change `portrait.position` in
  `src/content/site.ts` (a CSS `object-position`, currently `50% 45%`). A tall
  photo is shown as a horizontal band, so the second value moves your face up
  or down in the frame.

The file is checked at build time. Until it exists, the hero shows a monogram
plate, plus a reminder that is only visible in `npm run dev`. After adding the
photo, rebuild, or push to GitHub so Netlify rebuilds the site. Next.js serves
the photo as resized AVIF/WebP automatically.

The cinematic look (contrast, vignette, grain, a faint lime light in one
corner, the technical overlay) is applied in CSS, so a new photo gets it too.
The photo itself is never retouched.

---

## Project structure

```
src/
├── content/                    CONTENT: every text, number and project, in English and French
│   ├── site.ts · hero.ts · work.ts · services.ts · about.ts · stack.ts · contact.ts · ui.ts
│   ├── projects/               One file per project; index.ts sets the order
│   ├── i18n.ts                 Languages (en, fr) and the default (en)
│   └── types.ts                The shape of every content file, documented field by field
├── lib/                        LOGIC: content.ts (picks a language, checks cross-references),
│                               i18n.ts (translation helpers, French spacing), seo.ts, og.tsx,
│                               contact.ts (form schema), theme.ts, logo.ts (the logo's geometry),
│                               fonts, site URL
├── components/                 UI: receives single-language data, never imports src/content
│   ├── sections/               Hero, proof strip, work, services, about, stack, contact, 404
│   ├── case-study/             Case-study page layout, reading progress bar
│   ├── diagrams/               Architecture diagram and compact pipeline
│   ├── layout/                 Site shell, header, logo, language and theme switches, mobile menu,
│   │                           footer, skip link
│   ├── motion/                 Reveal, in-view, count-up, parallax, spotlight, page transitions
│   ├── ui/                     Design-system primitives (Button, Section, Badge, Tag, Inline, icons…)
│   └── seo/                    Structured data (JSON-LD)
├── app/                        PAGES
│   ├── [locale]/layout.tsx     Root layout per language: <html lang>, fonts, metadata, site shell
│   ├── [locale]/page.tsx       Homepage: /en, /fr
│   ├── [locale]/work/[slug]/   Case studies: /en/work/<slug>, /fr/work/<slug>, with share images
│   ├── [locale]/opengraph-image.tsx · twitter-image.tsx   Homepage share images, per language
│   ├── global-not-found.tsx    404 page, in the language of the URL
│   ├── api/contact/route.ts    Contact form endpoint (webhook or Resend)
│   ├── globals.css             Design tokens and CSS-only motion
│   └── sitemap.ts · robots.ts · manifest.ts · icon.svg · apple-icon.png · favicon.ico
└── assets/fonts/               Self-hosted fonts (SIL Open Font License)
docs/CONTENT-GUIDE.md           Adding projects, translations, images, contact details, deploying
docs/DESIGN-SYSTEM.md           Tokens, components, the logo and usage rules
docs/brand/                     Logo files: variants, lockups, app icon (generated by npm run brand)
scripts/brand-assets.mjs        Builds the icons and logo files from src/lib/logo.ts
next.config.ts                  Redirects (/ → /en, old links) and security headers
netlify.toml                    Netlify build environment: the public site URL
.env.example                    Every environment variable, without values
```

Every page is generated at build time from the content files, so adding a
project, a service or a translation never needs a component change.

---

## Editing content

Everything is in `src/content/`, written in both languages side by side:

```ts
title: { en: "Selected work", fr: "Sélection de projets" },
```

The full guide, with every project field, image sizes and translation rules,
is [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md). In short:

| To change…                               | Edit                                  |
| ---------------------------------------- | ------------------------------------- |
| Name, email, socials, portrait, SEO text | `src/content/site.ts`                 |
| A project, or add one                    | `src/content/projects/` (+ `index.ts`) |
| Services                                 | `src/content/services.ts`             |
| About, education, experience             | `src/content/about.ts`                |
| Form labels and messages                 | `src/content/contact.ts`              |
| Buttons and interface labels             | `src/content/ui.ts`                   |

**Project labels.** Every project has a `kind` (`real-world`, `internship`,
`academic`, `personal`, `project`) and a `badge`. Real-world and internship
work gets the accent dot; the others get a neutral one. Confidentiality notes
go in `note`.

**Architecture diagrams** are data: each case study has `architecture.stages`,
and nodes in the same stage are drawn in parallel. `architecture.compact` is the
short version shown on the homepage.

**Numbers.** Only add a metric that your CV or project documentation backs up.
Each number has one home, so none is repeated without a reason:

| Where                   | Field                           | Shows                                                |
| ----------------------- | ------------------------------- | ---------------------------------------------------- |
| Homepage headline strip | `headline.items` in `work.ts`   | The strongest few, one per project                   |
| Homepage project card   | `cardMetrics` on a case study   | 1–2 metric ids the strip doesn't already show        |
| Case study page         | `metrics` on a case study       | The full set, each with its `meaning` in plain words |

`progression` shows metrics that only make sense in order (AMAN: XLM-R teacher
→ Darija teacher → DistilBERT student) as connected steps. Diagrams carry one
metric at most, on the node that produces it. `results` are outcomes in words.
A mistyped slug, metric or service id fails the build with a clear message.
`count` makes a number count up on first view; the real value is always in the
HTML.

---

## Languages

| URL                                  | Page                                                  |
| ------------------------------------ | ----------------------------------------------------- |
| `/`                                  | Permanent redirect (308) to `/en`                     |
| `/en`, `/fr`                         | Homepage                                              |
| `/en/work/<slug>`, `/fr/work/<slug>` | Case studies (same slug in both languages)            |
| `/work/<slug>` and the two old slugs | Permanent redirects to the English page               |
| Anything else                        | 404, in French under `/fr/…`, otherwise in English    |

- **English is the default, whatever the browser's language.** No detection,
  no cookie: a URL always shows the same language, which keeps shared links and
  search results predictable.
- **EN · FR** in the header (and in the mobile menu) switches to the same page in
  the other language, and on the homepage to the same section. It is a pair of
  plain links: they work without JavaScript, with the back button, and in a new
  tab.
- Each page is server-rendered in its language, with `<html lang>`, a
  translated title and description, a canonical URL, `hreflang` alternates
  (English as `x-default`), `og:locale` and its own share image.
- French spacing (no-break spaces before `: ; ? ! %`, in `179 000` and `12 h`)
  and number formats are applied automatically.
- Adding a language: add it to `src/content/i18n.ts`; TypeScript then lists
  every text still to translate.

---

## Contact form

The form posts to `/api/contact`, which validates the input (same rules as the
browser, see `src/lib/contact.ts`), drops spam caught by a honeypot field, and
delivers the inquiry in one of two ways. Both are configured in Netlify →
Project configuration → Environment variables, never in the repository.

**Option 1 — Webhook (e.g. n8n).** Set `CONTACT_WEBHOOK_URL` (and optionally
`CONTACT_WEBHOOK_SECRET`). When it's set, it's used instead of Resend. Each
inquiry is POSTed as JSON:

```json
{
  "name": "Alex Martin",
  "email": "alex@company.com",
  "company": "Company",
  "services": ["AI / LLM system", "Backend / API"],
  "message": "…",
  "locale": "fr",
  "source": "portfolio-contact-form",
  "submittedAt": "2026-10-01T12:00:00.000Z"
}
```

`services` values are the same in both languages (the form only translates
their labels), and `locale` says which version of the site the visitor used,
so you know which language to reply in.

In n8n, add a **Webhook** node (POST, respond immediately). Check the
`x-webhook-secret` header with an **IF** node, then route the lead to Gmail, a
CRM, Slack or a Google Sheet.

**Option 2 — Email with Resend (the current setup).** `RESEND_API_KEY` is set
in Netlify's environment variables. Inquiries go to `CONTACT_TO_EMAIL`, or to
the email in `site.ts` when it isn't set, and the subject ends with the
visitor's language, e.g. `(FR)`.

`CONTACT_FROM_EMAIL` must be a sender on a domain verified in Resend. Until you
have one, leave it unset: inquiries are then sent from Resend's test address,
`onboarding@resend.dev`, which only delivers to the email address of your
Resend account. Make sure the recipient is that address. To send from your own
domain instead, verify `achraf-abderrazik.online` in Resend (it gives you DNS
records to add at your DNS provider), then set `CONTACT_FROM_EMAIL` to an
address on it.

If neither is configured, the endpoint answers `503`. The form then offers a
one-click "Send by email instead" fallback, written in the visitor's language,
using the email in `site.ts`.

See `.env.example` for every variable.

---

## Deploying

The site is hosted on **Netlify** and deploys from GitHub:

- **Source:** `github.com/AchrafAbderrazik/achraf-abderrazik-portfolio`, branch `main`.
- **Every push to `main`** builds and publishes the production site at
  https://achraf-abderrazik.online. Follow builds in Netlify → Deploys.
  Netlify detects Next.js and builds it with its Next.js runtime; there are no
  build settings to maintain.
- **`NEXT_PUBLIC_SITE_URL`** is the public production URL, set in
  `netlify.toml` to `https://achraf-abderrazik.online`. It's used for
  canonical URLs, `hreflang`, the sitemap, robots.txt, share images and
  structured data. Next.js reads it at build time, so a change takes effect on
  the next deploy. Values in `netlify.toml` override the same settings in the
  Netlify UI.
- **Secrets** (`RESEND_API_KEY`, and the optional `CONTACT_*` variables) are
  set in Netlify → Project configuration → Environment variables, never in the
  repository. `.env.example` lists every variable, without values.

**Domains** (Netlify → Domain management): `achraf-abderrazik.online` is the
primary domain and the canonical address. `www.achraf-abderrazik.online` and
Netlify's subdomain `achraf-abderrazik.netlify.app` both redirect to it with a
301 (the latter set in `netlify.toml`), so every page has a single address.
HTTPS certificates are issued by Netlify. If the primary
domain ever changes, update `NEXT_PUBLIC_SITE_URL` in `netlify.toml` and push.

**Local development** needs no configuration: without `NEXT_PUBLIC_SITE_URL`,
the site URL falls back to `http://localhost:3000`. To build locally with the
production URL, set it in `.env.local` (git-ignored).

---

## SEO

- Title, description, canonical URL, Open Graph and Twitter cards on every
  page, in its language, with `hreflang` alternates to the other language.
  The homepage title is "Achraf Abderrazik | AI & Data Science Engineer"
  (French: "… | Ingénieur IA & Data Science"); other pages are
  "<page> | Achraf Abderrazik"
- Share images generated at build time, per language: one for the homepage,
  one per case study
- `sitemap.xml` (both languages, with their alternates, and the portrait as
  the homepages' image), `robots.txt` and a web manifest
- JSON-LD, one graph per page, in the page's language: `WebSite` and
  `ProfilePage` with the `Person` (name, role, Marrakech, EMSI, languages,
  LinkedIn/GitHub, services) on the homepage; `WebSite`, `Person`, a
  `CreativeWork` and a `BreadcrumbList` on each case study; none on the 404.
  The person is described once per page, with the same `@id` in both
  languages. Team projects list you as a contributor, not the sole author. No
  ratings, reviews or invented claims.
- LinkedIn and GitHub links use `rel="me"` (they are your own profiles) and a
  descriptive accessible name
- 404 pages answer with a real `404` status and `noindex`
- One `h1` per page, a logical heading outline and descriptive link text

## Motion, accessibility & performance

- **Hero:** a CSS-only load sequence, so it runs before hydration and without
  JavaScript. The portrait starts slightly darker and flatter and settles into
  place while a light sweep lifts it from the top down; the headline rises in
  line by line, then the introduction and calls to action; the technical
  metadata comes last. Only transform, opacity and clip-path animate. On top,
  pointer parallax moves three depth planes (photo, frame, overlay) by a few
  pixels, and the photo drifts gently on scroll.
- **Diagrams:** stages reveal in sequence, then a signal travels through the
  system. It pauses off-screen.
- **Page transitions:** React `<ViewTransition>`. Content slides forward into a
  case study and back out of it, the project title morphs between pages, and the
  header stays fixed.
- **Reduce motion** shows the final state of everything immediately and turns
  off parallax, counters, loops and page slides, including when the setting is
  switched on with the page open.
- Keyboard friendly: skip link, visible focus, accessible mobile menu (focus
  trap, Escape to close), a language switch that names each language in its
  own language and marks the current one, and a contact form that moves focus
  to its first error or to the result once sent.
- Content stays visible without JavaScript. Fonts are self-hosted, and the
  portrait, the page's largest element, is preloaded.

## Design system

See [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md), including the logo's
meaning, construction and files ([`docs/brand/`](docs/brand)).

## Licenses

Geist and Geist Mono (Vercel) and Instrument Serif are licensed under the SIL
Open Font License 1.1 — see `src/assets/fonts/`.
