import type { Meta, StoryObj } from "@storybook/react"
import { ProviderModelViewer } from "./index"
import { Providers, Model } from "./interface"

/**
 * ProviderModelViewer component displays a list of available providers and their models
 */
const meta: Meta<typeof ProviderModelViewer> = {
  title: "Biz/ProviderModelViewer",
  component: ProviderModelViewer,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ProviderModelViewer>

// Mock data based on config.json structure
const mockProviders: Providers = {
  openai: {
    provider: "openai",
    models: [
      {
        model: "anthropic/claude-3.7-sonnet",
        title: "Claude 3.7 Sonnet (OpenRouter)",
        baseURL: "https://openrouter.ai/api/v1",
        apiKey:
          "sk-or-v1-130351e3f317c1ce9054d0cf899ac7b1d3e8af9d397618fd3382786d",
      },
      {
        model: "anthropic/claude-3.5-sonnet",
        title: "Claude 3.5 Sonnet (OpenRouter)",
        baseURL: "https://openrouter.ai/api/v1",
        apiKey:
          "sk-or-v1-130351e3f317c1ce9054d0cf899ac7b1d3e8af9d397618ff8be005a786d",
      },
      {
        model: "gpt-4o",
        title: "GPT-4o",
        baseURL: "https://api.openai.com/v1",
        apiKey: "sk-aj0shmBaHoK2ubdBLITJazrlTJRcwom96eFbUvmF4NA1lK",
      },
    ],
  },
  anthropic: {
    provider: "anthropic",
    models: [
      {
        model: "claude-3-7-sonnet-latest",
        title: "Claude 3.7 Sonnet",
        baseURL: "https://api.anthropic.com/v1",
        apiKey:
          "sk-ant-api03-130351e3f317c1ce9054d0cf899ac7b3e8af9d397618fd3382786d",
      },
      {
        model: "claude-3-5-sonnet-latest",
        title: "Claude 3.5 Sonnet",
        baseURL: "https://api.anthropic.com/v1",
        apiKey:
          "sk-ant-api03-130351e3f317c1ce9054d0cf899ac7b1d3e8af9d3618fd3382786d",
      },
    ],
  },
}

/**
 * Default story with mock provider data
 */
export const Default: Story = {
  args: {
    initialData: mockProviders,
    showSensitiveInfo: false,
  },
}

/**
 * Empty state when no providers are available
 */
export const EmptyState: Story = {
  args: {
    initialData: {},
    showSensitiveInfo: false,
  },
}

/**
 * With sensitive information visible
 */
export const WithSensitiveInfoVisible: Story = {
  args: {
    initialData: mockProviders,
    showSensitiveInfo: true,
  },
}

/**
 * With model selection callback
 */
export const WithModelSelection: Story = {
  args: {
    initialData: mockProviders,
    showSensitiveInfo: false,
    onModelSelect: (provider: string, model: Model) => {
      console.log(`Selected ${model.title} from ${provider}`)
      alert(`Selected: ${model.title}`)
    },
  },
}

/**
 * With refresh callback
 */
export const WithRefreshCallback: Story = {
  args: {
    initialData: mockProviders,
    showSensitiveInfo: false,
    onRefresh: () => {
      console.log("Refreshing provider data...")
      alert("Refreshing data...")
    },
  },
}
