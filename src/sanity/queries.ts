import { groq } from "next-sanity";

export type LocalizedValue = {
  th?: string | null;
  en?: string | null;
  it?: string | null;
};

export type SanityDish = {
  _id: string;
  name: LocalizedValue;
  description?: LocalizedValue | null;
  category: string;
  allergens?: string[] | null;
  isAvailable: boolean;
  imageUrl?: string | null;
};

export type ActiveMenu = {
  _id: string;
  title?: LocalizedValue | null;
  note?: LocalizedValue | null;
  dishes?: SanityDish[] | null;
};

export type SanitySettings = {
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  openingHours?: LocalizedValue | null;
};

export const activeMenuQuery = groq`
  *[_type == "menu" && isActive == true][0] {
    _id,
    title,
    note,
    dishes[]-> {
      _id,
      name,
      description,
      category,
      allergens,
      isAvailable,
      "imageUrl": image.asset->url
    }
  }
`;

export const settingsQuery = groq`
  *[_type == "settings"][0] {
    address,
    phone,
    email,
    openingHours
  }
`;
