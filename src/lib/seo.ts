import type { Metadata } from "next";

import { defaultLocale, languages, locales } from "@/content/i18n";

import type { Content } from "./content";
import { localizeHref } from "./i18n";

/**
 * Metadata for one page in one language: canonical URL, the same page in the
 * other languages (hreflang, with English as x-default), Open Graph and
 * Twitter cards. Share images come from the opengraph-image files.
 */
export function pageMetadata(
  content: Content,
  page: { path: string; title?: string; description: string; type?: "website" | "article" },
): Metadata {
  const { locale, site } = content;
  const url = localizeHref(locale, page.path);
  const socialTitle = page.title ? `${page.title} | ${site.name}` : site.seo.title;

  return {
    ...(page.title ? { title: page.title } : {}),
    description: page.description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((other) => [other, localizeHref(other, page.path)])),
        "x-default": localizeHref(defaultLocale, page.path),
      },
    },
    openGraph: {
      type: page.type ?? "website",
      url,
      siteName: site.name,
      locale: languages[locale].ogLocale,
      alternateLocale: locales.filter((other) => other !== locale).map((other) => languages[other].ogLocale),
      title: socialTitle,
      description: page.description,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: page.description,
    },
  };
}
