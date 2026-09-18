"use client";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUpRight, MoveRight } from "lucide-react";
import { site } from "@/lib/site";
export function Hero() {
  const t = useTranslations("Hero");
  const c = useTranslations("Common");
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <img
        className="hero-image"
        src="/aircraft-branded.png"
        alt={c("aircraftAlt")}
        fetchPriority="high"
      />
      <div className="hero-shade" />
      <div className="shell hero-content">
        <p className="eyebrow">
          <span />
          {t("eyebrow")}
        </p>
        <h1 id="hero-heading">
          {t("title")}
          <br />
          <span>{t("subtitle")}</span>
        </h1>
        <div className="hero-lower-copy">
          <p>
            {t("intro")}
            <br />
            {t("detail")}
          </p>
          <a href="#enquiry" className="button">
            {t("cta")} <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="hero-route">
          <span>{c("europe")}</span>
          <MoveRight />
          <strong>{c("afghanistan")}</strong>
          <small>{c("routeCities")}</small>
        </div>
        <a className="explore" href="#corridor">
          <ArrowDown size={16} />
          {t("explore")}
        </a>
        <span className="image-caption">{c("concept")}</span>
      </div>
    </section>
  );
}
export function Facts() {
  const t = useTranslations("Facts");
  const c = useTranslations("Common");
  return (
    <div className="facts shell">
      <div>
        <span>{t("aircraft")}</span>
        <strong><bdi>{site.aircraft}</bdi></strong>
        <small>{t("aircraftNote")}</small>
      </div>
      <div>
        <span>{t("capacity")}</span>
        <strong>
          {t("upTo", { tonnes: site.capacityTonnes })} <em>{t("tonnes")}</em>
        </strong>
        <small>{t("capacityNote")}</small>
      </div>
      <div>
        <span>{t("gateway")}</span>
        <strong>{c("frankfurt")}</strong>
        <small>{t("gatewayNote")}</small>
      </div>
      <div>
        <span>{t("direction")}</span>
        <strong>{t("both")}</strong>
        <small>{t("bothNote")}</small>
      </div>
    </div>
  );
}
