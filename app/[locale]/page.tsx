"use client";
import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Hero } from "./_sections/Hero";
import { Facts } from "./_sections/Facts";
import { Approach } from "./_sections/Approach";
import { Corridor } from "./_sections/Corridor";
import { Aircraft } from "./_sections/Aircraft";
import { EnquiryForm } from "./_sections/EnquiryForm";
import { Footer } from "@/components/Footer";
export default function Home() {
  const t = useTranslations("Common");
  return (
    <>
      <a className="fixed -top-[100px] left-5 z-100 bg-white p-[10px] text-navy focus:top-[10px]" href="#main">
        {t("skip")}
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <Facts />
        <Corridor />
        <Aircraft />
        <Approach />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  );
}
