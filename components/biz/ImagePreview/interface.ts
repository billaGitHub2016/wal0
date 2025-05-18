export interface ImagePreviewProps {
  /**
   * The source URL of the image to preview
   */
  src: string

  /**
   * The size of the thumbnail in pixels
   * @default 32
   */
  thumbnailSize?: number

  /**
   * Optional callback when remove button is clicked
   */
  onRemove?: () => void
}
