import type { Meta, StoryObj } from "@storybook/nextjs";
import Map from "./Map";

const meta: Meta<typeof Map> = {
  title: "Components/Map",
  component: Map,
  parameters: { layout: "centered" },
  args: { title: "Find us on the map" },
};

export default meta;
type Story = StoryObj<typeof Map>;

export const Default: Story = {};
