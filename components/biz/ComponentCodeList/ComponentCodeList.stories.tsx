import type { Meta, StoryObj } from "@storybook/react"
import { ComponentCodeList } from "./ComponentCodeList"
import { ComponentItem } from "./interface"
import { useState, useEffect } from "react"
import { CodingBox } from "../CodingBox"

const meta = {
  title: "Biz/ComponentCodeList",
  component: ComponentCodeList,
  tags: ["autodocs"],
} satisfies Meta<typeof ComponentCodeList>

export default meta
type Story = StoryObj<typeof ComponentCodeList>

export const mockItems = [
  {
    id: "1",
    title: "CSS Theme Switch CSS Theme Switch CSS Theme Switch ",
    description:
      "A beautiful A beautiful A beautiful  A beautiful A beautiful A beautiful A beautiful  A beautiful A beautiful  A beautiful",
    code: {
      "App.tsx":
        "import React from 'react'; import { Button } from 'antd'; return <Button>Hello World</Button>;",
    },
    entryFile: "App.tsx",
  },
  {
    id: "2",
    title: "Dark Mode Toggle",
    description: "Simple and elegant dark mode toggle with system preference",
    code: {
      "App.tsx":
        "import React from 'react'; import { Button } from 'antd'; return <Button>Hello World</Button>;",
    },
    entryFile: "App.tsx",
  },
  {
    id: "3",
    title: "Color Scheme Picker",
    description: "Advanced color scheme picker with custom theme support",
    code: {
      "App.tsx":
        "import React from 'react'; import { Button } from 'antd'; return <Button>Hello World</Button>;",
    },
    entryFile: "App.tsx",
  },
  {
    id: "4",
    title: "Customizable Button",
    description: "A customizable button with various styles and sizes",
    code: {
      "App.tsx":
        "import React from 'react'; import { Button } from 'antd'; return <Button>Hello World</Button>;",
    },
    entryFile: "App.tsx",
  },
  {
    id: "5",
    title: "Responsive Layout",
    description: "A responsive layout with breakpoints and media queries",
    code: {
      "App.tsx":
        "import React from 'react'; import { Button } from 'antd'; return <Button>Hello World</Button>;",
    },
    entryFile: "App.tsx",
  },
  {
    id: "6",
    title: "Animated Loader",
    description: "A loader with smooth animations and customizable colors",
    code: {
      "App.tsx":
        "import React from 'react'; import { Button } from 'antd'; return <Button>Hello World</Button>;",
    },
    entryFile: "App.tsx",
  },
] as ComponentItem[]

export const Default: Story = {
  args: {
    items: mockItems,
    codeRendererServer: "https://antd-renderer.pages.dev/artifacts",
    onEditClick: id => console.log("Edit clicked:", id),
    onDeleteClick: id => console.log("Delete clicked:", id),
  },
}

export const SingleItem: Story = {
  args: {
    items: [mockItems[0]],
    codeRendererServer: "https://antd-renderer.pages.dev/artifacts",
    onEditClick: id => console.log("Edit clicked:", id),
    onDeleteClick: id => console.log("Delete clicked:", id),
  },
}

export const TwoItems: Story = {
  args: {
    items: mockItems.slice(0, 2),
    codeRendererServer: "https://antd-renderer.pages.dev/artifacts",
    onEditClick: id => console.log("Edit clicked:", id),
    onDeleteClick: id => console.log("Delete clicked:", id),
  },
}

export const AnimatedAddition: Story = {
  render: function AnimatedAdditionStory() {
    const [items, setItems] = useState<ComponentItem[]>(mockItems)

    useEffect(() => {
      // Add a new item after 1.5 seconds
      const timer = setTimeout(() => {
        setItems(prevItems => [
          {
            id: "new-1",
            title: "New Component",
            description: "This component just flew in!",
            code: {
              "index.css": "body { background-color: red; }",
            },
            entryFile: "App.tsx",
          },
          ...prevItems,
        ])
      }, 1500)

      return () => clearTimeout(timer)
    }, [])

    return (
      <ComponentCodeList
        codeRendererServer="https://antd-renderer.pages.dev/artifacts"
        items={items}
        onEditClick={id => console.log("Edit clicked:", id)}
        onDeleteClick={id => console.log("Delete clicked:", id)}
      />
    )
  },
}

export const ClickToAddCodingBox: Story = {
  render: function ClickToAddCodingBoxStory() {
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
          <h3 className="text-lg font-medium">
            Click anywhere to add a coding box
          </h3>
        </div>
        <ComponentCodeList
          codeRendererServer="https://antd-renderer.pages.dev/artifacts"
          items={mockItems}
          onEditClick={id => console.log("Edit clicked:", id)}
          onDeleteClick={id => console.log("Delete clicked:", id)}
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
    )
  },
}
