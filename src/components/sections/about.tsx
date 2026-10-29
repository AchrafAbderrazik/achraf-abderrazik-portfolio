import Link from "next/link";
import type { ReactNode } from "react";

import type { Locale } from "@/content/i18n";
import type { Content } from "@/lib/content";
import { fill, localizeHref } from "@/lib/i18n";

import { Reveal, RevealGroup, RevealItem } from "../motion/reveal";
import { Eyebrow } from "../ui/eyebrow";
import { ArrowRightIcon } from "../ui/icons";
import { Inline } from "../ui/inline";
import { Section } from "../ui/section";

type AboutProps = {
  locale: Locale;
  about: Content["about"];
  location: string;
  readCaseStudy: string;
};

export function About({ locale, about, location, readCaseStudy }: AboutProps) {
  const { education, labels } = about;

  const facts: { label: string; value: ReactNode }[] = [
    { label: labels.basedIn, value: location },
    {
      label: labels.education,
      value: (
        <>
          {`${education.school} (${education.acronym})${education.campus ? `, ${education.campus}` : ""}`}
          <span className="mt-1 block text-fg-muted">{education.degree}</span>
          <span className="mt-1 block text-fg-subtle">
            {education.period} · {education.status}
          </span>
        </>
      ),
    },
    { label: labels.languages, value: about.languages.join(", ") },
    {
      label: labels.openTo,
      value: (
        <>
          {about.openTo[0]}
          {about.openTo.slice(1).map((line) => (
            <span key={line} className="mt-1 block text-fg-muted">
              {line}
            </span>
          ))}
        </>
      ),
    },
  ];

  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <Eyebrow index={about.heading.index}>{about.heading.eyebrow}</Eyebrow>
          <h2 id="about-title" className="mt-6 text-h2 font-medium text-fg">
            <Inline text={about.heading.title} />
          </h2>

          <div className="mt-10 max-w-2xl space-y-6 text-lead text-fg-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <Inline text={paragraph} />
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5 lg:pt-14">
          <dl className="rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={
                  index === 0
                    ? "grid gap-1 pb-4 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
                    : "grid gap-1 border-t border-line py-4 last:pb-0 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
                }
              >
                <dt className="font-mono text-eyebrow text-fg-subtle uppercase sm:pt-1">{fact.label}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mt-20 sm:mt-24 lg:mt-28">
        <Reveal>
          <h3 className="font-mono text-eyebrow text-fg-subtle uppercase">{labels.experience}</h3>
        </Reveal>
        <RevealGroup as="ol" className="mt-6 border-t border-line">
          {about.experience.map((item) => (
            <RevealItem
              as="li"
              key={item.organisation}
              className="group relative grid gap-x-10 gap-y-3 border-b border-line py-8 sm:py-10 lg:grid-cols-12"
            >
              <p className="font-mono text-[0.8125rem] text-fg-muted lg:col-span-3 lg:pt-1.5">
                {item.period}
              </p>
              <div className="lg:col-span-6">
                <h4 className="text-h4 font-medium text-fg">{item.organisation}</h4>
                <p className="mt-1 flex flex-col text-[0.9375rem] text-fg-muted sm:flex-row sm:gap-x-2">
                  <span>{item.role}</span>
                  <span className="text-fg-subtle sm:before:mr-2 sm:before:content-['·']">
                    {item.location}
                  </span>
                </p>
                <p className="mt-4 max-w-xl leading-relaxed text-fg-muted">{item.summary}</p>
              </div>
              <div className="lg:col-span-3 lg:flex lg:items-start lg:justify-end lg:pt-1">
                <Link
                  href={localizeHref(locale, `/work/${item.caseStudy}`)}
                  transitionTypes={["nav-forward"]}
                  className="inline-flex items-center gap-2 text-sm font-medium text-fg after:absolute after:inset-0 after:content-['']"
                >
                  {item.project ? fill(labels.projectCaseStudy, { project: item.project }) : readCaseStudy}
                  <ArrowRightIcon
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
