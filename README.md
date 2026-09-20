# FRAJET Cargo

Modular Next.js 15 / React 19 / TypeScript landing page. Fully translated English and German via next-intl. English remains at `/`; `/en/` is an explicit English alias and `/de/` is German.

## Run locally

```bash
npm ci
npm run dev
```

Production validation: `npm run build`. The project exports a static site to `out/`. Serve that folder with a static server; `next start` is not used with static export.

## Structure

- `app/layout.tsx`: shared root layout for client-side language navigation
- `components/LocaleDocument.tsx`: route-aware document language and text direction
- `app/[locale]/page.tsx`: shared landing page composition
- `app/[locale]/_sections/`: Hero, Facts, Corridor, Aircraft, Approach and EnquiryForm
- `app/(default)/`: original English route, reusing the locale page composition
- `app/[locale]/`: statically generated locale routes and metadata
- `i18n/dictionaries/en.json`, `i18n/dictionaries/de.json`: complete translation dictionaries
- `i18n/`: locale registry, metadata and typed next-intl configuration
- `app/globals.css`: Tailwind theme, local fonts, responsive variants and global accessibility defaults
- `components/`: shared Header, Footer and LocaleProvider
- `lib/site.ts`: contact configuration and destination data
- `public/`: locally hosted brand assets, fonts and imagery

## Tailwind CSS

Tailwind CSS v4 runs through `@tailwindcss/postcss` in `postcss.config.mjs`.
All page sections and shared components use static Tailwind utilities in their TSX files,
including responsive layouts, interaction states and RTL adjustments. `app/globals.css`
contains only the theme, local fonts, base styles, animation and shared variants.

Brand utilities include `bg-navy`, `bg-surface`, `bg-blue`, `text-bright`, `text-muted`
and `border-line`. `font-sans` and `font-mono` adapt to the current writing direction.
The existing inclusive breakpoints are preserved as `tablet:` (≤1100px), `mobile:`
(≤800px), `small:` (≤420px) and `tiny:` (≤360px). `nav-tablet:`, `nav-wrap:`,
`hero-wide:` and `legal-mobile:` cover the existing specific layouts; `de:` and `rtl:`
handle language-specific adjustments. Standard Tailwind variants also work.

Preflight remains omitted to preserve the existing browser defaults. Base border widths
are zeroed so directional border utilities can be used without adding borders on other sides.

## Brand reference

FRAJET wordmark and blue/navy/white direction were taken from the provided FRAJET MRO exposé in the existing ChatGPT project (19 August 2026). The wordmark is extracted from the PDF cover; replace with the original vector master when available. Cargo is a separate text descriptor. No MRO approvals, certifications or operational claims are transferred to Cargo.

## Enquiry behavior

The form validates required contact and shipment fields, presents a review, and downloads a plain-text enquiry. **Nothing is transmitted or stored on a server.** On an explicit language switch only, an unsent form draft is briefly transferred through sessionStorage and consumed immediately by the destination page. It is never stored persistently. The email address is intentionally empty in `lib/site.ts` until the business confirms it. Setting it enables a `mailto:` handoff after review. This opens the visitor's email client; it is not an integrated server-side email service.

For a later submission endpoint, remove static export if using Next.js route handlers, or connect an external endpoint. Add server-side validation, rate limiting and an approved privacy notice for that integration. Avoid storing shipment personal data unnecessarily.

## Content and launch preparation

- Footer legal notice and privacy dialogs are design drafts, clearly labelled in EN/DE/Dari. Replace the `Legal` content in each `i18n/dictionaries/*.json` with approved operator details and legal texts before publication; then remove the draft notice in `components/legal/LegalModal.tsx`. The shared dialog handles keyboard focus, Escape, backdrop dismissal and background scroll locking.
- Boeing 757-200F only; up to 25 tonnes **marketable** capacity per flight.
- Frankfurt-centred Europe–Kabul/Herat corridor, both directions.
- No schedules, flight numbers, live capacity, booking or unverified regulatory/certification claims.
- Imagery is an explicitly labelled AI-generated concept, **not a verified fleet photograph or technical aircraft drawing**. Replace with an approved actual 757-200F image for final operational launch.
- Confirm the business contact, legal entity details, privacy/legal content, operational route wording and final aircraft image before a public launch. Private review version uses `noindex`.
- Fonts are hosted locally. Their OFL licenses are in `public/fonts/`.
- The corridor map uses Natural Earth country geometry via datasets/geo-countries (public domain); the arcs are illustrative corridor lines, not flight paths. https://github.com/datasets/geo-countries

## Validation

Production build includes TypeScript validation. Browser QA covers desktop/mobile overflow, image loading, destination switching, mobile navigation, required field validation, English/German navigation, localized enquiry review/download and retaining a draft on language changes.

## Extending i18n

Add a dictionary matching `i18n/dictionaries/en.json`, register its locale, display name and dictionary in `i18n/config.ts`, and add its language alternate in `i18n/metadata.ts`. Types enforce matching message keys. All visitor copy, accessible labels, page metadata, request summaries and route labels are localized. Dates and numbers use next-intl locale formatting. New locales are statically generated at build time; no middleware or server is required. The locale in the URL survives reloads and is shareable.

The current EN/DE languages use left-to-right layout. For a future Dari/Pashto version, also add RTL direction and visually verify the design with native translations.

## Aircraft branding edit

`public/aircraft-branded.png` was produced with the built-in Imagegen tool using `aircraft-concept.png` as the edit target and `frajet-logo.png` as the exact logo reference. It replaces the displayed image in both sections; the original concept remains available. The prompt and provenance are in `ASSET-NOTES.md`.
