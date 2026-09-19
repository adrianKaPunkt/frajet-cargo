import { LocaleProvider } from "@/components/LocaleProvider";
import { dictionaries } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
import "../globals.css";
export const metadata = localizedMetadata("en");
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <LocaleProvider locale="en" messages={dictionaries.en}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
