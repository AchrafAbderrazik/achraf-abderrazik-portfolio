import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import type { Locale } from "@/content/i18n";
import { cn } from "@/lib/cn";
import { getMetric, type CaseStudy, type Content, type ResolvedMetric } from "@/lib/content";
import { fill, localizeHref } from "@/lib/i18n";

import { ArchitectureDiagram } from "../diagrams/architecture-diagram";
import { CountUp } from "../motion/count-up";
import { InView } from "../motion/in-view";
import { SharedTitle } from "../motion/page-transition";
import { Reveal, RevealGroup, RevealItem } from "../motion/reveal";
import { ProjectBadge, Tag } from "../ui/badge";
import { ButtonLink } from "../ui/button";
import { Container } from "../ui/container";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  GithubIcon,
  LockIcon,
} from "../ui/icons";
import { ReadingProgress } from "./reading-progress";

type Labels = Content["ui"]["caseStudy"];

type CaseStudyViewProps = {
  content: Content;
  study: CaseStudy;
  next: CaseStudy;
  githubProfile: string | null;
};

/**
 * A case study page. Sections appear in a fixed order and are numbered as they
 * render, so optional ones (solution, links) slot in without renumbering by hand.
 */
export function CaseStudyView({ content, study, next, githubProfile }: CaseStudyViewProps) {
  const { locale, ui, site } = content;
  const labels = ui.caseStudy;
  const position = content.caseStudies.findIndex((item) => item.slug === study.slug) + 1;
  const hasLinks = Boolean(study.links?.github || study.links?.demo);

  const sections: { key: string; title: string; wide?: boolean; body: ReactNode }[] = [
    { key: "context", title: labels.sections.context, body: <Prose>{study.context}</Prose> },
    { key: "problem", title: labels.sections.problem, body: <Prose>{study.problem}</Prose> },
    ...(study.solution
      ? [{ key: "solution", title: labels.sections.solution, body: <Prose>{study.solution}</Prose> }]
      : []),
    {
      key: "architecture",
      title: labels.sections.architecture,
      wide: true,
      body: (
        <ArchitectureDiagram
          architecture={study.architecture}
          label={fill(labels.architectureLabel, { title: study.title })}
        />
      ),
    },
    {
      key: study.contribution ? "contribution" : "team",
      title: study.contribution ? labels.sections.contribution : labels.sections.team,
      body: <Prose>{study.contribution ?? study.team}</Prose>,
    },
    { key: "decisions", title: labels.sections.decisions, body: <Decisions study={study} /> },
    { key: "results", title: labels.sections.results, body: <Results results={study.results} /> },
    {
      key: "technologies",
      title: labels.sections.technologies,
      body: (
        <Reveal as="ul" className="flex flex-wrap gap-2" aria-label={ui.work.technologies}>
          {study.technologies.map((item) => (
            <li key={item}>
              <Tag className="h-9 px-3.5 text-[0.8125rem] text-fg">{item}</Tag>
            </li>
          ))}
        </Reveal>
      ),
    },
    {
      key: "links",
      title: study.links?.demo
        ? labels.sections.links
        : hasLinks
          ? labels.sections.github
          : labels.sections.source,
      body: <CaseLinks study={study} labels={labels} githubProfile={githubProfile} />,
    },
  ];

  return (
    <>
      <article>
        <ReadingProgress />
        <CaseHeader
          locale={locale}
          study={study}
          labels={labels}
          position={position}
          total={content.caseStudies.length}
        />
        <MetricsPanel locale={locale} study={study} label={labels.keyFigures} />

        {sections.map((section, index) => (
          <CaseSection
            key={section.key}
            id={section.key}
            index={String(index + 1).padStart(2, "0")}
            title={section.title}
            wide={section.wide}
          >
            {section.body}
          </CaseSection>
        ))}

        <NextCaseStudy
          locale={locale}
          study={next}
          labels={labels}
          cta={{ label: site.navigation.cta.label, href: localizeHref(locale, site.navigation.cta.href) }}
        />
      </article>
    </>
  );
}

/* ---- Header ------------------------------------------------------------------ */

