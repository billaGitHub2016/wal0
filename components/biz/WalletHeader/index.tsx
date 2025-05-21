"use client"

import { ConnectButton } from "@mysten/dapp-kit"
// import { Logo } from "@/components/biz/Logo"
import { useWallet } from "@/components/provider/wallet-provider"

export function WalletHeader() {
  const { balance, loading } = useWallet()
  return (
    <header className="flex h-16 items-center justify-end px-6 border-b">
      {/* Logo 部分 */}
      {/* <div className="flex items-center gap-2">
        <div className="flex aspect-square size-8 items-center justify-start">
          <Logo />
        </div>
        <span className="font-semibold bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
          Wal0
        </span>
      </div> */}

      {/* 钱包部分 */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Wallet Balance:
          {loading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            <span className="font-semibold">${balance.usd?.toFixed(2)}</span>
          )}
        </div>
        <ConnectButton className="bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg px-4 py-2 hover:opacity-90 transition-opacity" />
      </div>
    </header>
  )
}
