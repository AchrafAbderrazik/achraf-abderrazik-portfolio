import Link from "next/link";

import type { Locale } from "@/content/i18n";
import { cn } from "@/lib/cn";
import { getMetric, type CaseStudy, type Content } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";

import { CompactPipeline } from "../diagrams/compact-pipeline";
import { SharedTitle } from "../motion/page-transition";
import { Reveal, RevealGroup, RevealItem } from "../motion/reveal";
import { Spotlight } from "../motion/spotlight";
import { ProjectBadge, Tag } from "../ui/badge";
import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon } from "../ui/icons";
import { Section, SectionHeading } from "../ui/section";

type WorkProps = {
  locale: Locale;
  work: Content["work"];
  featured: Content["featured"];
  more: Content["more"];
  labels: Content["ui"]["work"];
  githubProfile: string | null;
};

export function Work({ locale, work, featured, more, labels, githubProfile }: WorkProps) {
  return (
    <Section id="work">
      <SectionHeading
        id="work"
        index={work.heading.index}
        eyebrow={work.heading.eyebrow}
        title={work.heading.title}
        intro={work.heading.intro}
      />

      <ol className="mt-16 border-t border-line sm:mt-20 lg:mt-24">
        {featured.map((study, index) => (
          <ProjectRow key={study.slug} locale={locale} study={study} index={index} labels={labels} />
        ))}
      </ol>

      {more.length > 0 ? (
        <AdditionalWork locale={locale} copy={work.more} projects={more} labels={labels} githubProfile={githubProfile} />
      ) : null}
    </Section>
  );
}

function ProjectRow({
  locale,
  study,
  index,
  labels,
}: {
  locale: Locale;
  study: CaseStudy;
  index: number;
  labels: WorkProps["labels"];
}) {
  // 1–2 numbers the headline strip doesn't already show; the full set is in the case study.
  const metrics = study.cardMetrics.map((id) => getMetric(study, id));

  return (
    <Reveal as="li" className="group relative isolate border-b border-line">
      <Spotlight className="-z-10" />

      <div className="grid gap-x-10 gap-y-9 py-10 sm:py-12 lg:grid-cols-12 lg:py-14">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="font-mono text-sm text-fg-subtle tabular-nums transition-colors duration-300 group-hover:text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <ProjectBadge kind={study.kind}>{study.badge}</ProjectBadge>
          </div>

          <h3 className="mt-6 text-h3 font-medium text-fg">
            {/* Stretched link: the whole row opens the case study. */}
            <Link
              href={localizeHref(locale, `/work/${study.slug}`)}
              transitionTypes={["nav-forward"]}
              className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-accent"
            >
              <SharedTitle slug={study.slug}>
                <span className="inline-block">{study.title}</span>
              </SharedTitle>
            </Link>
          </h3>
          <p className="mt-2 font-accent text-[1.375rem] leading-snug text-fg-muted sm:text-2xl">
            {study.subtitle}
          </p>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-fg-muted">
            {study.summary}
          </p>

          <CompactPipeline steps={study.architecture.compact} label={labels.pipeline} className="mt-8" />
        </div>

        <div className="flex flex-col lg:col-span-5 lg:pt-1">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {metrics.map((metric, metricIndex) => (
              // Label first in the DOM (read as "Extraction accuracy, 98%"), value first on screen.
              <div
                key={metric.id}
                className={cn(
                  "flex flex-col bg-canvas p-5 transition-colors duration-500 group-hover:bg-surface sm:p-6",
                  // An odd last metric spans the row, so no empty cell shows.
                  metrics.length % 2 === 1 && metricIndex === metrics.length - 1 ? "col-span-2" : null,
                )}
              >
                <dt className="order-2 mt-3 text-sm leading-snug text-fg">{metric.label}</dt>
                <dd className="order-1 text-[2rem] leading-none font-medium tracking-[-0.035em] text-fg sm:text-[2.375rem]">
                  {metric.value}
                </dd>
                {metric.detail ? (
                  <dd className="order-3 mt-0.5 text-[0.8125rem] leading-snug text-fg-subtle">
                    {metric.detail}
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>

          <div className="mt-6 flex items-center justify-end lg:mt-auto lg:pt-8">
            <span
              aria-hidden="true"
              className="inline-flex shrink-0 items-center gap-3 text-sm font-medium text-fg"
            >
              {labels.readCaseStudy}
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-line-strong transition-[background-color,border-color,color] duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-canvas">
                <ArrowRightIcon
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function AdditionalWork({
  locale,
  copy,
  projects,
  labels,
  githubProfile,
}: {
  locale: Locale;
  copy: Content["work"]["more"];
  projects: Content["more"];
  labels: WorkProps["labels"];
  githubProfile: string | null;
}) {
  return (
    <div className="mt-24 sm:mt-28 lg:mt-32">
      <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-mono text-eyebrow text-fg-subtle uppercase">{copy.eyebrow}</h3>
          <p className="mt-4 max-w-xl text-h4 font-medium text-fg">{copy.title}</p>
        </div>
        {githubProfile ? (
          <a
            href={githubProfile}
            target="_blank"
            rel="me noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <GithubIcon size={16} />
            {copy.allRepositories}
            <ArrowUpRightIcon
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        ) : null}
      </Reveal>

      <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <RevealItem
            as="li"
            key={project.slug}
            className="sm:last:odd:col-span-2 lg:last:odd:col-span-1"
          >
            <AdditionalCard locale={locale} project={project} labels={labels} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

/**
 * A smaller project. Opens its case study when it has one, otherwise its
 * repository in a new tab.
 */
function AdditionalCard({
  locale,
  project,
  labels,
}: {
  locale: Locale;
  project: Content["more"][number];
  labels: WorkProps["labels"];
}) {
  const external = !project.caseStudy;
  const href = project.caseStudy
    ? localizeHref(locale, `/work/${project.slug}`)
    : (project.links?.github ?? project.links?.demo);
  const description = project.caseStudy ? project.summary : project.description;
  const highlights = project.caseStudy ? [] : project.highlights;
  const linkClass =
    "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-accent";

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface/50 p-6 shadow-card transition-[border-color,background-color] duration-300 hover:border-line-strong hover:bg-surface sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <ProjectBadge kind={project.kind}>{project.badge}</ProjectBadge>
        {href ? (
          <ArrowUpRightIcon
            size={18}
            aria-hidden="true"
            className="text-fg-subtle transition-[color,translate] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
          />
        ) : null}
      </div>

      <h4 className="mt-6 text-h4 font-medium text-fg">
        {href && external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {project.title}
            <span className="sr-only"> {labels.githubRepo}</span>
          </a>
        ) : href ? (
          <Link href={href} transitionTypes={["nav-forward"]} className={linkClass}>
            {project.title}
          </Link>
        ) : (
          project.title
        )}
      </h4>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">{description}</p>

      {highlights.length > 0 ? (
        <ul className="mt-6 flex flex-col gap-2 text-sm text-fg-muted">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-line-strong" />
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-7" aria-label={labels.technologies}>
        {project.technologies.map((item) => (
          <li key={item}>
            <Tag>{item}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}
