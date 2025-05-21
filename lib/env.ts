import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"
import "dotenv/config"

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    MONGODB_URI: z.string().min(1),
    DB_MAX_LINK: z.string().default("5"),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXT_GITHUB_ID: z.string().min(1),
    NEXT_GITHUB_SECRET: z.string().min(1),
    WALLET_KEY: z.string().min(1),
    SITE_BUILDER: z.string(),
  },
  client: {
    NEXT_PUBLIC_PACKAGE_ID: z.string().min(1),
    NEXT_PUBLIC_ACCOUNT_BOOK_ID: z.string().min(1),
    NEXT_PUBLIC_NETWORK: z.string().min(1),
    // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PACKAGE_ID: process.env.NEXT_PUBLIC_PACKAGE_ID,
    NEXT_PUBLIC_ACCOUNT_BOOK_ID: process.env.NEXT_PUBLIC_ACCOUNT_BOOK_ID,
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
    // NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
})
