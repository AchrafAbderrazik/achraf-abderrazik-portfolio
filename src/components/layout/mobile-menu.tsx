"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { easeOutQuint } from "@/lib/motion";

import { ButtonLink } from "../ui/button";
import { Container } from "../ui/container";
import { ArrowUpRightIcon, CloseIcon } from "../ui/icons";
import { LanguageSwitch } from "./language-switch";
import { LogoLockup } from "./logo";
import type { SiteHeaderProps } from "./site-header";
import { ThemePicker } from "./theme-switch";

type MobileMenuProps = SiteHeaderProps & {
  languageHash: string;
  onClose: (options?: { restoreFocus?: boolean }) => void;
};

export function MobileMenu({
  locale,
  name,
  nav,
  contact,
  cta,
  homeHref,
  email,
  socials,
  labels,
  languageHash,
  onClose,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const links = [...nav, contact];

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));

    getFocusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // The inline navigation takes over from 1024px.
    const mediaQuery = window.matchMedia("(min-width: 64rem)");
    const onResize = () => {
      if (mediaQuery.matches) onClose({ restoreFocus: false });
    };
    mediaQuery.addEventListener("change", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      mediaQuery.removeEventListener("change", onResize);
    };
  }, [onClose]);

  const closeAfterNavigation = () => onClose({ restoreFocus: false });

  return (
    <m.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={labels.menu}
      className="fixed inset-0 z-[60] flex flex-col bg-canvas lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3, ease: easeOutQuint }}
    >
      <Container className="flex h-16 shrink-0 items-center justify-between">
        <Link
          href={homeHref}
          onClick={closeAfterNavigation}
          className="-ml-1 flex items-center rounded-lg p-1 text-fg"
        >
          <LogoLockup name={name} nameClassName="text-[0.9375rem]" />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitch locale={locale} label={labels.language} hash={languageHash} />
          <button
            type="button"
            onClick={() => onClose()}
            aria-label={labels.closeMenu}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-tint/5"
          >
            <CloseIcon size={22} />
          </button>
        </div>
      </Container>

      <Container className="flex flex-1 flex-col justify-between overflow-y-auto pt-10 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <nav aria-label={labels.mobileNav}>
          <ul className="flex flex-col">
            {links.map((item, index) => (
              <m.li
                key={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOutQuint, delay: 0.05 + index * 0.04 }}
                className="border-b border-line"
              >
                <Link
                  href={item.href}
                  onClick={closeAfterNavigation}
                  className="flex items-baseline justify-between py-4 text-[2rem] leading-tight font-medium tracking-[-0.03em] text-fg"
                >
                  {item.label}
                  <span className="font-mono text-xs tracking-normal text-fg-subtle tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </m.li>
            ))}
          </ul>
        </nav>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutQuint, delay: 0.3 }}
          className="mt-12 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <p aria-hidden="true" className="font-mono text-eyebrow text-fg-subtle uppercase">
              {labels.theme.label}
            </p>
            <ThemePicker labels={labels.theme} className="w-full" />
          </div>
          <ButtonLink
            href={cta.href}
            size="lg"
            onClick={closeAfterNavigation}
            icon={<ArrowUpRightIcon size={18} />}
            className="w-full"
          >
            {cta.label}
          </ButtonLink>
          {email || socials.length > 0 ? (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-muted">
              {email ? (
                <a href={`mailto:${email}`} className="hover:text-fg">
                  {email}
                </a>
              ) : null}
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="hover:text-fg"
                >
                  {social.label}
                </a>
              ))}
            </div>
          ) : null}
        </m.div>
      </Container>
    </m.div>
  );
}
