"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

interface WalletContextType {
  balance: {
    sui: number
    usd: number
  }
  loading: boolean
  error: string | null
  refetchBalance: () => void
}

const WalletContext = createContext<WalletContextType>({
  balance: {
    sui: 0,
    usd: 0,
  },
  loading: false,
  error: null,
  refetchBalance: () => {},
})

export function useWallet() {
  return useContext(WalletContext)
}

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  const { data: session } = useSession()
  const {
    data: balance,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["wallet-balance", session?.user?.id],
    queryFn: async () => {
      const res = await fetch("/api/wallet/balance")
      const resJson = await res.json()
      if (resJson.code !== 0) {
        throw new Error(resJson.msg)
      }

      return {
        sui: resJson.data.suiBalance || 0,
        usd: resJson.data.usdBalance || 0,
      }
    },
    enabled: !!session?.user?.id,
  })

  const contextValue: WalletContextType = {
    balance: balance || { sui: 0, usd: 0 },
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetchBalance: refetch,
  }

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}
