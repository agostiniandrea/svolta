import { defineField, defineType } from "sanity";
import { UtensilCrossedIcon } from "@sanity/icons";

export const dishType = defineType({
  name: "dish",
  title: "Piatto",
  type: "document",
  icon: UtensilCrossedIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Antipasto", value: "antipasto" },
          { title: "Primo", value: "primo" },
          { title: "Secondo", value: "secondo" },
          { title: "Contorno", value: "contorno" },
          { title: "Dolce", value: "dolce" },
          { title: "Pranzo del giorno", value: "pranzo" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "allergens",
      title: "Allergeni",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Glutine",
          "Soia",
          "Frutta a guscio",
          "Arachidi",
          "Sesamo",
          "Sedano",
          "Senape",
          "Lupini",
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Immagine",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isAvailable",
      title: "Disponibile",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
  },
});
