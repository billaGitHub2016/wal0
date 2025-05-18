import React from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { X as XIcon } from "lucide-react"

interface ImagePreviewProps {
  src: string
  thumbnailSize?: number
  onRemove?: () => void
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  thumbnailSize = 32,
  onRemove,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative group" style={{ width: thumbnailSize }}>
          <AspectRatio ratio={1}>
            <img
              src={src}
              alt="Preview"
              className="object-cover rounded-md w-full h-full cursor-pointer"
            />
            {onRemove && (
              <button
                onClick={e => {
                  e.stopPropagation()
                  onRemove()
                }}
                className="absolute -top-0.5 -right-0.5 p-0.5 rounded-full bg-destructive/90 
                         text-destructive-foreground shadow-sm
                         opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XIcon className="h-2 w-2" />
              </button>
            )}
          </AspectRatio>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <img
          src={src}
          alt="Preview"
          className="w-full h-auto object-contain rounded-md"
        />
      </PopoverContent>
    </Popover>
  )
}

export default ImagePreview
