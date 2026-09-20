import { LocaleProvider } from "@/components/LocaleProvider";
import { dictionaries } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
export const metadata = localizedMetadata("en");
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider locale="en" messages={dictionaries.en}>
      {children}
    </LocaleProvider>
  );
}
