import { act } from "react";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "../../test-utils/renderWithIntl";
import OpenNowBadge from "./OpenNowBadge";

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

function setTime(isoUtc: string) {
  jest.setSystemTime(new Date(isoUtc));
}

describe("OpenNowBadge", () => {
  it("shows open state on Tuesday afternoon Bangkok time", async () => {
    setTime("2025-01-07T06:00:00Z"); // Tue 13:00 BKK
    const { container } = renderWithIntl(<OpenNowBadge />);
    await act(async () => {});
    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByText("open")).toBeInTheDocument();
  });

  it("shows closed on Monday", async () => {
    setTime("2025-01-06T06:00:00Z"); // Mon 13:00 BKK
    const { container } = renderWithIntl(<OpenNowBadge />);
    await act(async () => {});
    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByText("closed")).toBeInTheDocument();
  });

  it("shows closed before opening time", async () => {
    setTime("2025-01-07T02:00:00Z"); // Tue 09:00 BKK (before 11:30)
    const { container } = renderWithIntl(<OpenNowBadge />);
    await act(async () => {});
    expect(screen.getByText("closed")).toBeInTheDocument();
  });

  it("shows closed after closing time", async () => {
    setTime("2025-01-07T14:30:00Z"); // Tue 21:30 BKK (after 21:00)
    const { container } = renderWithIntl(<OpenNowBadge />);
    await act(async () => {});
    expect(screen.getByText("closed")).toBeInTheDocument();
  });
});
