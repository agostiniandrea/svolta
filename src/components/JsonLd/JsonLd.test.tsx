import { renderWithIntl } from "../../test-utils/renderWithIntl";
import JsonLd from "./JsonLd";

function parseSchema(container: HTMLElement) {
  const script = container.querySelector('script[type="application/ld+json"]')!;
  return JSON.parse(script.textContent ?? "{}");
}

describe("JsonLd", () => {
  it("renders a script tag with type application/ld+json", () => {
    const { container } = renderWithIntl(<JsonLd siteUrl="https://svolta.it" />);
    expect(
      container.querySelector('script[type="application/ld+json"]'),
    ).toBeInTheDocument();
  });

  it("describes a website, not a restaurant", () => {
    const { container } = renderWithIntl(<JsonLd siteUrl="https://svolta.it" />);
    const data = parseSchema(container);
    // SVOLTA is a concept. Claiming a Restaurant here would tell search engines
    // a business operates at a real address in Bangkok.
    expect(data["@type"]).toBe("WebSite");
    expect(data.name).toBe("SVOLTA");
    expect(data.url).toBe("https://svolta.it");
  });

  it("publishes no address, opening hours or map for a place that does not exist", () => {
    const { container } = renderWithIntl(<JsonLd siteUrl="https://svolta.it" />);
    const data = parseSchema(container);
    expect(data.address).toBeUndefined();
    expect(data.openingHoursSpecification).toBeUndefined();
    expect(data.hasMap).toBeUndefined();
    expect(data.menu).toBeUndefined();
  });
});
