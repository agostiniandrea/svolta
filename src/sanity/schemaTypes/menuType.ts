import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const menuType = defineType({
  name: "menu",
  title: "Seasonal Menu",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Season title",
      type: "localizedString",
      description: "e.g. { en: 'Spring Menu 2026', it: 'Menu Primavera 2026', th: 'เมนูฤดูใบไม้ผลิ 2026' }",
    }),
    defineField({
      name: "season",
      title: "Season",
      type: "string",
      options: {
        list: [
          { title: "Spring", value: "primavera" },
          { title: "Summer", value: "estate" },
          { title: "Autumn", value: "autunno" },
          { title: "Winter", value: "inverno" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isActive",
      title: "Active menu",
      type: "boolean",
      description: "The current menu shown on the website",
      initialValue: false,
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
    }),
    defineField({
      name: "note",
      title: "Seasonal intro",
      type: "localizedText",
      description: "Introductory text for the seasonal menu (optional)",
    }),
    defineField({
      name: "dishes",
      title: "Dishes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
    }),
  ],
  preview: {
    select: { title: "title.en", isActive: "isActive" },
    prepare({ title, isActive }) {
      return {
        title: title ?? "Untitled menu",
        subtitle: isActive ? "✓ Active" : "Archived",
      };
    },
  },
});
