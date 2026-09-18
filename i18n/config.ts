import en from "@/messages/en.json";
import de from "@/messages/de.json";

export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
};
export const dictionaries = { en, de } satisfies Record<Locale, typeof en>;
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
// Keep the original English URL stable; explicit /en/ links also work.
export function localePath(locale: Locale) {
  return locale === "en" ? "/" : `/${locale}/`;
}
