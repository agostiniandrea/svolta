import { defineField, defineType } from "sanity";
import { BasketIcon } from "@sanity/icons";

export const dishType = defineType({
  name: "dish",
  title: "Dish",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localizedString",
      description: "Dish name in all languages",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      description: "Short description in all languages",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Starter", value: "antipasto" },
          { title: "First course", value: "primo" },
          { title: "Main course", value: "secondo" },
          { title: "Side", value: "contorno" },
          { title: "Dessert", value: "dolce" },
          { title: "Lunch special", value: "pranzo" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "allergens",
      title: "Allergens",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Gluten",
          "Soy",
          "Tree nuts",
          "Peanuts",
          "Sesame",
          "Celery",
          "Mustard",
          "Lupin",
        ],
      },
    }),
    defineField({
      name: "price",
      title: "Price (THB)",
      type: "number",
      description: "Price in Thai Baht",
      validation: (r) => r.min(0),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isAvailable",
      title: "Available",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name.en", subtitle: "category", media: "image" },
  },
});
