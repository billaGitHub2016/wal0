import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { clientPromise } from "@/lib/db/mongo"
import { Adapter } from "next-auth/adapters"
import { env } from "@/lib/env"
import { addSystemGiftBalance } from "@/app/services/wallet/wallet.service"

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    GithubProvider({
      clientId: env.NEXT_GITHUB_ID,
      clientSecret: env.NEXT_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 30000,
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  // 添加 events 配置
  events: {
    createUser: async ({ user }) => {
      try {
        // 用户首次创建时，赠送 1 美元
        await addSystemGiftBalance(
          user.id, // 这里的 user.id 是 NextAuth 创建的用户 ID
          1, // 赠送 1 美元
          "testnet", // 网络类型
        )
        console.log(`系统赠送余额成功: 用户ID ${user.id}`)
      } catch (error) {
        // 即使赠送失败，也不影响用户注册流程
        console.error(`系统赠送余额失败: ${error}`)
      }
    },
  },
}
