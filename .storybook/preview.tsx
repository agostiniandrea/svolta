import React from "react";
import type { Preview } from "@storybook/nextjs";
import { NextIntlClientProvider } from "next-intl";
import en from "../messages/en.json";
import "../src/app/globals.css";

const StorybookFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap');
    :root {
      --font-playfair: "Playfair Display", Georgia, serif;
      --font-dm-sans: "DM Sans", system-ui, sans-serif;
    }
  `}</style>
);

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

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "cream",
      values: [
        { name: "cream", value: "#faf9f4" },
        { name: "white", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={en}>
        <StorybookFonts />
        <div style={{ fontFamily: "var(--font-dm-sans, system-ui, sans-serif)" }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;
