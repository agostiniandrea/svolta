import { jest } from "@jest/globals";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: "/",
    query: {},
  }),
  usePathname: () => "/th",
  useSearchParams: () => new URLSearchParams(),
  notFound: jest.fn(),
}));

jest.mock("next/font/google", () => ({
  Playfair_Display: () => ({ variable: "__font_playfair", className: "__font_playfair" }),
  DM_Sans: () => ({ variable: "__font_dm_sans", className: "__font_dm_sans" }),
}));

jest.mock("next-intl/routing", () => ({
  defineRouting: (config: unknown) => config,
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
});
