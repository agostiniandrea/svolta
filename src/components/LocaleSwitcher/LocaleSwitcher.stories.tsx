import type { Meta, StoryObj } from "@storybook/nextjs";
import LocaleSwitcher from "./LocaleSwitcher";

const meta: Meta<typeof LocaleSwitcher> = {
  title: "Components/LocaleSwitcher",
  component: LocaleSwitcher,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof LocaleSwitcher>;

export const Default: Story = {};

export const OnItalianLocale: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/it/menu" } },
  },
};
