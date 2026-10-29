import type { MetadataRoute } from "next";

import { defaultLocale, locales } from "@/content/i18n";
import { getContent } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";
import { hasPortrait } from "@/lib/portrait";
import { absoluteUrl } from "@/lib/site-url";

/**
 * Every page in every language, each listing its translations (hreflang).
 * The homepages also list the portrait (an image sitemap), so image search can
 * connect the photo to the name.
 * No <lastmod>: the only date available is the build time, which changes on
 * every deploy, and Google ignores lastmod values that aren't accurate.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const { site, caseStudies } = getContent(defaultLocale);
  const paths = ["/", ...caseStudies.map((study) => `/work/${study.slug}`)];
  const portrait = hasPortrait() ? [absoluteUrl(site.portrait.src)] : [];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizeHref(locale, path)),
      changeFrequency: path === "/" ? ("monthly" as const) : ("yearly" as const),
      priority: path === "/" ? 1 : 0.8,
      ...(path === "/" && portrait.length > 0 ? { images: portrait } : {}),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((other) => [other, absoluteUrl(localizeHref(other, path))])),
          "x-default": absoluteUrl(localizeHref(defaultLocale, path)),
        },
      },
    })),
  );
}
