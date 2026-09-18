"use client";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { ArrowUpRight, Box, Route, MessagesSquare } from "lucide-react";
export function Aircraft() {
  const t = useTranslations("Aircraft");
  const a = useTranslations("Approach");
  const c = useTranslations("Common");
  return (
    <>
      <section id="aircraft" className="aircraft section">
        <div className="shell aircraft-grid">
          <div className="aircraft-visual">
            <span className="technical-tag">{t("tag")}</span>
            <img
              src="/aircraft-branded.png"
              alt={c("aircraftAlt")}
              loading="lazy"
            />
            <div className="aircraft-image-label">
              <span>757–200F</span>
              <small>{c("concept")}</small>
            </div>
          </div>
          <div className="aircraft-copy">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2>
              {t("title")}
              <br />
              <span>757-200F.</span>
            </h2>
            <p>{t("intro")}</p>
            <div className="payload">
              <strong>
                25<span>t</span>
              </strong>
              <div>
                {c("capacity", { tonnes: site.capacityTonnes })}
                <br />
                <span>{t("capacityNote")}</span>
              </div>
            </div>
            <p className="small-note">{t("note")}</p>
            <a className="text-link" href="#enquiry">
              {t("cta")} <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <section id="approach" className="section approach">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{a("eyebrow")}</p>
              <h2>
                {a("title")}
                <br />
                <span>{a("subtitle")}</span>
              </h2>
            </div>
            <p>{a("intro")}</p>
          </div>
          <div className="approach-grid">
            <article>
              <Route />
              <h3>{a("corridorTitle")}</h3>
              <p>{a("corridorText")}</p>
            </article>
            <article>
              <Box />
              <h3>{a("capacityTitle")}</h3>
              <p>{a("capacityText")}</p>
            </article>
            <article>
              <MessagesSquare />
              <h3>{a("personalTitle")}</h3>
              <p>{a("personalText")}</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
