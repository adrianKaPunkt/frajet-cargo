"use client";
import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "@/i18n/config";
import type en from "@/messages/en.json";
export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: typeof en;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Europe/Berlin"
    >
      {children}
    </NextIntlClientProvider>
  );
}
