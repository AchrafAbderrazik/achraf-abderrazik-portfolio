import { connection } from "next/server";
import type { ReactNode } from "react";

import { PathLocale } from "@/components/layout/path-locale";
import { SiteShell } from "@/components/layout/site-shell";
import { ThemeScript } from "@/components/layout/theme-script";
import { NotFoundView } from "@/components/sections/not-found-view";
import { locales, type Locale } from "@/content/i18n";
import { cn } from "@/lib/cn";
import { getContent } from "@/lib/content";
import { fontMono, fontSans, fontSerif } from "@/lib/fonts";

import "./globals.css";

/*
 * The 404 page for every unknown URL: /de, /fr/work/unknown, /en/anything.
 * Next renders it outside the [locale] layout, so it brings its own <html>,
 * styles and fonts. It is rendered on request so it can follow the URL's
 * language: French for /fr/..., English for everything else.
 */

function NotFoundDocument({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <html
      lang={locale}
      className={cn(fontSans.variable, fontMono.variable, fontSerif.variable)}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <title>{`${content.ui.notFound.metaTitle} | ${content.site.name}`}</title>
        <SiteShell content={content}>
          <NotFoundView content={content} />
        </SiteShell>
      </body>
    </html>
  );
}

export default async function GlobalNotFound() {
  await connection();
  const pages = Object.fromEntries(
    locales.map((locale) => [locale, <NotFoundDocument key={locale} locale={locale} />]),
  ) as Record<Locale, ReactNode>;

  return <PathLocale pages={pages} />;
}
