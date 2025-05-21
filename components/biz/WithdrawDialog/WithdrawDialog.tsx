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
        title: "提现金额超出余额",
        description: `当前余额为 ${balance} SUI`,
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
                  title: "提现成功",
                  description: `已成功提现 ${sui} SUI`,
                  variant: "default",
                })
                onWithdraw({ sui })
                onOpenChange(false)
              } else {
                throw new Error(apiResult.msg)
              }
            } else {
              throw new Error("提现失败")
            }
          },
          onError: err => {
            toast({
              title: "提现失败",
              description: err.message || "请稍后重试",
              variant: "destructive",
            })
          },
        },
      )
    } catch (error: any) {
      console.error(error)
      toast({
        title: "提现失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>提现</DialogTitle>
          <DialogDescription>
            当前余额: {balance} SUI，输入提现金额，实时查看美元等值金额
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="sui">提现 SUI 金额</Label>
            <div className="flex gap-2">
              <Input
                id="sui"
                type="number"
                placeholder="输入 SUI 金额"
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
                最大
              </Button>
            </div>
          </div>

          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              <div className="mt-2 text-sm space-y-1">
                <p>提现须知：</p>
                <p>1. 提现金额不能超过当前余额</p>
                <p>2. 提现不收取手续费</p>
                <p>3. 有充值记录的钱包才能提现</p>
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
                处理中
              </>
            ) : (
              "确认提现"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
