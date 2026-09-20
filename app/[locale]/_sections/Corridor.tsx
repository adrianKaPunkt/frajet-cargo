"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ArrowUpRight, ArrowLeftRight } from "lucide-react";
import { destinations } from "@/lib/site";
export function Corridor() {
  const t = useTranslations("Corridor");
  const c = useTranslations("Common");
  const [selected, setSelected] = useState(0);
  const dest = destinations[selected];
  return (
    <section id="corridor" className="py-[105px] mobile:py-[70px]">
      <div className="mx-auto w-[min(1280px,calc(100%_-_112px))] tablet:w-[calc(100%_-_64px)] mobile:w-[calc(100%_-_40px)]">
        <div className="mb-[45px] flex items-end justify-between gap-20 tablet:gap-[45px] mobile:mb-[30px] mobile:block [&_h2]:m-0 [&>p]:mt-0 [&>p]:mb-[3px] [&>p]:max-w-[360px] [&>p]:text-[17px] [&>p]:text-muted mobile:[&>p]:mt-6 mobile:[&>p]:max-w-[500px]">
          <div>
            <p className="mb-6 text-[12px] leading-[1.5] font-medium tracking-[0.18em] text-bright mobile:mb-[18px] mobile:text-[10px] mobile:tracking-[0.16em] rtl:tracking-normal mobile:rtl:tracking-normal">{t("eyebrow")}</p>
            <h2 className="mb-[26px] text-[clamp(35px,3.25vw,49px)] leading-[1.15] font-normal tracking-[-0.02em] mobile:text-[37px] rtl:leading-[1.45] rtl:tracking-normal [&_span]:text-muted">
              {t("title")}
              <br />
              <span>{t("subtitle")}</span>
            </h2>
          </div>
          <p>{t("intro")}</p>
        </div>
        <div className="grid min-h-[440px] grid-cols-[330px_1fr] border-y border-solid border-line tablet:grid-cols-[280px_1fr] mobile:flex mobile:flex-col">
          <div className="z-1 pt-[38px] pe-[30px] pb-[30px] ps-0 mobile:px-0 mobile:pt-[26px] mobile:pb-0">
            <div className="[&_strong]:block [&_strong]:font-mono [&_strong]:text-[34px] [&_strong]:leading-[1.4] [&_strong]:font-normal mobile:[&_strong]:text-[29px] [&_strong_span]:ms-3 [&_strong_span]:font-sans [&_strong_span]:text-[18px] [&_p]:mt-2 [&_p]:text-[14px] [&_p]:text-muted mobile:[&_p]:mb-3">
              <span className="mb-3 text-[10px] leading-[1.5] font-medium tracking-[0.18em] text-bright mobile:mb-3 mobile:text-[10px] mobile:tracking-[0.16em] rtl:tracking-normal mobile:rtl:tracking-normal block">{t("gateway")}</span>
              <strong>
                <bdi>FRA</bdi> <span>{c("frankfurt")}</span>
              </strong>
              <p>{t("gatewayNote")}</p>
            </div>
            <div
              className="mt-[30px] flex border-b border-solid border-line mobile:mt-[15px]"
              role="tablist"
              aria-label={t("destinations")}
            >
              {destinations.map((d, i) => (
                <button
                  className="w-1/2 border-0 border-b-2 border-solid border-transparent bg-transparent px-0 py-3 text-start text-[17px] text-muted aria-selected:border-bright aria-selected:text-white mobile:flex mobile:items-center mobile:gap-3 [&_span]:block [&_span]:font-mono [&_span]:text-[12px]"
                  key={d.code}
                  id={"tab-" + d.code}
                  role="tab"
                  aria-selected={selected === i}
                  aria-controls="destination-panel"
                  onClick={() => setSelected(i)}
                  onKeyDown={(e) => {
                    if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
                      e.preventDefault();
                      setSelected(1 - selected);
                      document
                        .getElementById(
                          "tab-" + destinations[1 - selected].code,
                        )
                        ?.focus();
                    }
                  }}
                  tabIndex={selected === i ? 0 : -1}
                >
                  {c(d.code)}
                  <span>{d.code}</span>
                </button>
              ))}
            </div>
            <div
              id="destination-panel"
              role="tabpanel"
              aria-labelledby={"tab-" + dest.code}
            >
              <p className="mt-[22px] min-h-12 text-[15px] text-muted mobile:my-[17px] mobile:min-h-0">{t(dest.code)}</p>
              <div className="my-5 flex items-center gap-[10px] text-[14px] text-[#c4d8f3] mobile:my-[15px]">
                <ArrowLeftRight size={17} /> {t("return")}
              </div>
              <a className="inline-flex items-center gap-[15px] border-0 border-b border-solid border-[#5f7fa7] bg-transparent px-0 pt-0 pb-[6px] text-[14px] text-text hover:text-bright" href={"#enquiry"}>
                {t("cta")} <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="relative min-h-[430px] overflow-hidden bg-[radial-gradient(ellipse_at_55%_45%,#1d314c70,transparent_70%)] mobile:mt-[15px] mobile:min-h-[360px] small:min-h-[285px] [&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-contain [&>svg]:absolute [&>svg]:inset-0 [&>svg]:size-full [&>svg]:object-contain [&>svg]:[direction:ltr]">
            <img src="/corridor-map.svg" alt={t("mapAlt")} />
            <svg
              viewBox="0 0 1050 714"
              role="img"
              aria-label={t("routeAlt", { destination: c(dest.code) })}
            >
              <defs>
                <linearGradient id="route" x1="0" x2="1">
                  <stop stopColor="#4485e1" />
                  <stop offset="1" stopColor="#bcd7ff" />
                </linearGradient>
              </defs>
              <path
                d={`M 267 224 Q 520 65 ${dest.x} ${dest.y}`}
                fill="none"
                stroke="url(#route)"
                strokeWidth="3"
              />
              <path
                d={`M 267 224 Q 520 115 ${dest.x} ${dest.y}`}
                fill="none"
                stroke="#5a85b7"
                strokeWidth="1.5"
                strokeDasharray="5 6"
              />
              <circle cx="267" cy="224" r="18" fill="#4283db" opacity=".2" />
              <circle cx="267" cy="224" r="5" fill="#ffffff" />
              <text x="230" y="185" className="fill-white font-mono text-[25px]">
                FRA
              </text>
              <text className="fill-[#becce0] font-sans text-[18px]" x="230" y="205">
                {c("frankfurt")}
              </text>
              {destinations.map((d) => (
                <g key={d.code} opacity={d.code === dest.code ? 1 : 0.5}>
                  <circle cx={d.x} cy={d.y} r="6" fill="#78acf0" />
                  <text
                    x={d.x + (d.code === "HEA" ? -45 : 15)}
                    y={d.y + 35}
                    className="fill-white font-mono text-[25px]"
                  >
                    {d.code}
                  </text>
                  <text className="fill-[#becce0] font-sans text-[18px]" x={d.x + (d.code === "HEA" ? -45 : 15)} y={d.y + 57}>
                    {c(d.code)}
                  </text>
                </g>
              ))}
              <text x="320" y="405" className="fill-[#6d84a1] font-sans text-[17px] tracking-[5px] rtl:tracking-normal">
                {c("europe")}
              </text>
              <text x="755" y="540" className="fill-[#6d84a1] font-sans text-[17px] tracking-[5px] rtl:tracking-normal">
                {c("afghanistan")}
              </text>
            </svg>
            <div className="absolute right-0 bottom-[13px] left-[25px] flex items-center gap-[9px] text-[11px] text-muted mobile:bottom-0 mobile:left-0 small:text-[10px] [&>span]:h-[2px] [&>span]:w-5 [&>span]:bg-blue [&_small]:ms-auto [&_small]:text-[10px] mobile:[&_small]:max-w-[145px] mobile:[&_small]:text-end small:[&_small]:text-[9px]">
              <span /> {c("corridor")} <small>{t("mapNote")}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
