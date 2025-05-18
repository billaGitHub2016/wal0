import type { Meta, StoryObj } from "@storybook/react"
import { AppHeader } from "./AppHeader"
import { SidebarProvider } from "@/components/ui/sidebar"

const meta = {
  title: "Biz/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof AppHeader>

export default meta
type Story = StoryObj<typeof AppHeader>

export const Default: Story = {
  args: {
    breadcrumbs: [
      { label: "Building Your Application", href: "#" },
      { label: "Data Fetching" },
    ],
  },
}

export const MultipleLevels: Story = {
  args: {
    breadcrumbs: [
      { label: "Documentation", href: "#" },
      { label: "Building Your Application", href: "#" },
      { label: "Data Fetching", href: "#" },
      { label: "REST API" },
    ],
  },
}

export const SingleLevel: Story = {
  args: {
    breadcrumbs: [{ label: "Dashboard" }],
  },
}
