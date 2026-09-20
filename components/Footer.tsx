"use client";
import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { LegalLinks } from "./legal/LegalLinks";
export function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="pt-[50px] pb-6 mobile:pt-[35px]">
      <div className="mx-auto w-[min(1280px,calc(100%_-_112px))] tablet:w-[calc(100%_-_64px)] mobile:w-[calc(100%_-_40px)]">
        <div className="flex items-center justify-between gap-[30px] pb-[45px] mobile:flex-wrap mobile:gap-7 mobile:pb-[25px] [&>p]:m-0 [&>p]:text-[12px] [&>p]:tracking-[0.12em] mobile:[&>p]:hidden rtl:[&>p]:tracking-normal [&>p>span]:text-muted [&>a]:text-[13px] [&>a]:text-muted">
          <div className="flex flex-col items-start gap-[18px]">
            <Logo variant="dark" />
            <address className="text-base leading-[1.6] text-muted not-italic" dir="ltr">
              CargoCity Süd
              <br />
              Gebäude 581
              <br />
              60549 Frankfurt am Main
            </address>
          </div>
          <p>
            {t("regions")}
            <br />
            <span>{t("tagline")}</span>
          </p>
          <a href="#top">{t("top")}</a>
        </div>
        <div className="flex justify-center">
          <LegalLinks />
        </div>
        <div className="flex justify-between gap-5 border-t border-solid border-line pt-[23px] text-[11px] text-[#8999b0] mobile:flex-col mobile:gap-[7px]">
          <span>© {new Date().getFullYear()} FRAJET Cargo</span>
          <span>{t("conceptNote")}</span>
        </div>
      </div>
    </footer>
  );
}
