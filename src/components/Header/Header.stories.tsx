import type { Meta, StoryObj } from "@storybook/nextjs";
import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const OnMenuPage: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/th/menu" } },
  },
};

export const OnConceptPage: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/th/concept" } },
  },
};
