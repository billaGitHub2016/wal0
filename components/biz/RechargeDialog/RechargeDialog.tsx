"use client"

import { useState, useEffect, useCallback } from "react"
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
import type { RechargeDialogProps } from "./interface"
import { toast } from "@/hooks/use-toast"
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit"
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client"
import { Transaction } from "@mysten/sui/transactions"
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils"

export function RechargeDialog({
  open,
  onOpenChange,
  onRecharge,
  user,
  loading = false,
}: RechargeDialogProps) {
  const [suiAmount, setSuiAmount] = useState("")
  const [usdAmount, setUsdAmount] = useState("")
  const [loadingPrice, setLoadingPrice] = useState(false)
  const account = useCurrentAccount()

  // 使用 useCallback 和 debounce 处理输入
  const debouncedSetSuiAmount = useCallback(
    debounce((value: string) => {
      setSuiAmount(value)
    }, 500),
    [],
  )

  // 当 SUI 金额变化时，计算美元金额
  useEffect(() => {
    if (!suiAmount) {
      setUsdAmount("")
      return
    }
    const sui = parseFloat(suiAmount)
    if (isNaN(sui)) {
      setUsdAmount("")
      return
    }
    setLoadingPrice(true)
    fetch("/api/sui/price")
      .then(res => res.json())
      .then(result => {
        if (result.code === 0) {
          const usd = (sui * (result.price || 0)).toFixed(4)
          setUsdAmount(usd)
        } else {
          throw new Error(result.msg)
        }
      })
      .catch(() => {
        toast({
          title: "Failed to get SUI price",
          description: "Please try again later",
          variant: "destructive",
        })
      })
      .finally(() => {
        setLoadingPrice(false)
      })
  }, [suiAmount])

  const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") })
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
    const usd = parseFloat(usdAmount)
    if (isNaN(sui) || isNaN(usd)) return
    if (!account) {
      toast({
        title: "Error",
        description: "Please connect your wallet",
        variant: "destructive",
      })
      return
    }

    debugger
    try {
      // 创建交易
      const tx = new Transaction()
      const depositBalance = parseFloat(suiAmount) * 1e9
      tx.setGasBudget(1e8 + depositBalance)
      const [coin] = tx.splitCoins(tx.gas, [depositBalance])
      // 调用合约充值方法
      tx.moveCall({
        target: `${process.env.NEXT_PUBLIC_PACKAGE_ID}::walrus_v0::deposit`,
        arguments: [
          tx.object(process.env.NEXT_PUBLIC_ACCOUNT_BOOK_ID as string),
          tx.pure.string(user.email),
          coin,
          tx.pure.u64(0),
          tx.object(SUI_CLOCK_OBJECT_ID),
        ],
      })

      signAndExecute(
        {
          transaction: tx as any,
        },
        {
          onSuccess: async data => {
            console.log("transaction digest: " + JSON.stringify(data))
            if (data?.digest && data?.effects?.status.status === "success") {
              // 调用后端 API 记录充值
              const response = await fetch("/api/wallet/recharge", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  sui,
                  amount: usd,
                  exchangeRate: usd / sui,
                  wallet: account.address,
                  digest: data.digest,
                  network: process.env.NEXT_PUBLIC_NETWORK as string,
                }),
              })

              const apiResult = await response.json()

              if (apiResult.code === 0) {
                toast({
                  title: "Recharge successful",
                  description: `Successfully recharged ${sui} SUI`,
                  variant: "default",
                })
                onRecharge({ sui, usd })
              } else {
                throw new Error(apiResult.msg)
              }
            } else {
              throw new Error()
            }
          },
          onError: err => {
            toast({
              title: "Recharge failed",
              description: err.message || "Please try again later",
              variant: "destructive",
            })
          },
        },
      )
    } catch (error: any) {
      console.error(error)
      debugger
      toast({
        title: "Recharge successful",
        description: error.message || "Please try again later",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Recharge</DialogTitle>
          <DialogDescription>
            Enter recharge amount to see real-time USD equivalent
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="sui">SUI Recharge Amount</Label>
            <Input
              id="sui"
              type="number"
              placeholder="Enter SUI Amount"
              defaultValue={suiAmount}
              onChange={e => debouncedSetSuiAmount(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="usd">≈USD Amount</Label>
            <Input
              id="usd"
              type="text"
              value={usdAmount ? `$ ${usdAmount}` : ""}
              disabled
            />
          </div>

          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              <div className="mt-2 text-sm space-y-1">
                <p>Recharge Notice:</p>
                <p>
                  1. The full recharge amount will be transferred to your wallet
                  balance, no handling fee
                </p>
                <p>2. Wallet balance can be withdrawn without handling fee</p>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!suiAmount || loading || loadingPrice}
            className="bg-gradient-to-r from-blue-500 to-violet-500 text-white"
          >
            {loading || loadingPrice ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Handling
              </>
            ) : (
              "Confirm Recharge"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
