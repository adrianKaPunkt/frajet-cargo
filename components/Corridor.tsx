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
    <section id="corridor" className="section corridor">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2>
              {t("title")}
              <br />
              <span>{t("subtitle")}</span>
            </h2>
          </div>
          <p>{t("intro")}</p>
        </div>
        <div className="corridor-layout">
          <div className="route-info">
            <div className="gateway">
              <span className="eyebrow">{t("gateway")}</span>
              <strong>
                FRA <span>Frankfurt</span>
              </strong>
              <p>{t("gatewayNote")}</p>
            </div>
            <div
              className="destination-tabs"
              role="tablist"
              aria-label={t("destinations")}
            >
              {destinations.map((d, i) => (
                <button
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
                  {d.name}
                  <span>{d.code}</span>
                </button>
              ))}
            </div>
            <div
              id="destination-panel"
              role="tabpanel"
              aria-labelledby={"tab-" + dest.code}
            >
              <p>{t(dest.code)}</p>
              <div className="return-label">
                <ArrowLeftRight size={17} /> {t("return")}
              </div>
              <a className="text-link" href={"#enquiry"}>
                {t("cta")} <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="route-map">
            <img src="/corridor-map.svg" alt={t("mapAlt")} />
            <svg
              viewBox="0 0 1050 714"
              role="img"
              aria-label={t("routeAlt", { destination: dest.name })}
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
              <text x="230" y="185" className="map-code">
                FRA
              </text>
              <text x="230" y="205">
                Frankfurt
              </text>
              {destinations.map((d) => (
                <g key={d.code} opacity={d.code === dest.code ? 1 : 0.5}>
                  <circle cx={d.x} cy={d.y} r="6" fill="#78acf0" />
                  <text
                    x={d.x + (d.code === "HEA" ? -45 : 15)}
                    y={d.y + 35}
                    className="map-code"
                  >
                    {d.code}
                  </text>
                  <text x={d.x + (d.code === "HEA" ? -45 : 15)} y={d.y + 57}>
                    {d.name}
                  </text>
                </g>
              ))}
              <text x="320" y="405" className="map-region">
                {c("europe")}
              </text>
              <text x="755" y="540" className="map-region">
                AFGHANISTAN
              </text>
            </svg>
            <div className="map-key">
              <span /> {c("corridor")} <small>{t("mapNote")}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
