"use client";

import { useTranslations } from "next-intl";

type LogoProps = {
  variant?: "light" | "dark";
};

export function Logo({ variant = "light" }: LogoProps) {
  const t = useTranslations("Common");

  return (
    <a className="flex shrink-0 items-center gap-5 [direction:ltr] [unicode-bidi:isolate] tablet:gap-[10px] mobile:gap-2" href="#top" aria-label={t("home")}>
      <svg
        className="h-auto w-[173px] tablet:w-[143px] nav-tablet:w-[125px] mobile:w-[125px] tiny:w-[100px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 283.23 44.83"
        width="283.23"
        height="44.83"
        aria-hidden="true"
        focusable="false"
      >
        <polygon fill="#1969b1" points="265.57 43.15 258.37 43.19 258.35 8.73 244.23 8.72 244.21 1.82 282.4 1.84 277.04 8.73 265.56 8.74 265.57 43.15" />
        <polygon fill="#1969b1" points="228.78 26.03 208.79 26.08 208.85 36.42 235.39 36.42 235.38 43.23 201.58 43.24 201.58 1.83 236.32 1.89 232.45 8.72 208.82 8.73 208.79 19.32 228.75 19.34 228.78 26.03" />
        <path fill="#1969b1" d="M167.73,41.62c-3.9-2.07-6.24-5.61-7.39-9.75l7.51-.06c1.31,4.25,5.55,6.38,9.81,5.1,3.31-1,5.53-3.68,5.53-7.27V1.86s7.28-.06,7.28-.06l-.02,28.18c0,4.34-2.25,8.27-5.77,10.71-4.96,3.45-11.52,3.83-16.95.93Z" />
        <polygon fill={variant === "dark" ? "#ffffff" : "#111a2c"} points="143.97 37.14 131.85 15.31 116.47 43.17 108.31 43.17 131.79 1.45 137.43 11.41 155.44 43.18 147.31 43.26 143.97 37.14" />
        <path fill={variant === "dark" ? "#ffffff" : "#111a2c"} d="M78.53,21.48l11.15-.21c3.64-.07,6.21-3.08,6.14-6.6-.03-3.27-2.49-5.95-5.87-5.94l-16.8.02v34.44s-7.21.06-7.21.06V1.8s24.35.03,24.35.03c4.11,0,7.67,2.12,10.07,5.22,2.49,3.85,3.05,8.52,1.38,12.76-1.69,4.29-5.12,6.9-9.77,7.83l12.17,15.58-8.58.02-17.02-21.75Z" />
        <path fill={variant === "dark" ? "#ffffff" : "#111a2c"} d="M12.29,43.19H2.07c1.39-5.52.05-9.19,5.86-10.24h15.63s-6.14,7.8-6.14,7.8c-1.33,1.69-3.18,2.47-5.12,2.44Z" />
        <path fill="#1969b1" d="M8.25,27.23c-1.15,0-1.86.19-2.93.84l1.44-7.49c.35-1.84,3.14-3.33,5.25-3.33h29.33s-6.86,7.8-6.86,7.8c-1.22,1.39-2.95,1.98-4.7,2.2H8.25Z" />
        <path fill="#1969b1" d="M28.11,11.81H11.16c-1.02,0-1.72.7-2.73,1.19.73-3.1,1.1-6.73,3.67-9.01,1.32-1.18,3.12-2.01,5.09-2.01h41.52s-6.39,6.58-6.39,6.58c-2.07,2.14-4.67,3.52-7.9,3.23l-16.31.02Z" />
      </svg>
      <span className="border-s border-solid border-[#ffffff40] ps-[19px] text-[14px] tracking-[0.24em] tablet:ps-3 tablet:text-[12px] nav-tablet:text-[11px] mobile:ps-[9px] mobile:text-[10px] tiny:text-[9px] tiny:tracking-[0.16em] small:[header_&]:hidden">CARGO</span>
    </a>
  );
}
