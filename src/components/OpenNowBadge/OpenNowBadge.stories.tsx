import type { Meta, StoryObj } from "@storybook/nextjs";
import OpenNowBadge from "./OpenNowBadge";

const meta: Meta<typeof OpenNowBadge> = {
  title: "Components/OpenNowBadge",
  component: OpenNowBadge,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof OpenNowBadge>;

export const Open: Story = {
  beforeEach() {
    // Tuesday 13:00 Bangkok time (UTC+7 = 06:00 UTC)
    const mockDate = new Date("2025-01-07T06:00:00Z");
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  },
  afterEach() {
    jest.useRealTimers();
  },
};

export const Closed: Story = {
  beforeEach() {
    // Monday 13:00 Bangkok time
    const mockDate = new Date("2025-01-06T06:00:00Z");
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  },
  afterEach() {
    jest.useRealTimers();
  },
};

export const ClosedAfterHours: Story = {
  beforeEach() {
    // Tuesday 22:00 Bangkok time (15:00 UTC)
    const mockDate = new Date("2025-01-07T15:00:00Z");
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  },
  afterEach() {
    jest.useRealTimers();
  },
};

export const OpenDark: Story = {
  args: { dark: true },
  parameters: { backgrounds: { default: "dark" } },
  beforeEach() {
    const mockDate = new Date("2025-01-07T06:00:00Z");
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  },
  afterEach() {
    jest.useRealTimers();
  },
};

export const ClosedDark: Story = {
  args: { dark: true },
  parameters: { backgrounds: { default: "dark" } },
  beforeEach() {
    const mockDate = new Date("2025-01-06T06:00:00Z");
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  },
  afterEach() {
    jest.useRealTimers();
  },
};
