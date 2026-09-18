"use client";
import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Hero, Facts } from "@/components/Hero";
import { Corridor } from "@/components/Corridor";
import { Aircraft } from "@/components/Aircraft";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Footer } from "@/components/Footer";
export default function Home() {
  const t = useTranslations("Common");
  return (
    <>
      <a className="skip-link" href="#main">
        {t("skip")}
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <Facts />
        <Corridor />
        <Aircraft />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  );
}
