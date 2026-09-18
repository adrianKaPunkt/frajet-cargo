"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { locales, localeNames, localePath } from "@/i18n/config";
export function Logo() {
  const t = useTranslations("Common");
  return (
    <a className="brand" href="#top" aria-label={t("home")}>
      <img src="/frajet-logo.png" alt="FRAJET" width="185" height="32" />
      <span>CARGO</span>
    </a>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Header");
  const c = useTranslations("Common");
  const locale = useLocale();
  return (
    <header className="header">
      <div className="shell header-inner">
        <Logo />
        <nav
          id="main-navigation"
          aria-label={t("navigation")}
          className={open ? "navigation is-open" : "navigation"}
        >
          <a onClick={() => setOpen(false)} href="#corridor">
            {t("corridor")}
          </a>
          <a onClick={() => setOpen(false)} href="#aircraft">
            {t("aircraft")}
          </a>
          <a onClick={() => setOpen(false)} href="#approach">
            {t("approach")}
          </a>
          <a
            onClick={() => setOpen(false)}
            href="#enquiry"
            className="button button-small"
          >
            {t("enquiry")} <ArrowUpRight size={16} />
          </a>
        </nav>
        <div className="header-controls">
          <nav className="language-switch" aria-label={c("language")}>
            {locales.map((lang) => (
              <a
                key={lang}
                href={localePath(lang)}
                hrefLang={lang}
                lang={lang}
                dir={lang === "fa-AF" ? "rtl" : "ltr"}
                aria-label={localeNames[lang]}
                aria-current={locale === lang ? "page" : undefined}
                onClick={(e) => {
                  if (locale === lang) {
                    e.preventDefault();
                    return;
                  }
                  window.dispatchEvent(new Event("frajet:locale-change"));
                  e.currentTarget.href =
                    localePath(lang) + window.location.hash;
                }}
              >
                {lang === "fa-AF" ? localeNames[lang] : lang.toUpperCase()}
              </a>
            ))}
          </nav>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? t("close") : t("open")}
            aria-expanded={open}
            aria-controls="main-navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
