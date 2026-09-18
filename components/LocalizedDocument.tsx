import { dictionaries, type Locale } from "@/i18n/config";
import { LocaleProvider } from "./LocaleProvider";
export function LocalizedDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} dir={locale === "fa-AF" ? "rtl" : "ltr"}>
      <body>
        <LocaleProvider locale={locale} messages={dictionaries[locale]}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
