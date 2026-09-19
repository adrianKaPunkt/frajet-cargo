import en from "@/i18n/dictionaries/en.json";
import de from "@/i18n/dictionaries/de.json";

import faAF from "@/i18n/dictionaries/fa-AF.json";

export const locales = ["en", "de", "fa-AF"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  "fa-AF": "دری",
};
export const dictionaries = { en, de, "fa-AF": faAF } satisfies Record<Locale, typeof en>;
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
// Keep the original English URL stable; explicit /en/ links also work.
export function localePath(locale: Locale) {
  return locale === "en" ? "/" : `/${locale}/`;
}
