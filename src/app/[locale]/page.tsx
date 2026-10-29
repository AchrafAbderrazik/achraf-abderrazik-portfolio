import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/page-transition";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Proof } from "@/components/sections/proof";
import { Services } from "@/components/sections/services";
import { Stack } from "@/components/sections/stack";
import { Work } from "@/components/sections/work";
import { ProfilePageJsonLd } from "@/components/seo/json-ld";
import { defaultLocale } from "@/content/i18n";
import { getContent, getGithubProfile } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { hasPortrait } from "@/lib/portrait";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const content = getContent(isLocale(locale) ? locale : defaultLocale);
  return pageMetadata(content, { path: "/", description: content.site.seo.description });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: param } = await params;
  const locale = isLocale(param) ? param : defaultLocale;
  const content = getContent(locale);

  return (
    <PageTransition>
      <Hero
        locale={locale}
        site={content.site}
        hero={content.hero}
        labels={content.ui.hero}
        photo={hasPortrait()}
      />
      <Proof locale={locale} headline={content.work.headline} caseStudies={content.caseStudies} />
      <Work
        locale={locale}
        work={content.work}
        featured={content.featured}
        more={content.more}
        labels={content.ui.work}
        githubProfile={getGithubProfile()}
      />
      <Services locale={locale} services={content.services} related={content.related} />
      <About
        locale={locale}
        about={content.about}
        location={content.site.location}
        readCaseStudy={content.ui.work.readCaseStudy}
      />
      <Stack stack={content.stack} />
      <Contact
        locale={locale}
        contact={content.contact}
        site={content.site}
        profileLabel={content.ui.profileLink}
      />
      <ProfilePageJsonLd content={content} />
    </PageTransition>
  );
}
