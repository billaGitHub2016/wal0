import type { Meta, StoryObj } from "@storybook/react"
import { ComponentCodeFilterContainer } from "./index"
import { ComponentCodeList } from "../ComponentCodeList/ComponentCodeList"
import type { ComponentItem } from "../ComponentCodeList/interface"
import { useState, useEffect } from "react"
import { CodingBox } from "../CodingBox"

const meta: Meta<typeof ComponentCodeFilterContainer> = {
  title: "Biz/ComponentCodeFilterContainer",
  component: ComponentCodeFilterContainer,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ComponentCodeFilterContainer>

const mockItems: ComponentItem[] = [
  {
    id: "1",
    title: "CSS Theme Switch",
    description: "A beautiful theme switch component with smooth transitions",
    code: { "App.tsx": "const ThemeSwitch = () => { return <div>ThemeSwitch</div> }" },
    entryFile: "App.tsx",
  },
  {
    id: "2",
    title: "Dark Mode Toggle",
    description: "Simple and elegant dark mode toggle with system preference",
    code: { "App.tsx": "const DarkModeToggle = () => { return <div>DarkModeToggle</div> }" },
    entryFile: "App.tsx",
  },
  {
    id: "3",
    title: "Color Scheme Picker",
    description: "Advanced color scheme picker with custom theme support",
    code: { "App.tsx": "const ColorSchemePicker = () => { return <div>ColorSchemePicker</div> }" },
    entryFile: "App.tsx",
  },
  {
    id: "4",
    title: "Customizable Button",
    description: "A customizable button with various styles and sizes",
    code: { "App.tsx": "const CustomizableButton = () => { return <div>CustomizableButton</div> }" },
    entryFile: "App.tsx",
  },
  {
    id: "5",
    title: "Responsive Layout",
    description: "A responsive layout with breakpoints and media queries",
    code: { "App.tsx": "const ResponsiveLayout = () => { return <div>ResponsiveLayout</div> }" },
    entryFile: "App.tsx",
  },
  {
    id: "6",
    title: "Animated Loader",
    description: "A loader with smooth animations and customizable colors",
    code: { "App.tsx": "const AnimatedLoader = () => { return <div>AnimatedLoader</div> }" },
    entryFile: "App.tsx",
  },
  {
    id: "7",
    title: "Customizable Button",
    description: "A customizable button with various styles and sizes",
    code: { "App.tsx": "const CustomizableButton = () => { return <div>CustomizableButton</div> }" },
    entryFile: "App.tsx",
  },
  {
    id: "8",
    title: "Customizable Button",
    description: "A customizable button with various styles and sizes",
    code: { "App.tsx": "const CustomizableButton = () => { return <div>CustomizableButton</div> }" },
    entryFile: "App.tsx",
  },
]

export const Default: Story = {
  args: {
    pageSize: 5,
    total: mockItems.length,
    currentPage: 1,
    searchKeyword: "",
    filterField: "all",
    children: (
      <ComponentCodeList
        items={mockItems}
        onEditClick={id => console.log("Edit clicked:", id)}
        onDeleteClick={id => console.log("Delete clicked:", id)}
        codeRendererServer="https://shadcn-ui-renderer.pages.dev/artifacts"
      />
    ),
    onPageChange: page => {
      console.log("页码改变:", page)
    },
    onSearchChange: keyword => {
      console.log("搜索关键词改变:", keyword)
    },
    onFilterFieldChange: field => {
      console.log("过滤字段改变:", field)
    },
  },
}

export const SinglePage: Story = {
  args: {
    pageSize: 10,
    total: 1,
    currentPage: 1,
    searchKeyword: "theme",
    filterField: "all",
    children: (
      <ComponentCodeList
        items={[mockItems[0]]}
        onEditClick={id => console.log("Edit clicked:", id)}
        onDeleteClick={id => console.log("Delete clicked:", id)}
        codeRendererServer="https://shadcn-ui-renderer.pages.dev/artifacts"
      />
    ),
    onPageChange: page => {
      console.log("页码改变:", page)
    },
    onSearchChange: keyword => {
      console.log("搜索关键词改变:", keyword)
    },
    onFilterFieldChange: field => {
      console.log("过滤字段改变:", field)
    },
  },
}

export const WithCodingBox: Story = {
  render: function WithCodingBoxStory() {
    const [showNewItem, setShowNewItem] = useState(false)

    useEffect(() => {
      const handleClick = () => {
        setShowNewItem(true)
      }

      window.addEventListener("click", handleClick)
      return () => window.removeEventListener("click", handleClick)
    }, [])

    return (
      <div className="space-y-4">
        <div className="flex justify-center gap-4 items-center mb-96">
          <h4 className="text-lg font-medium">Click to add a coding box</h4>
        </div>
        <ComponentCodeFilterContainer
          pageSize={5}
          total={mockItems.length}
          currentPage={1}
          searchKeyword=""
          filterField="all"
          onPageChange={page => console.log("页码改变:", page)}
          onSearchChange={keyword => console.log("搜索关键词改变:", keyword)}
          onFilterFieldChange={field => console.log("过滤字段改变:", field)}
        >
          <div className="space-y-4">
            <ComponentCodeList
              items={mockItems}
              onEditClick={id => console.log("Edit clicked:", id)}
              onDeleteClick={id => console.log("Delete clicked:", id)}
              codeRendererServer="https://shadcn-ui-renderer.pages.dev/artifacts"
              newItem={
                showNewItem ? (
                  <div className="h-full cursor-pointer">
                    <CodingBox
                      code={`$ Adding new component...
> Initializing...
✨ Component ready to be added!
$ Adding new component...
> Initializing...
✨ Component ready to be added!
$ Adding new component...
> Initializing...
✨ Component ready to be added!
$ Adding new component...
> Initializing...
✨ Component ready to be added!
$ Adding new component...
> Initializing...
✨ Component ready to be added!
$ Adding new component...
> Initializing...
✨ Component ready to be added!
$ Adding new component...
> Initializing...
✨ Component ready to be added!
$ Adding new component...
> Initializing...
✨ Component ready to be added!

Click to confirm`}
                      showMacControls={true}
                      className="h-full"
                    />
                  </div>
                ) : undefined
              }
            />
          </div>
        </ComponentCodeFilterContainer>
      </div>
    )
  },
}
