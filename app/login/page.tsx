"use client"

import Loading from "@/components/biz/Loading/Loading"
import LoginForm from "@/components/biz/LoginForm/LoginForm"
import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { status } = useSession()

  if (status === "loading") {
    return <Loading fullscreen />
  }

  if (status === "authenticated") {
    redirect("/main")
  }

  return (
    <LoginForm
      loading={loading}
      onGithubSignIn={() => {
        setLoading(true)
        signIn("github", { callbackUrl: "/main" })
      }}
    />
  )
}
