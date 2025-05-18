import type { DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      id: string
      email: string
      name: string
      image: string
    }
  }
}
