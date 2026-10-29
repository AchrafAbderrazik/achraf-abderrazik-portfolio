import type { Locale } from "@/content/i18n";
import type { Content } from "@/lib/content";
import { fill } from "@/lib/i18n";

import { Reveal } from "../motion/reveal";
import { ButtonLink } from "../ui/button";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/eyebrow";
import { ArrowUpRightIcon, CalendarIcon, GithubIcon, LinkedinIcon } from "../ui/icons";
import { Inline } from "../ui/inline";
import { ContactForm } from "./contact-form";
import { CopyEmail } from "./copy-email";

const socialIcons = {
  LinkedIn: LinkedinIcon,
  GitHub: GithubIcon,
} as const;

type ContactProps = {
  locale: Locale;
  contact: Content["contact"];
  site: Content["site"];
  /** Accessible name of the profile links: `{network}` and `{name}` (ui.profileLink). */
  profileLabel: string;
};

export function Contact({ locale, contact, site, profileLabel }: ContactProps) {
  const email = site.contact.email.trim() || null;
  const bookingUrl = site.contact.bookingUrl.trim() || null;
  const socials = site.socials.filter((social) => social.href.trim().length > 0);
  const hasDirectChannels = Boolean(email || bookingUrl || socials.length > 0);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-card">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_70%_at_0%_0%,black,transparent)]" />
          </div>

          <div className="grid gap-12 p-5 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14 xl:p-16">
            <div className="flex flex-col px-1 pt-3 sm:px-0 sm:pt-0 lg:col-span-5">
              <Eyebrow index={contact.heading.index}>{contact.heading.eyebrow}</Eyebrow>
              <h2 id="contact-title" className="mt-6 text-h2 font-medium text-fg">
                <Inline text={contact.heading.title} />
              </h2>
              <p className="mt-6 max-w-md text-lead text-fg-muted">{contact.heading.intro}</p>

              <div className="mt-10 lg:mb-10">
                <h3 className="font-mono text-eyebrow text-fg-subtle uppercase">{contact.nextSteps.title}</h3>
                <ol className="mt-5 flex flex-col gap-4">
                  {contact.nextSteps.steps.map((step, index) => (
                    <li key={step} className="flex gap-4 text-[0.9375rem] leading-relaxed text-fg-muted">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-[0.6875rem] text-fg tabular-nums">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {hasDirectChannels ? (
                <div className="mt-10 border-t border-line pt-8 lg:mt-auto">
                  <h3 className="font-mono text-eyebrow text-fg-subtle uppercase">{contact.direct.title}</h3>
                  <div className="mt-5 flex flex-col gap-5">
                    {email ? (
                      <CopyEmail
                        email={email}
                        labels={{
                          copy: contact.direct.copy,
                          copied: contact.direct.copied,
                          copiedStatus: contact.direct.copiedStatus,
                        }}
                      />
                    ) : null}
                    {bookingUrl || socials.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-3">
                        {bookingUrl ? (
                          <ButtonLink
                            href={bookingUrl}
                            variant="secondary"
                            size="sm"
                            icon={<CalendarIcon size={15} />}
                          >
                            {contact.direct.bookCall}
                          </ButtonLink>
                        ) : null}
                        {socials.map((social) => {
                          const Icon =
                            social.label in socialIcons
                              ? socialIcons[social.label as keyof typeof socialIcons]
                              : ArrowUpRightIcon;
                          return (
                            <a
                              key={social.label}
                              href={social.href}
                              target="_blank"
                              rel="me noopener noreferrer"
                              aria-label={fill(profileLabel, { network: social.label, name: site.name })}
                              className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg-muted transition-colors hover:border-tint/25 hover:text-fg"
                            >
                              <Icon size={15} />
                              {social.label}
                            </a>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="lg:col-span-7">
              <ContactForm locale={locale} email={email} copy={contact.form} />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
