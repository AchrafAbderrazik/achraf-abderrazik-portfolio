"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Locale } from "@/content/i18n";
import type { ProfileLink } from "@/content/types";
import { cn } from "@/lib/cn";

import { ButtonLink } from "../ui/button";
import { Container } from "../ui/container";
import { ArrowUpRightIcon, MenuIcon } from "../ui/icons";
import { LanguageSwitch } from "./language-switch";
import { LogoLockup } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ThemeSwitch, type ThemeLabels } from "./theme-switch";

/** Sections observed for the active-link indicator. */
const observedSections = ["top", "work", "services", "about", "stack", "contact"];

export type HeaderLink = { label: string; href: string };

export type SiteHeaderProps = {
  locale: Locale;
  name: string;
  /** Localized links: "/en#work"… */
  nav: HeaderLink[];
  contact: HeaderLink;
  cta: HeaderLink;
  homeHref: string;
  email: string | null;
  socials: ProfileLink[];
  labels: {
    home: string;
    mainNav: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    mobileNav: string;
    language: string;
    theme: ThemeLabels;
  };
};

export function SiteHeader(props: SiteHeaderProps) {
  const { locale, name, nav, cta, homeHref, labels } = props;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // These ids only mean homepage sections on the homepage: case studies have
    // their own (their "Stack" section, for one).
    if (!isHome) return;

    const elements = observedSections
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isHome]);

  // Inside a case study, "Work" is the current section.
  const currentSection = isHome
    ? activeSection
    : pathname.startsWith(`/${locale}/work/`)
      ? "work"
      : null;

  // Switching language on the homepage keeps the visitor on the same section.
  const languageHash = isHome && activeSection && activeSection !== "top" ? `#${activeSection}` : "";

  const closeMenu = useCallback((options?: { restoreFocus?: boolean }) => {
    setMenuOpen(false);
    if (options?.restoreFocus !== false) {
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ease-out-quint",
          scrolled
            ? "border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link
            href={homeHref}
            className="group -ml-1 flex items-center rounded-lg p-1 text-fg"
            aria-label={labels.home}
          >
            <LogoLockup
              name={name}
              animated
              markClassName="transition-colors duration-300 group-hover:border-tint/25"
              nameClassName="text-[0.9375rem]"
            />
          </Link>

          {/* Inline from 1024px: below that, it lives in the menu (with room for the language switch). */}
          <nav aria-label={labels.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const isActive = currentSection === item.href.split("#")[1];
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative inline-flex items-center rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                        isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-[opacity,transform] duration-300",
                          isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitch
              locale={locale}
              label={labels.language}
              hash={languageHash}
              className="max-[359px]:hidden"
            />
            {/* From 1024px, like the inline navigation; below, it's in the menu. */}
            <ThemeSwitch labels={labels.theme} className="hidden lg:block" />
            <ButtonLink
              href={cta.href}
              size="sm"
              className="hidden sm:inline-flex"
              icon={<ArrowUpRightIcon size={16} />}
            >
              {cta.label}
            </ButtonLink>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={labels.openMenu}
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-tint/5 lg:hidden"
            >
              <MenuIcon size={22} />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <MobileMenu key="mobile-menu" {...props} languageHash={languageHash} onClose={closeMenu} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
