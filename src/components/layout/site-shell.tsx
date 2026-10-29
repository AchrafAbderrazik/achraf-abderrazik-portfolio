import type { ReactNode } from "react";

import type { Content } from "@/lib/content";
import { fill, localizeHref } from "@/lib/i18n";

import { MotionProvider } from "../motion/motion-provider";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SkipLink } from "./skip-link";

/**
 * Everything around a page: skip link, header, main landmark and footer. Used
 * by the [locale] layout and the global 404. Structured data is added by each
 * page (src/components/seo/json-ld.tsx), so the 404 has none.
 */
export function SiteShell({ content, children }: { content: Content; children: ReactNode }) {
  const { locale, site, ui } = content;
  const href = (path: string) => localizeHref(locale, path);

  const nav = site.navigation.main.map((item) => ({ label: item.label, href: href(item.href) }));
  const contactLink = { label: site.navigation.contact.label, href: href(site.navigation.contact.href) };
  const email = site.contact.email.trim() || null;
  // rel="me" links to your own profiles, each with a descriptive accessible name.
  const socials = site.socials
    .filter((social) => social.href.trim().length > 0)
    .map((social) => ({ ...social, ariaLabel: fill(ui.profileLink, { network: social.label, name: site.name }) }));

  return (
    <>
      <SkipLink label={ui.skipLink} />
      <MotionProvider>
        <SiteHeader
          locale={locale}
          name={site.name}
          nav={nav}
          contact={contactLink}
          cta={{ label: site.navigation.cta.label, href: href(site.navigation.cta.href) }}
          homeHref={href("/#top")}
          email={email}
          socials={socials}
          labels={{
            ...ui.header,
            home: fill(ui.header.home, { name: site.name }),
            language: ui.language.label,
            theme: ui.theme,
          }}
        />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter
          name={site.name}
          description={site.footer.description}
          nav={[...nav, contactLink]}
          inquiryHref={href(site.navigation.contact.href)}
          topHref={href("/#top")}
          email={email}
          socials={socials}
          labels={ui.footer}
        />
      </MotionProvider>
    </>
  );
}
