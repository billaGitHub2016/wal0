import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

export async function validateSession() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized - Please login first" },
      { status: 401 },
    )
  }

  return null
}

// get session
export async function getUserId() {
  const session = await getServerSession(authOptions)
  return session?.user?.id
}
