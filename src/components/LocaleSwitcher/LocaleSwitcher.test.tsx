import { screen } from "@testing-library/react";
import { renderWithIntl } from "../../test-utils/renderWithIntl";
import LocaleSwitcher from "./LocaleSwitcher";

describe("LocaleSwitcher", () => {
  it("renders a group with accessible label", () => {
    renderWithIntl(<LocaleSwitcher />);
    // Mock returns translation key as-is
    expect(screen.getByRole("group", { name: /switchLocale/i })).toBeInTheDocument();
  });

  it("renders th, en, it locale options", () => {
    renderWithIntl(<LocaleSwitcher />);
    expect(screen.getByText("th")).toBeInTheDocument();
    expect(screen.getByText("en")).toBeInTheDocument();
    expect(screen.getByText("it")).toBeInTheDocument();
  });

  it("marks the current locale as aria-current", () => {
    renderWithIntl(<LocaleSwitcher />);
    const current = screen.getByText("en");
    expect(current).toHaveAttribute("aria-current", "true");
  });
});
