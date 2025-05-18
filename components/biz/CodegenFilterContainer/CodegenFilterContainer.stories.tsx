import type { Meta, StoryObj } from "@storybook/react"
import { CodegenList, JobItem } from "../CodegenList"
import { CodegenFilterContainer } from "./CodegenFilterContainer"

const meta = {
  title: "Biz/CodegenFilterContainer",
  component: CodegenFilterContainer,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CodegenFilterContainer>

export default meta
type Story = StoryObj<typeof CodegenFilterContainer>

const mockItems: JobItem[] = [
  {
    id: "1",
    title: "Button Component",
    description: "A customizable button component with various styles",
    fullStack: "React",
  },
  {
    id: "2",
    title: "Input Field",
    description: "A flexible input field with validation",
    fullStack: "Vue",
  },
  {
    id: "3",
    title: "Modal Dialog",
    description: "A modal dialog with customizable content",
    fullStack: "React",
  },
  {
    id: "4",
    title: "Dropdown Menu",
    description: "A dropdown menu with customizable content",
    fullStack: "Vue",
  },
  {
    id: "5",
    title: "Tooltip",
    description: "A tooltip with customizable content",
    fullStack: "React",
  },
  {
    id: "6",
    title: "Accordion",
    description: "An accordion component with customizable content",
    fullStack: "Vue",
  },
]

export const Default: Story = {
  args: {
    children: <CodegenList items={mockItems} />,
    hasMore: true,
    isLoading: false,
  },
}

export const Loading: Story = {
  args: {
    children: <CodegenList items={mockItems} />,
    hasMore: true,
    isLoading: true,
  },
}

export const NoMore: Story = {
  args: {
    children: <CodegenList items={mockItems} />,
    hasMore: false,
    isLoading: false,
  },
}

export const WithSearch: Story = {
  args: {
    children: <CodegenList items={mockItems} />,
    hasMore: true,
    searchKeyword: "button",
  },
}

export const WithStackFilter: Story = {
  args: {
    children: <CodegenList items={mockItems} />,
    hasMore: true,
    selectedStack: "React",
  },
}
