"use client";
import { useTranslations } from "next-intl";
import { Logo } from "./Header";
export function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <Logo />
          <p>
            {t("regions")}
            <br />
            <span>{t("tagline")}</span>
          </p>
          <a href="#top">{t("top")}</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FRAJET Cargo</span>
          <span>{t("conceptNote")}</span>
        </div>
      </div>
    </footer>
  );
}
