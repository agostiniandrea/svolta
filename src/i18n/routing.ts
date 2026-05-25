import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["th", "en", "it"],
  defaultLocale: "th",
  // URL senza prefisso per la lingua default (th):
  //   /        → Thai
  //   /en      → English
  //   /it      → Italiano
  localePrefix: "as-needed",
});
