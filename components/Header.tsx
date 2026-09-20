"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { locales, localeNames, localePath } from "@/i18n/config";
import { Logo } from "./Logo";
export function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("Header");
  const c = useTranslations("Common");
  const locale = useLocale();
  return (
    <header className="sticky top-0 z-30 border-b border-solid border-[#ffffff13] bg-navy">
      <div className="mx-auto w-[min(1280px,calc(100%_-_112px))] tablet:w-[calc(100%_-_64px)] mobile:w-[calc(100%_-_40px)] flex h-[90px] items-center justify-between nav-wrap:h-auto nav-wrap:min-h-[104px] nav-wrap:flex-wrap nav-wrap:py-[10px] mobile:h-[74px]">
        <Logo variant="dark" />
        <nav
          id="main-navigation"
          aria-label={t("navigation")}
          className={`flex items-center gap-[34px] text-[15px] tablet:gap-[22px] de:gap-[22px] nav-tablet:gap-[13px] nav-tablet:de:gap-[13px] nav-tablet:text-[14px] nav-wrap:order-3 nav-wrap:mt-2 nav-wrap:w-full nav-wrap:justify-between mobile:absolute mobile:inset-x-0 mobile:top-[74px] mobile:items-stretch mobile:border-b mobile:border-solid mobile:border-line mobile:bg-navy mobile:px-5 mobile:py-[25px] mobile:[&>a]:p-[10px] ${open ? "mobile:flex mobile:flex-col" : "mobile:hidden"}`}
        >
          <a className="hover:text-bright" onClick={() => setOpen(false)} href="#corridor">
            {t("corridor")}
          </a>
          <a className="hover:text-bright" onClick={() => setOpen(false)} href="#aircraft">
            {t("aircraft")}
          </a>
          <a className="hover:text-bright" onClick={() => setOpen(false)} href="#approach">
            {t("approach")}
          </a>
          <a
            onClick={() => setOpen(false)}
            href="#enquiry"
            className="inline-flex items-center justify-center gap-[18px] rounded-[3px] border border-solid border-blue bg-blue px-[18px] py-[11px] text-[14px] leading-[1.4] font-medium text-white hover:border-[#447ed0] hover:bg-[#447ed0] nav-tablet:gap-[10px] nav-tablet:px-3 nav-tablet:py-[10px]"
          >
            {t("enquiry")} <ArrowUpRight size={16} />
          </a>
        </nav>
        <div className="ms-[22px] flex items-center gap-3 nav-tablet:ms-3 nav-wrap:ms-auto mobile:ms-auto mobile:gap-[10px] tiny:gap-[3px]">
          <nav className="flex shrink-0 items-center gap-[3px] border-s border-solid border-line ps-[18px] font-mono text-[12px] nav-tablet:ps-[9px] mobile:border-s-0 mobile:ps-0 mobile:text-[11px]" aria-label={c("language")}>
            {locales.map((lang) => (
              <Link
                className="flex min-h-11 min-w-8 items-center justify-center border-b-2 border-solid border-transparent text-muted aria-[current=page]:border-bright aria-[current=page]:text-white hover:text-bright mobile:min-w-[30px] tiny:min-w-7"
                key={lang}
                href={localePath(lang)}
                hrefLang={lang}
                lang={lang}
                dir={lang === "fa-AF" ? "rtl" : "ltr"}
                aria-label={localeNames[lang]}
                aria-current={locale === lang ? "page" : undefined}
                scroll={false}
                onClick={(e) => {
                  if (
                    e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
                  ) return;
                  e.preventDefault();
                  if (locale === lang) return;
                  window.dispatchEvent(new Event("frajet:locale-change"));
                  setOpen(false);
                  router.push(localePath(lang) + window.location.hash, {
                    scroll: false,
                  });
                }}
              >
                {lang === "fa-AF" ? localeNames[lang] : lang.toUpperCase()}
              </Link>
            ))}
          </nav>
          <button
            className="hidden border-0 bg-transparent p-2 text-white mobile:block"
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
