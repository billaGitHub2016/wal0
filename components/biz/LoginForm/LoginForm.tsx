"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { LoginFormProps } from "./interface"
import { Logo } from "../Logo"
import { techIcons } from "./helpers"

const LoginForm = ({
  onSubmit,
  onGithubSignIn,
  loading = false,
}: LoginFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background/95">
        <div
          className="absolute inset-0 bg-gradient-to-br from-violet-400/30 via-background to-violet-400/30 
          "
        />
      </div>

      <div className="relative w-full max-w-[420px]">
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-[90%] sm:w-[80%] h-full 
          rounded-2xl bg-background/40 backdrop-blur-sm
          before:absolute before:left-[16.67%] before:right-[16.67%] before:top-0 before:h-[1px]
          before:bg-gradient-to-r before:from-transparent before:via-violet-600/30 before:to-transparent"
          aria-hidden="true"
        />

        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] h-full 
          rounded-2xl bg-background/50 backdrop-blur-sm
          before:absolute before:left-[16.67%] before:right-[16.67%] before:top-0 before:h-[1px]
          before:bg-gradient-to-r before:from-transparent before:via-violet-600/60 before:to-transparent"
          aria-hidden="true"
        />

        <Card
          className="w-full p-4 sm:p-8 space-y-6 sm:space-y-8 relative
          bg-gradient-to-b from-background/80 to-background/70 backdrop-blur-sm border-[1.5px] border-border/40
          before:inset-0 before:-z-10 before:p-[1px]
          before:rounded-[inherit]
          after:absolute after:inset-0 after:-z-10
          after:bg-gradient-to-b after:from-background/90 after:to-background/80 after:rounded-[inherit]
          shadow-[0_2px_10px_rgba(0,0,0,0.1)]
          before:absolute before:left-[16.67%] before:right-[16.67%] before:top-[-1px] before:h-[1px]
          before:bg-gradient-to-r before:from-transparent before:via-violet-600/80 before:to-transparent"
        >
          <div className="text-center space-y-2 sm:space-y-3">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl mx-auto flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
              <Logo
                width={64}
                height={64}
                className="sm:w-[72px] sm:h-[72px]"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Compoder
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground/90">
              Generate component code in seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Button
              type="button"
              variant="default"
              className="w-full h-10 sm:h-12 font-medium bg-primary hover:bg-primary/90 
                transform hover:-translate-y-0.5 transition-all duration-200 
                shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
              onClick={onGithubSignIn}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="mr-3"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              )}
              Sign in with Github
            </Button>
          </form>

          <div className="text-center space-y-3 sm:space-y-4 text-xs sm:text-sm text-muted-foreground/80">
            <p className="font-medium">
              Join Compoder,
              <span className="text-primary">
                {" "}
                it&apos;s free & open source!
              </span>
            </p>
            <p className="leading-relaxed">
              Your Stack, Your UI - AI-Powered Component Code Generator for
              Every
              <span className="text-primary"> Frontend Engineer</span>
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-4 px-2 sm:px-4 pt-4 place-items-center">
            {techIcons.map((tech, index) => (
              <div
                key={index}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-xl
                  bg-background/80
                  flex items-center justify-center
                  transform ${tech.rotate} hover:rotate-0
                  hover:scale-110 transition-all duration-200
                  hover:shadow-lg hover:bg-background/95 cursor-pointer`}
                title={tech.name}
              >
                {tech.icon}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default LoginForm
