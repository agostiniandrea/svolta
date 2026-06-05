import { screen } from "@testing-library/react";
import { renderWithIntl } from "../../test-utils/renderWithIntl";
import Header from "./Header";

describe("Header", () => {
  it("renders the SVOLTA logo", () => {
    renderWithIntl(<Header />);
    expect(screen.getByText("SVOLTA")).toBeInTheDocument();
  });

  it("renders all desktop nav links", () => {
    renderWithIntl(<Header />);
    const nav = screen.getByRole("navigation", { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
    expect(nav.querySelectorAll("a").length).toBeGreaterThanOrEqual(4);
  });

  it("renders the mobile menu button", () => {
    renderWithIntl(<Header />);
    // Mock returns translation key, so aria-label is "openMenu"
    const btn = screen.getByRole("button", { name: /openMenu/i });
    expect(btn).toBeInTheDocument();
  });

  it("renders locale switcher", () => {
    renderWithIntl(<Header />);
    // Mock returns translation key, so aria-label is "switchLocale"
    const group = screen.getByRole("group", { name: /switchLocale/i });
    expect(group).toBeInTheDocument();
  });
});
