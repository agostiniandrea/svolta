import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["th", "en", "it"],
  defaultLocale: "th",
  // All locales use an explicit prefix:
  //   /th      → Thai
  //   /en      → English
  //   /it      → Italian
  //   /        → redirect to /th
  localePrefix: "always",
});
