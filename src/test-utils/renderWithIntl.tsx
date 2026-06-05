import * as React from "react";
import { render, type RenderResult } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { act } from "react";
import en from "../../messages/en.json";

type Messages = typeof en;
type Options = { locale?: "en" | "it" | "th"; messages?: Messages };

export const renderWithIntl = (
  ui: React.ReactElement,
  { locale = "en", messages = en }: Options = {},
): RenderResult => {
  let renderer!: RenderResult;
  act(() => {
    renderer = render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        {ui}
      </NextIntlClientProvider>,
    );
  });
  return renderer;
};
