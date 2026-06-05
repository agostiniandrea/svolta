import { renderWithIntl } from "../../test-utils/renderWithIntl";
import JsonLd from "./JsonLd";

describe("JsonLd", () => {
  it("renders a script tag with type application/ld+json", () => {
    const { container } = renderWithIntl(
      <JsonLd locale="en" siteUrl="https://svolta.it" />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
  });

  it("includes Restaurant @type in the schema", () => {
    const { container } = renderWithIntl(
      <JsonLd locale="en" siteUrl="https://svolta.it" />,
    );
    const script = container.querySelector('script[type="application/ld+json"]')!;
    const data = JSON.parse(script.textContent ?? "{}");
    expect(data["@type"]).toBe("Restaurant");
    expect(data.name).toBe("SVOLTA");
  });

  it("includes the correct menu URL", () => {
    const { container } = renderWithIntl(
      <JsonLd locale="it" siteUrl="https://svolta.it" />,
    );
    const script = container.querySelector('script[type="application/ld+json"]')!;
    const data = JSON.parse(script.textContent ?? "{}");
    expect(data.menu).toBe("https://svolta.it/it/menu");
  });
});
