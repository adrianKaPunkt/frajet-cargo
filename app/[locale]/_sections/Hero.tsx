"use client";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUpRight, MoveRight } from "lucide-react";
export function Hero() {
  const t = useTranslations("Hero");
  const c = useTranslations("Common");
  return (
    <section className="relative h-[calc(100svh_-_90px)] min-h-[760px] max-h-[980px] overflow-hidden bg-[#3987d7] tablet:min-h-[700px] mobile:h-[calc(100svh_-_74px)] mobile:min-h-[740px] mobile:max-h-[900px] small:min-h-[720px]" aria-labelledby="hero-heading">
      <picture>
        <source media="(min-width: 1600px)" srcSet="/aircraft-branded.png" />
        <source media="(max-width: 600px)" srcSet="/hero-mobile.webp" />
        <source
          media="(max-width: 1200px) and (orientation: portrait)"
          srcSet="/hero-tablet.webp"
        />
        <img
          className="absolute bottom-0 left-0 h-auto w-full hero-wide:h-full hero-wide:object-contain hero-wide:object-bottom hero-wide:min-[1600px]:object-cover hero-wide:min-[1600px]:object-[center_70%]"
          src="/hero-desktop.webp"
          alt={c("aircraftAlt")}
          fetchPriority="high"
        />
      </picture>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,37,0.61),rgba(7,19,37,0.08)_49%,rgba(7,19,37,0.04)_68%,#0d1725_100%)] mobile:bg-[linear-gradient(180deg,#0b1b31b3,transparent_65%,#0d1725)]" />
      <div className="mx-auto w-[min(1280px,calc(100%_-_112px))] tablet:w-[calc(100%_-_64px)] mobile:w-[calc(100%_-_40px)] relative h-full min-h-[760px] pt-[53px] min-[1600px]:pt-[70px] tablet:min-h-[700px] mobile:min-h-[740px] mobile:pt-10 small:min-h-[720px]">
        <p className="mb-6 text-[12px] leading-[1.5] font-medium tracking-[0.18em] text-[#e2ebf7] mobile:mb-[18px] mobile:text-[10px] mobile:tracking-[0.16em] rtl:tracking-normal mobile:rtl:tracking-normal flex items-center gap-3 [&>span]:h-px [&>span]:w-[30px] [&>span]:bg-[#a7c6f3]">
          <span />
          {t("eyebrow")}
        </p>
        <h1 className="mb-[22px] text-[clamp(45px,4.65vw,74px)] leading-[1.08] font-normal tracking-[-0.025em] mobile:text-[clamp(39px,7.2vw,57px)] mobile:leading-[1.13] rtl:leading-[1.45] mobile:rtl:leading-[1.45] rtl:tracking-normal [&>span]:text-[#d0deef]" id="hero-heading">
          {t("title")}
          <br />
          <span>{t("subtitle")}</span>
        </h1>
        <div className="flex items-center justify-between gap-[30px] mobile:flex-col mobile:items-start mobile:gap-[22px] [&>p]:m-0 [&>p]:text-[18px] [&>p]:leading-[1.6] [&>p]:text-[#e2eaf5] mobile:[&>p]:text-[16px]">
          <p>
            {t("intro")}
            <br />
            {t("detail")}
          </p>
          <a href="#enquiry" className="inline-flex items-center justify-center gap-6 rounded-[3px] border border-solid border-blue bg-blue px-6 py-[15px] text-[16px] leading-[1.4] font-medium text-white hover:border-[#447ed0] hover:bg-[#447ed0] mobile:px-[17px] mobile:py-3 mobile:text-[14px]">
            {t("cta")} <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="absolute bottom-[79px] start-0 flex items-center gap-5 text-[20px] tracking-[0.14em] mobile:bottom-[70px] mobile:gap-3 mobile:text-[15px] mobile:tracking-[0.09em] small:text-[12px] rtl:tracking-normal mobile:rtl:tracking-normal [&_strong]:font-medium [&_svg]:h-5 [&_svg]:w-[55px] [&_svg]:text-bright mobile:[&_svg]:w-[35px] rtl:[&>svg]:-scale-x-100 [&_small]:ms-[30px] [&_small]:block [&_small]:font-mono [&_small]:text-[11px] [&_small]:tracking-[0.05em] [&_small]:text-muted tablet:[&_small]:hidden rtl:[&_small]:tracking-normal">
          <span>{c("europe")}</span>
          <MoveRight />
          <strong>{c("afghanistan")}</strong>
          <small>{c("routeCities")}</small>
        </div>
        <a className="absolute bottom-[25px] start-0 flex items-center gap-[10px] text-[13px] text-muted" href="#corridor">
          <ArrowDown size={16} />
          {t("explore")}
        </a>
        <span className="absolute end-0 bottom-[25px] text-[11px] text-[#bfcede] mobile:text-[9px] small:start-0 small:end-auto small:bottom-[7px]">{c("concept")}</span>
      </div>
    </section>
  );
}
