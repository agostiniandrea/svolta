import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["th", "en", "it"],
  defaultLocale: "th",
  // Tutte le lingue hanno un prefisso esplicito:
  //   /th      → Thai
  //   /en      → English
  //   /it      → Italiano
  //   /        → redirect a /th
  localePrefix: "always",
});
