"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { ArrowUpRight, Download, Check, ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

const fieldNames = [
  "name",
  "company",
  "email",
  "route",
  "date",
  "weight",
  "dimensions",
  "cargo",
] as const;
const routeIds = ["fra-kbl", "fra-hea", "kbl-fra", "hea-fra"] as const;
type Fields = Partial<Record<(typeof fieldNames)[number] | "consent", string>>;
const draftKey = "frajet-locale-draft";

export function EnquiryForm() {
  const t = useTranslations("Form");
  const c = useTranslations("Common");
  const format = useFormatter();
  const formRef = useRef<HTMLFormElement>(null);
  const [review, setReview] = useState<Fields | null>(null);
  // Transfer an unsent draft only when the visitor explicitly changes language.
  // Consume it immediately on the next page; no persistent personal-data storage.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(draftKey);
      sessionStorage.removeItem(draftKey);
      if (raw) {
        const saved = JSON.parse(raw);
        const values: Fields = {};
        for (const name of [...fieldNames, "consent"] as const) {
          const value = saved.fields?.[name];
          if (typeof value !== "string") continue;
          values[name] = value.slice(0, 3000);
          const element = formRef.current?.elements.namedItem(name);
          if (
            element instanceof HTMLInputElement &&
            element.type === "checkbox"
          )
            element.checked = value === "on";
          else if (
            element instanceof HTMLInputElement ||
            element instanceof HTMLSelectElement ||
            element instanceof HTMLTextAreaElement
          )
            element.value = values[name] ?? "";
        }
        if (saved.review === true && formRef.current?.checkValidity())
          setReview(values);
      }
    } catch {
      /* Storage may be unavailable; normal navigation still works. */
    }
    function transfer() {
      if (!formRef.current) return;
      try {
        sessionStorage.setItem(
          draftKey,
          JSON.stringify({
            fields: Object.fromEntries(new FormData(formRef.current)),
            review: review !== null,
          }),
        );
      } catch {}
    }
    window.addEventListener("frajet:locale-change", transfer);
    return () => window.removeEventListener("frajet:locale-change", transfer);
  }, [review]);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReview(Object.fromEntries(new FormData(event.currentTarget)) as Fields);
  }
  function displayValue(
    name: (typeof fieldNames)[number],
    value: string | undefined,
  ) {
    if (!value) return t("notSpecified");
    if (
      name === "route" &&
      routeIds.includes(value as (typeof routeIds)[number])
    )
      return t(`routes.${value as (typeof routeIds)[number]}`);
    if (name === "weight" && Number.isFinite(Number(value)))
      return format.number(Number(value));
    if (name === "date")
      return format.dateTime(new Date(`${value}T12:00:00Z`), {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    return value;
  }
  const summary = review
    ? t("documentTitle") +
      "\n\n" +
      fieldNames
        .map((name) => `${t(name)}: ${displayValue(name, review[name])}`)
        .join("\n")
    : "";
  function download() {
    const url = URL.createObjectURL(
      new Blob([summary], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = t("downloadFilename");
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section id="enquiry" className="section enquiry">
      <div className="shell enquiry-grid">
        <div className="enquiry-intro">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2>
            {t("title")}
            <br />
            <span>{t("subtitle")}</span>
          </h2>
          <p>
            {t("intro")}
            <br />
            {t("detail")}
          </p>
          <div className="enquiry-route">
            <span>FRA</span>
            <span>↔</span>
            <div>
              KBL <small>/</small> HEA
            </div>
          </div>
          <p className="small-note">
            {c("corridor")}
            <br />
            {c("capacityFlight", { tonnes: site.capacityTonnes })}
          </p>
        </div>
        <div className="form-panel">
          <div className="form-heading">
            <h3>{t("heading")}</h3>
            <span>{t("required")}</span>
          </div>
          <form
            ref={formRef}
            onSubmit={prepare}
            style={{ display: review ? "none" : undefined }}
          >
            <div className="form-grid">
              <label>
                {t("name")} *
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder={t("namePlaceholder")}
                />
              </label>
              <label>
                {t("company")} *
                <input
                  name="company"
                  autoComplete="organization"
                  required
                  maxLength={150}
                  placeholder={t("companyPlaceholder")}
                />
              </label>
              <label className="full-width">
                {t("email")} *
                <input
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  maxLength={200}
                  placeholder={t("emailPlaceholder")}
                />
              </label>
              <label>
                {t("route")} *
                <select name="route" required defaultValue="">
                  <option value="" disabled>
                    {t("routePlaceholder")}
                  </option>
                  {routeIds.map((route) => (
                    <option key={route} value={route}>
                      {t(`routes.${route}`)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {t("date")}
                <input name="date" type="date" />
              </label>
              <label>
                {t("weight")} *
                <input
                  name="weight"
                  type="number"
                  min="1"
                  max={site.capacityTonnes * 1000}
                  step="1"
                  required
                  placeholder={t("weightPlaceholder")}
                />
              </label>
              <label>
                {t("dimensions")}
                <input
                  name="dimensions"
                  maxLength={250}
                  placeholder={t("dimensionsPlaceholder")}
                />
              </label>
              <label className="full-width">
                {t("cargo")} *
                <textarea
                  name="cargo"
                  required
                  maxLength={3000}
                  rows={3}
                  placeholder={t("cargoPlaceholder")}
                />
              </label>
            </div>
            <label className="consent">
              <input type="checkbox" name="consent" required />
              <span>{t("consent")} *</span>
            </label>
            <button className="button form-submit" type="submit">
              {t("submit")} <ArrowUpRight size={18} />
            </button>
            <p className="form-note">
              {site.email ? t("emailNote") : t("downloadNote")} {t("privacy")}
            </p>
          </form>
          {review && (
            <div className="enquiry-review" role="status">
              <div className="review-title">
                <Check size={22} />
                <h4>{t("reviewTitle")}</h4>
              </div>
              <pre>{summary}</pre>
              <p>{t("notSent")}</p>
              <div className="review-actions">
                <button className="text-link" onClick={() => setReview(null)}>
                  <ArrowLeft size={16} />
                  {t("edit")}
                </button>
                {site.email ? (
                  <a
                    className="button"
                    href={`mailto:${site.email}?subject=${encodeURIComponent(t("emailSubject"))}&body=${encodeURIComponent(summary)}`}
                  >
                    {t("openEmail")} <ArrowUpRight size={17} />
                  </a>
                ) : (
                  <button className="button" onClick={download}>
                    {t("download")} <Download size={17} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
