import { FC, useCallback, useEffect, useRef, useState } from "react"
import type { CodeRendererProps } from "./interface"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { ErrorToast } from "./ErrorToast"
import { ControlBar } from "./ControlBar"
import { ResizableFrame } from "./ResizableFrame"

export const CodeRenderer: FC<CodeRendererProps> = ({
  codeRendererServer,
  onFixError,
  className,
  codes,
  notShowErrorToast,
  entryFile,
  hideControls = true,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const [showErrorToast, setShowErrorToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentDevice, setCurrentDevice] = useState("desktop")
  const [deviceDimensions, setDeviceDimensions] = useState({
    width: "100%",
    height: "100%",
  })

  // Root container reference for fullscreen control
  const containerRef = useRef<HTMLDivElement>(null)

  const sendMessage = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        {
          type: "artifacts",
          data: {
            files: codes,
            entryFile,
          },
        },
        codeRendererServer,
      )
    }
  }, [codes, codeRendererServer, entryFile])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) {
        return
      }

      if (event.data === "IFRAME_LOADED") {
        sendMessage()
        setIsIframeLoaded(true)
      }
      if (event.data.type === "artifacts-error") {
        setErrorMessage(event.data.errorMessage)
        setShowErrorToast(true)
      }
      if (event.data.type === "artifacts-success") {
        setErrorMessage("")
        setShowErrorToast(false)
      }
    }

    window.addEventListener("message", handleMessage, false)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [sendMessage, onFixError])

  useEffect(() => {
    if (isIframeLoaded && !!codes) {
      sendMessage()
    }
  }, [codes, isIframeLoaded, sendMessage])

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFullscreen])

  const handleFixError = () => {
    onFixError?.(errorMessage)
    setShowErrorToast(false)
  }

  // Toggle CSS fullscreen mode
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev)
  }, [])

  // Handle resize from ResizableFrame
  const handleResize = useCallback((width: number, height: number) => {
    setDeviceDimensions({
      width: `${width}px`,
      height: `${height}px`,
    })
  }, [])

  // Change device/responsive mode
  const handleChangeDevice = useCallback(
    (width: string, height: string, deviceId: string) => {
      setCurrentDevice(deviceId)
      setDeviceDimensions({ width, height })
    },
    [],
  )

  // Render the iframe based on device mode
  const renderIframe = () => {
    if (currentDevice === "desktop") {
      return (
        <iframe
          ref={iframeRef}
          src={`${codeRendererServer}`}
          title="Code Preview"
          className="w-full h-full border-0 transition-colors"
          onLoad={() => setIsIframeLoaded(true)}
        />
      )
    }

    if (currentDevice === "responsive") {
      return (
        <ResizableFrame
          width={deviceDimensions.width}
          height={deviceDimensions.height}
          onResize={handleResize}
          className="shadow-md"
        >
          <iframe
            ref={iframeRef}
            src={`${codeRendererServer}`}
            title="Code Preview"
            className="w-full h-full border-0"
            onLoad={() => setIsIframeLoaded(true)}
          />
        </ResizableFrame>
      )
    }

    // Specific device mode
    return (
      <Card
        className="relative overflow-hidden border shadow-md"
        style={{
          width: deviceDimensions.width,
          height: deviceDimensions.height,
        }}
      >
        <iframe
          ref={iframeRef}
          src={`${codeRendererServer}`}
          title="Code Preview"
          className="w-full h-full border-0"
          onLoad={() => setIsIframeLoaded(true)}
        />
      </Card>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col h-full w-full overflow-hidden bg-background transition-all duration-200",
        isFullscreen && "fixed inset-0 z-[50] w-screen h-screen",
        className,
      )}
      style={{
        // When in fullscreen, ensure the component takes up the entire viewport
        ...(isFullscreen && {
          width: "100vw",
          height: "100vh",
        }),
      }}
    >
      {/* Control Bar fixed at top */}
      {!hideControls && (
        <ControlBar
          onToggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
          onChangeDevice={handleChangeDevice}
          currentDevice={currentDevice}
          codeRendererServer={codeRendererServer}
        />
      )}

      {/* Main content area with iframe */}
      <div className="flex-1 relative overflow-auto flex items-center justify-center p-0">
        {currentDevice === "desktop" ? (
          renderIframe()
        ) : (
          <div className="relative flex items-center justify-center min-h-full p-4">
            {renderIframe()}
          </div>
        )}
      </div>

      {!notShowErrorToast && showErrorToast && (
        <ErrorToast message={errorMessage} onFix={handleFixError} />
      )}
    </div>
  )
}