function CaseHeader({
  locale,
  study,
  labels,
  position,
  total,
}: {
  locale: Locale;
  study: CaseStudy;
  labels: Labels;
  position: number;
  total: number;
}) {
  return (
    <header className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-40 lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_70%_70%_at_20%_0%,black,transparent)]"
      />
      <Container>
        <Link
          href={localizeHref(locale, "/#work")}
          transitionTypes={["nav-back"]}
          className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeftIcon
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          {labels.allWork}
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 lg:mt-14">
          <ProjectBadge kind={study.kind}>{study.badge}</ProjectBadge>
          <span className="font-mono text-eyebrow text-fg-subtle uppercase tabular-nums">
            {fill(labels.position, {
              n: String(position).padStart(2, "0"),
              total: String(total).padStart(2, "0"),
            })}
          </span>
        </div>

        <h1 className="mt-7 max-w-5xl text-[clamp(2.75rem,1.3rem+4.8vw,5.75rem)] leading-[0.98] font-medium tracking-[-0.045em] text-fg">
          <SharedTitle slug={study.slug}>
            <span className="block">{study.title}</span>
          </SharedTitle>
        </h1>
        <p className="mt-4 font-accent text-[clamp(1.75rem,1.25rem+1.8vw,2.75rem)] leading-tight text-fg-muted">
          {study.subtitle}
        </p>

        <p className="mt-10 max-w-3xl text-lead text-fg">{study.summary}</p>
        {study.description ? (
          <p className="mt-5 max-w-3xl text-[1.0625rem] leading-relaxed text-fg-muted">{study.description}</p>
        ) : null}

        <dl className="mt-14 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {study.facts.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-eyebrow text-fg-subtle uppercase">{item.label}</dt>
              <dd className="mt-2 text-[0.9375rem] leading-snug text-fg">{item.value}</dd>
            </div>
          ))}
        </dl>

        {study.note ? (
          <p className="mt-10 flex max-w-3xl gap-3 rounded-xl border border-line bg-surface/60 px-4 py-3.5 text-sm leading-relaxed text-fg-muted">
            <LockIcon size={16} className="mt-0.5 shrink-0 text-fg-subtle" />
            {study.note}
          </p>
        ) : null}

        {study.cover ? (
          <div className="relative mt-14 aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface">
            <Image
              src={study.cover.src}
              alt={study.cover.alt}
              fill
              sizes="(min-width: 1280px) 1184px, calc(100vw - 2.5rem)"
              className="object-cover"
            />
          </div>
        ) : null}
      </Container>
    </header>
  );
}

/**
 * The full documented metric set, each number with what it means. Metrics in
 * a progression (one model after another) are shown first, as connected steps.
 */
function MetricsPanel({ locale, study, label }: { locale: Locale; study: CaseStudy; label: string }) {
  const { progression } = study;
  const steps = new Set(progression?.steps);
  const metrics = study.metrics.filter((metric) => !steps.has(metric.id));

  return (
    <section aria-label={label} className="pb-10 sm:pb-14 lg:pb-16">
      <Container className="flex flex-col gap-4">
        {progression ? <Progression locale={locale} study={study} /> : null}
        {metrics.length > 0 ? <MetricGrid locale={locale} metrics={metrics} /> : null}
      </Container>
    </section>
  );
}

const metricValue = "leading-none font-medium tracking-[-0.035em] text-fg";

