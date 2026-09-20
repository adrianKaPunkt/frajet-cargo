"use client";

import { useTranslations } from "next-intl";
import { LegalModal } from "./LegalModal";

const documents = ["imprint", "privacy"] as const;
const sections = ["first", "second", "third"] as const;

export function LegalLinks() {
  const t = useTranslations("Legal");

  return (
    <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label={t("label")}>
      {documents.map((document) => (
        <LegalModal key={document} title={t(`${document}.title`)} intro={t(`${document}.intro`)}>
          {sections.map((section, index) => (
            <section className="mt-6 border-t border-solid border-line pt-5 [&_h3]:mt-0 [&_h3]:mb-3 [&_h3]:flex [&_h3]:items-baseline [&_h3]:gap-[14px] [&_h3]:text-[19px] [&_h3]:font-medium [&_h3_span]:font-mono [&_h3_span]:text-[12px] [&_h3_span]:text-bright [&_p]:m-0 [&_p]:whitespace-pre-line [&_p]:text-muted" key={section}>
              <h3>
                <span aria-hidden="true">0{index + 1}</span>
                {t(`${document}.${section}.title`)}
              </h3>
              <p dir={document === "imprint" && section === "second" ? "ltr" : undefined}>
                {t(`${document}.${section}.body`)}
              </p>
            </section>
          ))}
        </LegalModal>
      ))}
    </nav>
  );
}
