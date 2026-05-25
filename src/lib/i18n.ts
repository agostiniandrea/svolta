export type LocalizedString = {
  th?: string;
  en?: string;
  it?: string;
};

export type Locale = "th" | "en" | "it";

export function getLocalized(
  field: LocalizedString | undefined | null,
  locale: string
): string {
  if (!field) return "";
  return (
    field[locale as Locale] ??
    field.en ??
    field.th ??
    ""
  );
}
