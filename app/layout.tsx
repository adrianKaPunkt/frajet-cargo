import { LocaleDocument } from "@/components/LocaleDocument";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <LocaleDocument>{children}</LocaleDocument>;
}
