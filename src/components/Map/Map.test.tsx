import { screen } from "@testing-library/react";
import { renderWithIntl } from "../../test-utils/renderWithIntl";
import Map from "./Map";

describe("Map", () => {
  it("renders an iframe with the correct title", () => {
    renderWithIntl(<Map title="Find us on the map" />);
    const iframe = screen.getByTitle("Find us on the map");
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe("IFRAME");
  });

  it("sets loading=lazy on the iframe", () => {
    renderWithIntl(<Map title="Find us" />);
    expect(screen.getByTitle("Find us")).toHaveAttribute("loading", "lazy");
  });
});
