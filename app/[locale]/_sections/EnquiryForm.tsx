"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
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
  const locale = useLocale();
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
  }, [review, locale]);

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
    <section id="enquiry" className="py-[105px] mobile:py-[70px] border-t border-solid border-[#ffffff08] bg-[#152339]">
      <div className="mx-auto w-[min(1280px,calc(100%_-_112px))] tablet:w-[calc(100%_-_64px)] mobile:w-[calc(100%_-_40px)] grid grid-cols-[0.9fr_1.1fr] gap-[90px] tablet:gap-10 mobile:grid-cols-1 mobile:gap-[30px]">
        <div className="pt-3 mobile:[&>p_br]:hidden">
          <p className="mb-6 text-[12px] leading-[1.5] font-medium tracking-[0.18em] text-bright mobile:mb-[18px] mobile:text-[10px] mobile:tracking-[0.16em] rtl:tracking-normal mobile:rtl:tracking-normal">{t("eyebrow")}</p>
          <h2 className="mb-[26px] text-[clamp(35px,3.25vw,49px)] leading-[1.15] font-normal tracking-[-0.02em] mobile:text-[37px] rtl:leading-[1.45] rtl:tracking-normal [&_span]:text-muted">
            {t("title")}
            <br />
            <span>{t("subtitle")}</span>
          </h2>
          <p className="text-muted">
            {t("intro")}
            <br />
            {t("detail")}
          </p>
          <div className="mt-[60px] mb-[22px] flex items-center gap-6 font-mono text-[35px] [direction:ltr] [unicode-bidi:isolate] mobile:mt-[30px] mobile:mb-[15px] mobile:text-[29px] small:gap-[17px] [&>span:nth-child(2)]:text-[28px] [&>span:nth-child(2)]:text-blue [&_small]:text-[20px] [&_small]:text-[#6884a7]">
            <span>FRA</span>
            <span>↔</span>
            <div>
              KBL <small>/</small> HEA
            </div>
          </div>
          <p className="text-[13px] leading-[1.7] text-muted">
            {c("corridor")}
            <br />
            {c("capacityFlight", { tonnes: site.capacityTonnes })}
          </p>
        </div>
        <div className="rounded-[4px] border border-solid border-line bg-[#0e1a2b] p-8 tablet:p-6 mobile:p-[22px] small:p-[18px]">
          <div className="mb-[25px] flex items-center justify-between gap-5 border-b border-solid border-line pb-[21px] de:items-start rtl:flex-wrap mobile:flex-col mobile:items-start mobile:gap-[5px] [&_h3]:m-0 [&_h3]:text-[22px] [&_h3]:font-normal [&>span]:text-[11px] [&>span]:text-muted de:[&>span]:max-w-[185px]">
            <h3>{t("heading")}</h3>
            <span>{t("required")}</span>
          </div>
          <form
            ref={formRef}
            onSubmit={prepare}
            className={review ? "hidden" : undefined}
          >
            <div className="grid grid-cols-2 gap-x-5 gap-y-[19px] small:grid-cols-1 [&_label]:flex [&_label]:flex-col [&_label]:gap-[7px] [&_label]:text-[13px] [&_label]:text-[#c5d1e2] mobile:[&_label]:text-[14px]">
              <label>
                {t("name")} *
                <input className="min-w-0 w-full rounded-[2px] border border-solid border-[#738aa23c] bg-[#162338] px-3 py-[11px] text-[14px] leading-[1.5] text-white scheme-dark placeholder:text-[#8b9bb1]"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder={t("namePlaceholder")}
                />
              </label>
              <label>
                {t("company")} *
                <input className="min-w-0 w-full rounded-[2px] border border-solid border-[#738aa23c] bg-[#162338] px-3 py-[11px] text-[14px] leading-[1.5] text-white scheme-dark placeholder:text-[#8b9bb1]"
                  name="company"
                  autoComplete="organization"
                  required
                  maxLength={150}
                  placeholder={t("companyPlaceholder")}
                />
              </label>
              <label className="col-span-full">
                {t("email")} *
                <input className="min-w-0 w-full rounded-[2px] border border-solid border-[#738aa23c] bg-[#162338] px-3 py-[11px] text-[14px] leading-[1.5] text-white scheme-dark placeholder:text-[#8b9bb1] [direction:ltr] [unicode-bidi:isolate]"
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
                <select className="min-w-0 w-full rounded-[2px] border border-solid border-[#738aa23c] bg-[#162338] px-3 py-[11px] text-[14px] leading-[1.5] text-white scheme-dark placeholder:text-[#8b9bb1] pe-[5px]" name="route" required defaultValue="">
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
                <input className="min-w-0 w-full rounded-[2px] border border-solid border-[#738aa23c] bg-[#162338] px-3 py-[11px] text-[14px] leading-[1.5] text-white scheme-dark placeholder:text-[#8b9bb1] [direction:ltr] [unicode-bidi:isolate]" name="date" type="date" />
              </label>
              <label>
                {t("weight")} *
                <input className="min-w-0 w-full rounded-[2px] border border-solid border-[#738aa23c] bg-[#162338] px-3 py-[11px] text-[14px] leading-[1.5] text-white scheme-dark placeholder:text-[#8b9bb1] [direction:ltr] [unicode-bidi:isolate]"
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
                <input className="min-w-0 w-full rounded-[2px] border border-solid border-[#738aa23c] bg-[#162338] px-3 py-[11px] text-[14px] leading-[1.5] text-white scheme-dark placeholder:text-[#8b9bb1]"
                  name="dimensions"
                  maxLength={250}
                  placeholder={t("dimensionsPlaceholder")}
                />
              </label>
              <label className="col-span-full">
                {t("cargo")} *
                <textarea className="min-w-0 w-full rounded-[2px] border border-solid border-[#738aa23c] bg-[#162338] px-3 py-[11px] text-[14px] leading-[1.5] text-white scheme-dark placeholder:text-[#8b9bb1] min-h-[110px] resize-y"
                  name="cargo"
                  required
                  maxLength={3000}
                  rows={3}
                  placeholder={t("cargoPlaceholder")}
                />
              </label>
            </div>
            <label className="mt-6 mb-[22px] flex items-start gap-[10px] text-[12px] text-muted">
              <input className="min-w-0 w-4 rounded-[2px] border border-solid border-[#738aa23c] bg-[#162338] px-3 py-[11px] text-[14px] leading-[1.5] text-white scheme-dark placeholder:text-[#8b9bb1] mx-0 my-[3px] h-4 shrink-0 accent-blue" type="checkbox" name="consent" required />
              <span>{t("consent")} *</span>
            </label>
            <button className="inline-flex items-center justify-between gap-6 rounded-[3px] border border-solid border-blue bg-blue px-6 py-[15px] text-[16px] leading-[1.4] font-medium text-white hover:border-[#447ed0] hover:bg-[#447ed0] w-full" type="submit">
              {t("submit")} <ArrowUpRight size={18} />
            </button>
            <p className="mt-[15px] mb-0 text-[11px] leading-[1.65] text-[#91a2bb]">
              {site.email ? t("emailNote") : t("downloadNote")} {t("privacy")}
            </p>
          </form>
          {review && (
            <div className="[&_pre]:border-y [&_pre]:border-solid [&_pre]:border-line [&_pre]:py-[22px] [&_pre]:font-mono [&_pre]:text-[13px] [&_pre]:whitespace-pre-wrap [&_pre]:text-[#c5d1e2] [&_pre]:[overflow-wrap:anywhere] [&>p]:text-[13px] [&>p]:text-muted" role="status">
              <div className="flex items-start gap-3 text-bright [&_h4]:text-[19px] [&_h4]:font-normal">
                <Check size={22} />
                <h4>{t("reviewTitle")}</h4>
              </div>
              <pre>{summary}</pre>
              <p>{t("notSent")}</p>
              <div className="flex flex-wrap items-center justify-between gap-[25px]">
                <button className="inline-flex items-center gap-[15px] border-0 border-b border-solid border-[#5f7fa7] bg-transparent px-0 pt-0 pb-[6px] text-[14px] text-text hover:text-bright rtl:[&>svg]:-scale-x-100" onClick={() => setReview(null)}>
                  <ArrowLeft size={16} />
                  {t("edit")}
                </button>
                {site.email ? (
                  <a
                    className="inline-flex items-center justify-center gap-6 rounded-[3px] border border-solid border-blue bg-blue px-6 py-[15px] text-[16px] leading-[1.4] font-medium text-white hover:border-[#447ed0] hover:bg-[#447ed0]"
                    href={`mailto:${site.email}?subject=${encodeURIComponent(t("emailSubject"))}&body=${encodeURIComponent(summary)}`}
                  >
                    {t("openEmail")} <ArrowUpRight size={17} />
                  </a>
                ) : (
                  <button className="inline-flex items-center justify-center gap-6 rounded-[3px] border border-solid border-blue bg-blue px-6 py-[15px] text-[16px] leading-[1.4] font-medium text-white hover:border-[#447ed0] hover:bg-[#447ed0]" onClick={download}>
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
