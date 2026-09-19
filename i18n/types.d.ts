import en from "@/i18n/dictionaries/en.json";
import type { Locale } from "./config";
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof en;
  }
}
