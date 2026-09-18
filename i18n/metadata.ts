import type { Metadata } from "next";
import { dictionaries, localePath, type Locale } from "./config";
export function localizedMetadata(locale: Locale): Metadata {
  const meta = dictionaries[locale].Meta;
  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL("https://frajet-cargo.adriankdev.chatgpt.site"),
    alternates: {
      canonical: localePath(locale),
      languages: { en: "/", de: "/de/", "x-default": "/" },
    },
    robots: { index: false, follow: false },
    icons: { icon: "/icon.svg" },
  };
}
