import Link from "next/link";

import type { ProfileLink } from "@/content/types";
import { measureGeistMedium } from "@/lib/text-metrics";

import { Container } from "../ui/container";
import { ArrowUpIcon } from "../ui/icons";
import type { HeaderLink } from "./site-header";
import { LogoLockup } from "./logo";

type SiteFooterProps = {
  name: string;
  description: string;
  /** Localized links, ending with Contact. */
  nav: HeaderLink[];
  inquiryHref: string;
  topHref: string;
  email: string | null;
  socials: ProfileLink[];
  labels: { navigate: string; getInTouch: string; inquiry: string; rights: string; backToTop: string; nav: string };
};

export function SiteFooter({ name, description, nav, inquiryHref, topHref, email, socials, labels }: SiteFooterProps) {
  // Rendered at build time: the year updates with each deploy.
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <LogoLockup name={name} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">{description}</p>
        </div>

        <nav aria-label={labels.nav} className="lg:col-span-3">
          <p className="font-mono text-eyebrow text-fg-subtle uppercase">{labels.navigate}</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-fg-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <p className="font-mono text-eyebrow text-fg-subtle uppercase">{labels.getInTouch}</p>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="text-fg transition-colors hover:text-accent">
                  {email}
                </a>
              </li>
            ) : null}
            <li>
              <Link href={inquiryHref} className="text-fg-muted transition-colors hover:text-fg">
                {labels.inquiry}
              </Link>
            </li>
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="text-fg-muted transition-colors hover:text-fg"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-line py-8 text-sm text-fg-subtle sm:flex-row sm:items-center">
          <p>
            © {year} {name}. {labels.rights}
          </p>
          <Link
            href={topHref}
            className="group inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg"
          >
            {labels.backToTop}
            <ArrowUpIcon
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </Container>

      <Wordmark name={name} />
    </footer>
  );
}

/**
 * Oversized name set in SVG so it always spans the full content width,
 * whatever the viewport, and sinks slightly below the page edge.
 */
function Wordmark({ name }: { name: string }) {
  const width = Math.round(measureGeistMedium(name, 200, -12));

  return (
    <div aria-hidden="true" className="pointer-events-none select-none">
      <Container>
        <svg viewBox={`0 40 ${width + 6} 172`} className="block h-auto w-full">
          <text
            x="0"
            y="200"
            fontSize="200"
            letterSpacing="-12"
            textLength={width}
            lengthAdjust="spacingAndGlyphs"
            className="fill-tint/[0.04] font-sans font-medium"
          >
            {name}
          </text>
        </svg>
      </Container>
    </div>
  );
}
