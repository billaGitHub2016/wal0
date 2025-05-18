import React from "react"
import { Button } from "@/components/ui/button"
import { StorybookExampleProps } from "./interface"

const StorybookExample: React.FC<StorybookExampleProps> = ({ title }) => {
  return (
    <>
      <Button variant="default">{title}</Button>
    </>
  )
}

export default StorybookExample
