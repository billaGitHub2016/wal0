import NextAuth from "next-auth"
import { authOptions } from "./options"

export const GET = NextAuth(authOptions)
export const POST = NextAuth(authOptions)
