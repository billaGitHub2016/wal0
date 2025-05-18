"use client"

import { redirect } from "next/navigation"
import { routes } from "@/hooks/use-routes"

export default function MainPage() {
  redirect(routes[0].url)
}
