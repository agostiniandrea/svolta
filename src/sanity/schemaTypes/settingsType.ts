import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const settingsType = defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      initialValue: "SVOLTA",
    }),
    defineField({
      name: "siteDescription",
      title: "Short description",
      type: "localizedText",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "openingHours",
      title: "Opening hours",
      type: "localizedText",
    }),
    defineField({
      name: "deliveryInfo",
      title: "Delivery info",
      type: "localizedText",
    }),
  ],
});
