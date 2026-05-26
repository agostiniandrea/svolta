import { defineType } from "sanity";

export const localizedStringType = defineType({
  name: "localizedString",
  title: "Multilingual text",
  type: "object",
  fields: [
    { name: "th", type: "string", title: "ภาษาไทย (Thai)" },
    { name: "en", type: "string", title: "English" },
    { name: "it", type: "string", title: "Italiano" },
  ],
  preview: {
    select: { title: "en", subtitle: "th" },
  },
});

export const localizedTextType = defineType({
  name: "localizedText",
  title: "Multilingual long text",
  type: "object",
  fields: [
    { name: "th", type: "text", title: "ภาษาไทย (Thai)", rows: 3 },
    { name: "en", type: "text", title: "English", rows: 3 },
    { name: "it", type: "text", title: "Italiano", rows: 3 },
  ],
  preview: {
    select: { title: "en", subtitle: "th" },
  },
});
