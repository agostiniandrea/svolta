import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const settingsType = defineType({
  name: "settings",
  title: "Impostazioni sito",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteName",
      title: "Nome sito",
      type: "string",
      initialValue: "SVOLTA",
    }),
    defineField({
      name: "siteDescription",
      title: "Descrizione breve",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "address",
      title: "Indirizzo",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "phone",
      title: "Telefono",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "openingHours",
      title: "Orari di apertura",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "deliveryInfo",
      title: "Info delivery",
      type: "text",
      rows: 3,
    }),
  ],
});
