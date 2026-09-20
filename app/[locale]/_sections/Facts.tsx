"use client";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
export function Facts() {
  const t = useTranslations("Facts");
  const c = useTranslations("Common");
  return (
    <div className="grid grid-cols-4 border-b border-solid border-line pt-[37px] pb-[39px] mobile:grid-cols-2 mobile:gap-y-[27px] mobile:py-[30px] mx-auto w-[min(1280px,calc(100%_-_112px))] tablet:w-[calc(100%_-_64px)] mobile:w-[calc(100%_-_40px)]">
      <div className="border-s border-solid border-line ps-8 tablet:ps-5 first:border-0 first:ps-0 mobile:nth-3:border-0 mobile:nth-3:ps-0">
        <span className="mb-2 block text-[11px] tracking-[0.14em] text-muted mobile:text-[10px] mobile:de:tracking-[0.07em] rtl:tracking-normal">{t("aircraft")}</span>
        <strong className="block text-[25px] leading-[1.3] font-medium tablet:text-[21px] mobile:text-[22px] small:text-[19px]"><bdi>{site.aircraft}</bdi></strong>
        <small className="mt-2 block text-[12px] text-muted tablet:text-[11px] mobile:max-w-[155px]">{t("aircraftNote")}</small>
      </div>
      <div className="border-s border-solid border-line ps-8 tablet:ps-5 first:border-0 first:ps-0 mobile:nth-3:border-0 mobile:nth-3:ps-0">
        <span className="mb-2 block text-[11px] tracking-[0.14em] text-muted mobile:text-[10px] mobile:de:tracking-[0.07em] rtl:tracking-normal">{t("capacity")}</span>
        <strong className="block text-[25px] leading-[1.3] font-medium tablet:text-[21px] mobile:text-[22px] small:text-[19px]">
          {t("upTo", { tonnes: site.capacityTonnes })} <em className="text-[20px] font-normal not-italic">{t("tonnes")}</em>
        </strong>
        <small className="mt-2 block text-[12px] text-muted tablet:text-[11px] mobile:max-w-[155px]">{t("capacityNote")}</small>
      </div>
      <div className="border-s border-solid border-line ps-8 tablet:ps-5 first:border-0 first:ps-0 mobile:nth-3:border-0 mobile:nth-3:ps-0">
        <span className="mb-2 block text-[11px] tracking-[0.14em] text-muted mobile:text-[10px] mobile:de:tracking-[0.07em] rtl:tracking-normal">{t("gateway")}</span>
        <strong className="block text-[25px] leading-[1.3] font-medium tablet:text-[21px] mobile:text-[22px] small:text-[19px]">{c("frankfurt")}</strong>
        <small className="mt-2 block text-[12px] text-muted tablet:text-[11px] mobile:max-w-[155px]">{t("gatewayNote")}</small>
      </div>
      <div className="border-s border-solid border-line ps-8 tablet:ps-5 first:border-0 first:ps-0 mobile:nth-3:border-0 mobile:nth-3:ps-0">
        <span className="mb-2 block text-[11px] tracking-[0.14em] text-muted mobile:text-[10px] mobile:de:tracking-[0.07em] rtl:tracking-normal">{t("direction")}</span>
        <strong className="block text-[25px] leading-[1.3] font-medium tablet:text-[21px] mobile:text-[22px] small:text-[19px]">{t("both")}</strong>
        <small className="mt-2 block text-[12px] text-muted tablet:text-[11px] mobile:max-w-[155px]">{t("bothNote")}</small>
      </div>
    </div>
  );
}
