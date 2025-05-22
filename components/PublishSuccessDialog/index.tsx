"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"

interface PublishSuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  siteUrl: string
}

export function PublishSuccessDialog({
  open,
  onOpenChange,
  siteUrl,
}: PublishSuccessDialogProps) {
  useEffect(() => {
    if (open) {
      // 触发撒花效果
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
            <svg
              className="h-6 w-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">Publish Successful！</h3>
          <p className="text-sm text-muted-foreground text-center">
            Your website has been successfully published and can now be accessed via the following link:
          </p>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => window.open(siteUrl, "_blank")}
          >
            <span className="text-sm font-medium truncate max-w-[240px]">
              {siteUrl}
            </span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}