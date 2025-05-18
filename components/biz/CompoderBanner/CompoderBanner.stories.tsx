import type { Meta, StoryObj } from "@storybook/react"
import { CompoderBanner } from "./CompoderBanner"

const meta: Meta<typeof CompoderBanner> = {
  title: "Biz/CompoderBanner",
  component: CompoderBanner,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    description: { control: "text" },
    showGithubStar: { control: "boolean" },
    githubUrl: { control: "text" },
    tagline: { control: "text" },
    cyberpunkLevel: {
      control: { type: "select" },
      options: ["low", "medium", "high"],
    },
    matrixDensity: { control: { type: "range", min: 10, max: 100, step: 5 } },
    glowColor: { control: "color" },
    actionButtonLabel: { control: "text" },
    cornerStyle: {
      control: { type: "select" },
      options: ["squared", "angled", "rounded"],
    },
    colorTheme: {
      control: { type: "select" },
      options: ["blue", "purple", "blueviolet"],
    },
    enableFlickerEffect: { control: "boolean" },
    enableNeonTextEffect: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof CompoderBanner>

export const Default: Story = {
  args: {
    title: "Compoder",
    subtitle: "AI-Powered Component Code Generator",
    description:
      "Your Stack, Your UI - AI-Powered Component Code Generator for Every Frontend Engineer",
    showGithubStar: true,
    githubUrl: "https://github.com/yourusername/compoder",
    tagline: "Generate component code in seconds",
    cyberpunkLevel: "medium",
    matrixDensity: 50,
    actionButtonLabel: "Get Started",
    cornerStyle: "angled",
    colorTheme: "blueviolet",
    enableFlickerEffect: false,
    enableNeonTextEffect: false,
  },
}

export const HighCyberpunk: Story = {
  args: {
    ...Default.args,
    cyberpunkLevel: "high",
    matrixDensity: 80,
    glowColor: "#00ffff",
  },
}

export const BlueTheme: Story = {
  args: {
    ...Default.args,
    colorTheme: "blue",
    cyberpunkLevel: "medium",
    enableNeonTextEffect: true,
  },
}

export const PurpleTheme: Story = {
  args: {
    ...Default.args,
    colorTheme: "purple",
    cyberpunkLevel: "medium",
    enableNeonTextEffect: true,
  },
}

export const MaxCyberEffect: Story = {
  args: {
    ...Default.args,
    colorTheme: "blueviolet",
    cyberpunkLevel: "high",
    matrixDensity: 80,
    enableFlickerEffect: true,
    enableNeonTextEffect: true,
    cornerStyle: "angled",
  },
}

export const LowCyberpunk: Story = {
  args: {
    ...Default.args,
    cyberpunkLevel: "low",
    matrixDensity: 20,
    cornerStyle: "rounded",
  },
}

export const CustomContent: Story = {
  args: {
    ...Default.args,
    title: "Compoder Pro",
    subtitle: "Enterprise Component Generator",
    description:
      "Build professional UI components with AI assistance for teams and organizations",
    tagline: "Scale your design system effortlessly",
    actionButtonLabel: "Try Compoder Pro",
  },
}
