import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const menuType = defineType({
  name: "menu",
  title: "Menu stagionale",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titolo stagione",
      type: "string",
      placeholder: "es. Menu Primavera 2026",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "season",
      title: "Stagione",
      type: "string",
      options: {
        list: [
          { title: "Primavera", value: "primavera" },
          { title: "Estate", value: "estate" },
          { title: "Autunno", value: "autunno" },
          { title: "Inverno", value: "inverno" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isActive",
      title: "Menu attivo",
      type: "boolean",
      description: "Il menu corrente mostrato sul sito",
      initialValue: false,
    }),
    defineField({
      name: "startDate",
      title: "Inizio validità",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "Fine validità",
      type: "date",
    }),
    defineField({
      name: "note",
      title: "Intro stagionale",
      type: "text",
      rows: 3,
      description: "Testo introduttivo per il menu di stagione (opzionale)",
    }),
    defineField({
      name: "dishes",
      title: "Piatti",
      type: "array",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
    }),
  ],
  preview: {
    select: { title: "title", isActive: "isActive" },
    prepare({ title, isActive }) {
      return {
        title,
        subtitle: isActive ? "✓ Attivo" : "Archiviato",
      };
    },
  },
});
