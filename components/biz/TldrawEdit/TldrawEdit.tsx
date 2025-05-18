"use client"

import { useState, FC, useRef } from "react"
import { ImageIcon, Loader2, Check } from "lucide-react"
import dynamic from "next/dynamic"
import { Editor, setUserPreferences } from "@tldraw/tldraw"
import { getSvgAsImage } from "./lib/getSvgAsImage"
import { blobToBase64 } from "./lib/blobToBase64"
import { TldrawEditProps } from "./interface"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import "@tldraw/tldraw/tldraw.css"
import { toast } from "@/hooks/use-toast"

const Tldraw = dynamic(() => import("@tldraw/tldraw").then(mod => mod.Tldraw), {
  ssr: false,
})

const TldrawEdit: FC<TldrawEditProps> = ({ onSubmit, disabled }) => {
  const [, refresh] = useState({})
  const editorRef = useRef<Editor>()
  const [open, setOpen] = useState(false)

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/20 hover:bg-background/30 dark:bg-white/20 dark:hover:bg-white/30"
              onClick={() => setOpen(true)}
              disabled={disabled}
            >
              <ImageIcon className="h-4 w-4 text-foreground/70 dark:text-white/70" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Draw UI</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full p-0 sm:max-w-full z-[1000]"
        >
          <SheetHeader className="px-6 py-4">
            <div className="flex justify-between items-center w-full">
              <SheetTitle>Draw UI</SheetTitle>
            </div>
          </SheetHeader>
          <div className="w-full h-[calc(100vh-60px)] [&_.tlui-debug-panel]:hidden relative">
            <Tldraw
              onMount={editor => {
                editorRef.current = editor
                setUserPreferences({
                  isDarkMode: true,
                  id: "tldraw",
                })
                refresh({})
              }}
              persistenceKey="tldraw"
            />
            <div className="fixed top-[60px] right-0 sm:left-[50%] sm:translate-x-[-50%] z-[1000] bg-background/95 border rounded-lg shadow-lg px-3 py-2 flex flex-row items-center gap-2 sm:gap-4 min-w-[48px] sm:w-fit">
              <p className="text-sm text-foreground whitespace-nowrap">
                Submit the drawn UI?
              </p>
              <div className="flex justify-end">
                <ExportButton
                  editor={editorRef.current!}
                  onSubmit={dataUrl => {
                    onSubmit(dataUrl)
                    setOpen(false)
                  }}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

function ExportButton({
  onSubmit,
  editor,
}: {
  onSubmit: (dataUrl: string) => void
  editor: Editor
}) {
  const [loading, setLoading] = useState(false)
  return (
    <Button
      variant="default"
      size="icon"
      className="h-6 w-6 px-3"
      onClick={async e => {
        setLoading(true)
        try {
          e.preventDefault()
          const svg = await editor.getSvg(
            Array.from(editor.currentPageShapeIds),
          )
          if (!svg) {
            toast({
              title: "The drawn UI cannot be empty",
              variant: "default",
            })
            return
          }
          const png = await getSvgAsImage(svg, {
            type: "png",
            quality: 1,
            scale: 1,
          })
          const dataUrl = (await blobToBase64(png!)) as string
          onSubmit(dataUrl)
        } finally {
          setLoading(false)
        }
      }}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Check className="h-4 w-4" />
      )}
    </Button>
  )
}

export default TldrawEdit
