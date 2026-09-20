"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

export function LegalModal({ title, intro, children }: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  const t = useTranslations("Legal");
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backdropPointer = useRef(false);
  const id = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    if (contentRef.current) contentRef.current.scrollTop = 0;
    headingRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="min-h-11 border-0 bg-transparent p-0 text-[13px] text-muted underline-offset-[5px] hover:text-text hover:underline"
        aria-haspopup="dialog"
        aria-controls={id}
        onClick={() => setOpen(true)}
      >
        {title}
      </button>
      <dialog
        ref={dialogRef}
        id={id}
        className="m-auto w-[min(760px,calc(100%_-_32px))] max-w-none max-h-[calc(100dvh_-_48px)] overflow-hidden border border-solid border-line border-t-[3px] border-t-blue bg-navy p-0 text-start text-text shadow-[0_32px_100px_#0008] open:flex open:flex-col open:animate-legal-enter backdrop:bg-[#060e1bcc] backdrop:backdrop-blur-[6px] legal-mobile:max-h-[calc(100dvh_-_24px)] motion-reduce:animate-none"
        aria-labelledby={`${id}-title`}
        onClose={() => setOpen(false)}
        onPointerDown={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          backdropPointer.current = event.clientX < bounds.left ||
            event.clientX > bounds.right || event.clientY < bounds.top ||
            event.clientY > bounds.bottom;
        }}
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom;
          if (backdropPointer.current && outside) setOpen(false);
          backdropPointer.current = false;
        }}
      >
        <header className="flex shrink-0 items-start justify-between gap-5 border-b border-solid border-line bg-surface px-8 pt-7 pb-6 legal-mobile:p-5">
          <div>
            <p className="mt-0 mb-[10px] text-[11px] tracking-[0.12em] text-muted uppercase [&_span]:mx-2 [&_span]:text-bright">FRAJET CARGO <span aria-hidden="true">/</span> {t("label")}</p>
            <h2 className="m-0 text-[clamp(28px,5vw,38px)] leading-[1.2] font-medium tracking-[-0.02em] rtl:leading-[1.45] rtl:tracking-normal" id={`${id}-title`} ref={headingRef} tabIndex={-1}>{title}</h2>
          </div>
          <button className="grid size-11 shrink-0 place-items-center border border-solid border-line bg-transparent p-0 text-text hover:border-bright hover:bg-surface" type="button" aria-label={t("close")} onClick={() => setOpen(false)}>
            <X size={22} aria-hidden="true" />
          </button>
        </header>
        <div className="min-h-0 overflow-y-auto overscroll-contain px-8 pt-7 pb-8 text-[16px] leading-[1.7] [overflow-wrap:anywhere] [scrollbar-color:var(--color-blue)_var(--color-navy)] legal-mobile:p-5" ref={contentRef} tabIndex={0} role="region" aria-label={title}>
          <aside className="border-s-2 border-solid border-bright bg-surface px-5 py-4 text-[14px] text-muted [&_strong]:font-medium [&_strong]:text-bright [&_p]:mt-[6px] [&_p]:mb-0">
            <strong>{t("draftTitle")}</strong>
            <p>{t("draftNotice")}</p>
          </aside>
          <p className="my-6 text-muted">{intro}</p>
          {children}
        </div>
        <footer className="flex shrink-0 items-center justify-between gap-5 border-t border-solid border-line px-8 py-4 text-[13px] text-muted legal-mobile:px-5 legal-mobile:py-3">
          <span>FRAJET Cargo</span>
          <button type="button" className="min-h-11 border border-solid border-line bg-transparent px-5 py-2 text-[14px] text-text hover:border-bright hover:bg-surface" onClick={() => setOpen(false)}>{t("close")}</button>
        </footer>
      </dialog>
    </>
  );
}
