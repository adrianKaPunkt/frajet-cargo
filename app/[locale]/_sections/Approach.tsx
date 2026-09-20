"use client";
import { useTranslations } from "next-intl";
import { Box, Route, MessagesSquare } from "lucide-react";
export function Approach() {
  const a = useTranslations("Approach");
  return (
    <section id="approach" className="py-[105px] mobile:py-[70px] pb-[110px] mobile:pb-[70px]">
      <div className="mx-auto w-[min(1280px,calc(100%_-_112px))] tablet:w-[calc(100%_-_64px)] mobile:w-[calc(100%_-_40px)]">
        <div className="mb-[45px] flex items-end justify-between gap-20 tablet:gap-[45px] mobile:mb-[30px] mobile:block [&_h2]:m-0 [&>p]:mt-0 [&>p]:mb-[3px] [&>p]:max-w-[360px] [&>p]:text-[17px] [&>p]:text-muted mobile:[&>p]:mt-6 mobile:[&>p]:max-w-[500px]">
          <div>
            <p className="mb-6 text-[12px] leading-[1.5] font-medium tracking-[0.18em] text-bright mobile:mb-[18px] mobile:text-[10px] mobile:tracking-[0.16em] rtl:tracking-normal mobile:rtl:tracking-normal">{a("eyebrow")}</p>
            <h2 className="mb-[26px] text-[clamp(35px,3.25vw,49px)] leading-[1.15] font-normal tracking-[-0.02em] mobile:text-[37px] rtl:leading-[1.45] rtl:tracking-normal [&_span]:text-muted">
              {a("title")}
              <br />
              <span>{a("subtitle")}</span>
            </h2>
          </div>
          <p>{a("intro")}</p>
        </div>
        <div className="mt-[55px] grid grid-cols-3 gap-11 mobile:mt-[35px] mobile:grid-cols-1 mobile:gap-[25px] [&_article]:border-t [&_article]:border-solid [&_article]:border-line [&_article]:pt-7 mobile:[&_article]:grid mobile:[&_article]:grid-cols-[40px_1fr] mobile:[&_article]:gap-x-[15px] mobile:[&_article]:gap-y-0 mobile:[&_article]:pt-[25px] [&_svg]:mb-6 [&_svg]:size-[29px] [&_svg]:stroke-[1.25] [&_svg]:text-[#83abe2] mobile:[&_svg]:row-span-2 mobile:[&_svg]:my-[5px] [&_h3]:mb-[14px] [&_h3]:text-[23px] [&_h3]:font-normal mobile:[&_h3]:mb-[10px] mobile:[&_h3]:text-[22px] [&_p]:max-w-[340px] [&_p]:text-[16px] [&_p]:text-muted mobile:[&_p]:col-start-2 mobile:[&_p]:max-w-full">
          <article>
            <Route />
            <h3>{a("corridorTitle")}</h3>
            <p>{a("corridorText")}</p>
          </article>
          <article>
            <Box />
            <h3>{a("capacityTitle")}</h3>
            <p>{a("capacityText")}</p>
          </article>
          <article>
            <MessagesSquare />
            <h3>{a("personalTitle")}</h3>
            <p>{a("personalText")}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
