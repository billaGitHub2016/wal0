"use client"

import { useState, useCallback } from "react"
import { debounce } from "lodash"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, Loader2 } from "lucide-react"
import type { WithdrawDialogProps } from "./interface"
import { toast } from "@/hooks/use-toast"
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit"
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client"
import { Transaction } from "@mysten/sui/transactions"
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils"

export function WithdrawDialog({
  open,
  onOpenChange,
  onWithdraw,
  loading = false,
  balance,
  user,
}: WithdrawDialogProps) {
  const [suiAmount, setSuiAmount] = useState("")
  // const [usdAmount, setUsdAmount] = useState("")
  const [loadingPrice] = useState(false)
  const account = useCurrentAccount()

  // 使用 useCallback 和 debounce 处理输入
  const debouncedSetSuiAmount = useCallback(
    debounce((value: string) => {
      setSuiAmount(value)
    }, 500),
    [],
  )

  const suiClient = new SuiClient({
    url: getFullnodeUrl(
      process.env.NEXT_PUBLIC_NETWORK as "testnet" | "mainnet",
    ),
  })
  const { mutate: signAndExecute } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }: { bytes: any; signature: any }) =>
      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          // Raw effects are required so the effects can be reported back to the wallet
          showRawEffects: true,
          showEffects: true,
          showEvents: true,
        },
      }),
  })

  const handleSubmit = async () => {
    const sui = parseFloat(suiAmount)
    if (isNaN(sui)) return
    if (!account) {
      toast({
        title: "Error",
        description: "Please connect your wallet",
        variant: "destructive",
      })
      return
    }
    if (sui > balance) {
      toast({
        title: "Withdrawal amount exceeds balance",
        description: `Current balance is ${balance} SUI`,
        variant: "destructive",
      })
      return
    }

    try {
      // 创建交易
      const tx = new Transaction()
      const withdrawBalance = parseFloat(suiAmount) * 1e9
      tx.setGasBudget(1e8)
      // 调用合约提现方法
      tx.moveCall({
        target: `${process.env.NEXT_PUBLIC_PACKAGE_ID}::walrus_v0::withdraw`,
        arguments: [
          tx.object(process.env.NEXT_PUBLIC_ACCOUNT_BOOK_ID as string),
          tx.pure.string(user.email),
          tx.pure.u64(withdrawBalance),
          tx.object(SUI_CLOCK_OBJECT_ID),
        ],
      })

      signAndExecute(
        {
          transaction: tx as any,
        },
        {
          onSuccess: async data => {
            if (data?.digest && data?.effects?.status.status === "success") {
              // 调用后端 API 记录提现
              const response = await fetch("/api/wallet/withdraw", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  sui,
                  amount: 0,
                  exchangeRate: 0,
                  wallet: account.address,
                  digest: data.digest,
                  network: process.env.NEXT_PUBLIC_NETWORK as string,
                }),
              })

              const apiResult = await response.json()

              if (apiResult.code === 0) {
                toast({
                  title: "Withdrawal successful",
                  description: `Successfully withdrawn ${sui} SUI`,
                  variant: "default",
                })
                onWithdraw({ sui })
                onOpenChange(false)
              } else {
                throw new Error(apiResult.msg)
              }
            } else {
              throw new Error("Withdrawal failed")
            }
          },
          onError: err => {
            toast({
              title: "Withdrawal failed",
              description: err.message || "Please try again later",
              variant: "destructive",
            })
          },
        },
      )
    } catch (error: any) {
      console.error(error)
      toast({
        title: "Withdrawal failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdrawal</DialogTitle>
          <DialogDescription>
            Current balance: {balance} SUI, input withdrawal amount to see
            real-time USD equivalent
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="sui">SUI Withdrawal Amount</Label>
            <div className="flex gap-2">
              <Input
                id="sui"
                type="number"
                placeholder="Input SUI Amount"
                defaultValue={suiAmount}
                onChange={e => debouncedSetSuiAmount(e.target.value)}
              />
              <Button
                variant="outline"
                className="h-10 px-4"
                onClick={() => {
                  setSuiAmount(balance.toString())
                  debouncedSetSuiAmount(balance.toString())
                }}
              >
                Max
              </Button>
            </div>
          </div>

          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              <div className="mt-2 text-sm space-y-1">
                <p>Withdrawal Notice:</p>
                <p>1. Withdrawal amount cannot exceed current balance</p>
                <p>2. No handling fee for withdrawals</p>
                <p>3. Only wallets with recharge records can make withdrawals</p>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={
              !suiAmount ||
              loading ||
              loadingPrice ||
              parseFloat(suiAmount) > balance
            }
            className="bg-gradient-to-r from-blue-500 to-violet-500 text-white"
          >
            {loading || loadingPrice ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Handling
              </>
            ) : (
              "Confirm Withdrawal"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
