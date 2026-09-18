import { notFound } from "next/navigation";
import { LocalizedDocument } from "@/components/LocalizedDocument";
import { isLocale, locales } from "@/i18n/config";
import { localizedMetadata } from "@/i18n/metadata";
import "../globals.css";
type Props = { params: Promise<{ locale: string }>; children: React.ReactNode };
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return localizedMetadata(locale);
}
export default async function Layout({ params, children }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LocalizedDocument locale={locale}>{children}</LocalizedDocument>;
}
