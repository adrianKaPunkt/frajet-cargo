import { LocalizedDocument } from "@/components/LocalizedDocument";
import { localizedMetadata } from "@/i18n/metadata";
import "../globals.css";
export const metadata = localizedMetadata("en");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <LocalizedDocument locale="en">{children}</LocalizedDocument>;
}
