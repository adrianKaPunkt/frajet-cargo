"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";

export function LocaleDocument({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale = isLocale(segment) ? segment : defaultLocale;

  return (
    <html lang={locale} dir={locale === "fa-AF" ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}