function MetricGrid({ locale, metrics }: { locale: Locale; metrics: ResolvedMetric[] }) {
  const count = metrics.length;
  return (
    <RevealGroup
      as="dl"
      className={cn(
        "grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2",
        count === 3 ? "lg:grid-cols-3" : count >= 4 ? "lg:grid-cols-4" : null,
      )}
    >
      {metrics.map((metric, index) => (
        // Number beside its explanation on phones, above it from `sm`.
        // Label first in the DOM, so it reads "ROC-AUC, 0.921, how well…".
        <RevealItem
          key={metric.id}
          className={cn(
            "grid grid-cols-[6.5rem_1fr] content-start gap-x-4 bg-canvas p-5 sm:grid-cols-1 sm:p-7",
            count % 2 === 1 && index === count - 1 ? "sm:col-span-2 lg:col-span-1" : null,
          )}
        >
          <dt className="col-start-2 row-start-1 text-[0.9375rem] leading-snug text-fg sm:col-start-1 sm:row-start-2 sm:mt-4">
            {metric.label}
          </dt>
          <dd className="col-start-1 row-span-2 row-start-1 sm:row-span-1">
            <CountUp
              value={metric.value}
              count={metric.count}
              locale={locale}
              className={cn("text-[clamp(2rem,1.55rem+1.9vw,3.5rem)]", metricValue)}
            />
          </dd>
          <dd className="col-start-2 row-start-2 mt-1.5 max-w-[24rem] text-[0.8125rem] leading-relaxed text-fg-muted sm:col-start-1 sm:row-start-3 sm:mt-2">
            {metric.meaning}
          </dd>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/**
 * Steps that only make sense in order, e.g. teacher → teacher → student.
 * Each meter shares one scale, so the steps compare at a glance; the last
 * step is the result and carries the accent.
 */
function Progression({ locale, study }: { locale: Locale; study: CaseStudy }) {
  const progression = study.progression;
  if (!progression) return null;
  const steps = progression.steps.map((id) => getMetric(study, id));

  return (
    <InView amount={0.3} className="overflow-hidden rounded-2xl border border-line">
      <div className="flex flex-col gap-1.5 border-b border-line bg-surface/60 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10 sm:px-7">
        <h2 className="shrink-0 font-mono text-eyebrow text-fg-subtle uppercase">{progression.title}</h2>
        <p className="max-w-xl text-[0.8125rem] leading-snug text-balance text-fg-muted sm:text-right">
          {progression.note}
        </p>
      </div>

      <ol className="grid gap-px bg-line sm:grid-cols-3">
        {steps.map((metric, index) => {
          const last = index === steps.length - 1;
          const share = Math.min((metric.count?.to ?? Number.parseFloat(metric.value)) / progression.max, 1);
          return (
            <li
              key={metric.id}
              // Opaque tint: the grid's hairline colour must not show through the tile.
              className={cn(
                "relative flex flex-col p-5 sm:p-7",
                last ? "bg-[color-mix(in_oklab,var(--color-canvas),var(--color-accent)_4%)]" : "bg-canvas",
              )}
              style={{ "--i": index } as CSSProperties}
            >
              <span className="font-mono text-[0.6875rem] text-fg-subtle tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <CountUp
                value={metric.value}
                count={metric.count}
                locale={locale}
                className={cn("mt-5 block text-[clamp(2.25rem,1.7rem+1.8vw,3.5rem)] sm:mt-6", metricValue)}
              />
              <span className="mt-4 text-[0.9375rem] leading-snug text-fg">{metric.label}</span>
              <span className="mt-1.5 text-[0.8125rem] leading-relaxed text-fg-muted">{metric.meaning}</span>

              <span aria-hidden="true" className="mt-auto block pt-7">
                <span className={cn("block h-1 overflow-hidden rounded-full", last ? "bg-accent/15" : "bg-tint/[0.07]")}>
                  <span
                    className={cn("meter-fill block h-full rounded-full", last ? "bg-accent" : "bg-fg-subtle")}
                    style={{ width: `${(share * 100).toFixed(1)}%` }}
                  />
                </span>
              </span>

              {last ? null : (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 left-5 z-10 flex size-6 items-center justify-center rounded-full border border-line-strong bg-canvas text-fg-subtle sm:top-[5rem] sm:right-0 sm:bottom-auto sm:left-auto sm:translate-x-1/2"
                >
                  <ArrowDownIcon size={12} className="sm:hidden" />
                  <ArrowRightIcon size={12} className="hidden sm:block" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </InView>
  );
}

/* ---- Sections ---------------------------------------------------------------- */

function CaseSection({
  id,
  index,
  title,
  wide = false,
  children,
}: {
  id: string;
  index: string;
  title: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="py-6 sm:py-8">
      <Container>
        <div className="border-t border-line pt-8 pb-4 lg:pt-10">
          <div className={cn("grid gap-8 lg:gap-10", wide ? null : "lg:grid-cols-12")}>
            <Reveal className={wide ? undefined : "lg:col-span-4"}>
              <h2
                id={id}
                className="flex items-center gap-3 font-mono text-eyebrow text-fg-subtle uppercase"
              >
                {/* Spaces keep "01 Context" apart in the heading's text; flex doesn't render them. */}
                <span className="text-fg-muted tabular-nums">{index}</span>{" "}
                <span aria-hidden="true" className="h-px w-8 bg-line-strong" /> {title}
              </h2>
            </Reveal>
            <div className={wide ? undefined : "lg:col-span-8"}>{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className="max-w-3xl text-[clamp(1.1875rem,1.08rem+0.45vw,1.5rem)] leading-[1.5] tracking-[-0.012em] text-fg">
        {children}
      </p>
    </Reveal>
  );
}

function Decisions({ study }: { study: CaseStudy }) {
  return (
    <RevealGroup as="ul" className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
      {study.decisions.map((decision, index) => (
        <RevealItem as="li" key={decision.title} className="bg-canvas p-6 sm:p-7">
          <span className="font-mono text-[0.6875rem] text-fg-subtle tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-h4 font-medium text-fg">{decision.title}</h3>
          <p className="mt-3 leading-relaxed text-fg-muted">{decision.body}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function Results({ results }: { results: string[] }) {
  return (
    <RevealGroup as="ul" className="border-t border-line">
      {results.map((result) => (
        <RevealItem
          as="li"
          key={result}
          className="flex gap-4 border-b border-line py-4 text-[1.0625rem] leading-relaxed text-fg"
        >
          <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent">
            <CheckIcon size={12} />
          </span>
          {result}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function CaseLinks({
  study,
  labels,
  githubProfile,
}: {
  study: CaseStudy;
  labels: Labels;
  githubProfile: string | null;
}) {
  const github = study.links?.github;
  const demo = study.links?.demo;

  if (github || demo) {
    return (
      <Reveal className="flex flex-wrap gap-3">
        {github ? (
          <ButtonLink href={github} variant="secondary" size="lg" icon={<ArrowUpRightIcon size={18} />}>
            <span className="inline-flex items-center gap-2.5">
              <GithubIcon size={18} />
              {labels.viewOnGithub}
            </span>
          </ButtonLink>
        ) : null}
        {demo ? (
          <ButtonLink href={demo} variant="secondary" size="lg" icon={<ArrowUpRightIcon size={18} />}>
            {labels.viewDemo}
          </ButtonLink>
        ) : null}
      </Reveal>
    );
  }

  return (
    <Reveal className="max-w-3xl">
      <p className="text-[1.0625rem] leading-relaxed text-fg-muted">
        {study.note ? labels.sourcePrivate : labels.sourceNone}
        {githubProfile ? (
          <>
            {" "}
            {labels.otherProjects}{" "}
            <a
              href={githubProfile}
              target="_blank"
              rel="me noopener noreferrer"
              className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg"
            >
              GitHub
            </a>
            .
          </>
        ) : null}
      </p>
    </Reveal>
  );
}

function NextCaseStudy({
  locale,
  study,
  labels,
  cta,
}: {
  locale: Locale;
  study: CaseStudy;
  labels: Labels;
  cta: { label: string; href: string };
}) {
  return (
    <section aria-label={labels.next} className="pt-16 pb-24 sm:pt-20 sm:pb-28 lg:pb-32">
      <Container>
        <Link
          href={localizeHref(locale, `/work/${study.slug}`)}
          transitionTypes={["nav-forward"]}
          className="group relative block overflow-hidden rounded-[1.75rem] border border-line bg-surface p-7 shadow-card transition-colors duration-500 hover:border-line-strong sm:p-10 lg:p-14"
        >
          <span className="font-mono text-eyebrow text-fg-subtle uppercase">{labels.next}</span>
          <span className="mt-6 flex items-end justify-between gap-6">
            <span>
              <span className="block text-h2 font-medium text-fg">{study.title}</span>
              <span className="mt-2 block font-accent text-2xl text-fg-muted sm:text-3xl">
                {study.subtitle}
              </span>
            </span>
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-line-strong transition-[background-color,border-color,color] duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-canvas sm:size-14">
              <ArrowRightIcon
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </span>
        </Link>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-fg-muted">{labels.similar}</p>
          <ButtonLink href={cta.href} icon={<ArrowUpRightIcon size={17} />}>
            {cta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
