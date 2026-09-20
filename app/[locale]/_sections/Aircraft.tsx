"use client";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";
export function Aircraft() {
  const t = useTranslations("Aircraft");
  const c = useTranslations("Common");
  return (
    <section id="aircraft" className="bg-[#eaf0f6] text-navy py-[105px] mobile:py-[70px]">
      <div className="mx-auto w-[min(1280px,calc(100%_-_112px))] tablet:w-[calc(100%_-_64px)] mobile:w-[calc(100%_-_40px)] grid grid-cols-[1.12fr_1fr] items-center gap-[75px] tablet:gap-10 mobile:grid-cols-1">
        <div className="relative h-[480px] overflow-hidden bg-[#cfdae9] mobile:h-[350px] small:h-[300px] [&>img]:absolute [&>img]:size-full [&>img]:object-cover [&>img]:object-[36%_70%]">
          <span className="absolute top-[25px] left-[25px] z-1 font-mono text-[11px] tracking-[0.1em] text-[#15345c] rtl:tracking-normal">{t("tag")}</span>
          <img
            src="/aircraft-branded.png"
            alt={c("aircraftAlt")}
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-[linear-gradient(transparent,#0d1725dc)] px-[25px] py-5 text-white small:p-4 [&>span]:font-mono [&>span]:text-[30px] [&>span]:[direction:ltr] [&>span]:[unicode-bidi:isolate] small:[&>span]:text-[25px] [&>small]:text-[10px] small:[&>small]:max-w-[90px] small:[&>small]:text-end">
            <span>757–200F</span>
            <small>{c("concept")}</small>
          </div>
        </div>
        <div className="mobile:max-w-[550px] mobile:[&_h2_br]:hidden mobile:[&_h2_span]:before:content-['_']">
          <p className="mb-6 text-[12px] leading-[1.5] font-medium tracking-[0.18em] text-[#3265a9] mobile:mb-[18px] mobile:text-[10px] mobile:tracking-[0.16em] rtl:tracking-normal mobile:rtl:tracking-normal">{t("eyebrow")}</p>
          <h2 className="mb-[26px] text-[clamp(35px,3.25vw,49px)] leading-[1.15] font-normal tracking-[-0.02em] mobile:text-[37px] rtl:leading-[1.45] rtl:tracking-normal [&_span]:text-[#44729f]">
            {t("title")}
            <br />
            <span><bdi>757-200F.</bdi></span>
          </h2>
          <p className="text-[#506178]">{t("intro")}</p>
          <div className="mt-7 mb-4 flex items-center gap-[25px] border-y border-solid border-[#162b4625] py-[18px] [&>strong]:text-[76px] [&>strong]:leading-none [&>strong]:font-normal [&>strong]:[direction:ltr] [&>strong]:[unicode-bidi:isolate] [&>strong>span]:ms-[5px] [&>strong>span]:text-[35px] [&>strong>span]:text-[#6682a4] [&>div]:text-[17px] [&>div]:leading-[1.5] [&>div>span]:text-[14px] [&>div>span]:text-[#506178]">
            <strong>
              25<span>t</span>
            </strong>
            <div>
              {c("capacity", { tonnes: site.capacityTonnes })}
              <br />
              <span>{t("capacityNote")}</span>
            </div>
          </div>
          <p className="text-[13px] leading-[1.7] text-[#506178]">{t("note")}</p>
          <a className="inline-flex items-center gap-[15px] border-0 border-b border-solid border-[#5f7fa7] bg-transparent px-0 pt-0 pb-[6px] text-[14px] text-[#143c6e] hover:text-bright mt-3" href="#enquiry">
            {t("cta")} <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
