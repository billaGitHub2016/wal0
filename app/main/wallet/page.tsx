"use client"

import { useSession } from "next-auth/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react"
import { AppHeader } from "@/components/biz/AppHeader"
import { RechargeDialog } from "@/components/biz/RechargeDialog"
import { WithdrawDialog } from "@/components/biz/WithdrawDialog"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useWallet } from "@/components/provider/wallet-provider"

export default function WalletPage() {
  const { data: session } = useSession()
  const [isRechargeOpen, setIsRechargeOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdraweOpen] = useState(false)
  const [transactionPage, setTransactionPage] = useState(1)
  const [aiUsagePage, setAiUsagePage] = useState(1)
  const pageSize = 5
  const queryClient = useQueryClient()

  const user = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "",
  }

  // 获取钱包余额
  // const { data: walletBalance } = useQuery({
  //   queryKey: ["wallet-balance", session?.user?.id],
  //   queryFn: async () => {
  //     const res = await fetch("/api/wallet/balance")
  //     const resJson = await res.json()
  //     if (resJson.code !== 0) {
  //       toast({
  //         title: "获取钱包余额失败",
  //         description: resJson.msg,
  //         variant: "destructive",
  //       })
  //     }
  //     return resJson.data
  //   },
  //   enabled: !!session?.user?.id,
  // })
  const { balance } = useWallet()

  // 获取交易记录
  const { data: transactions } = useQuery({
    queryKey: ["transactions", session?.user?.id, transactionPage],
    queryFn: async () => {
      const res = await fetch(
        `/api/wallet/transactions?page=${transactionPage}&pageSize=${pageSize}`,
      )
      const resJson = await res.json()
      if (resJson.code !== 0) {
        toast({
          title: "获取交易记录失败",
          description: resJson.msg,
          variant: "destructive",
        })
      }
      return resJson.data
    },
    enabled: !!session?.user?.id,
  })

  // 获取AI使用记录
  const { data: aiUsage } = useQuery({
    queryKey: ["ai-usage", session?.user?.id, aiUsagePage],
    queryFn: async () => {
      const res = await fetch(
        `/api/ai-usage/list?userId=${session?.user?.id}&page=${aiUsagePage}&pageSize=${pageSize}`,
      )
      const resJson = await res.json()
      if (resJson.code !== 0) {
        toast({
          title: "获取AI模型调用记录失败",
          description: resJson.msg,
          variant: "destructive",
        })
      }
      return resJson.data
    },
    enabled: !!session?.user?.id,
  })

  const handleRecharge = async () => {
    setIsRechargeOpen(false)
    // 使用 invalidateQueries 重新获取钱包余额和交易记录
    queryClient.invalidateQueries({ queryKey: ["wallet-balance"] })
    queryClient.invalidateQueries({ queryKey: ["wallet-stats"] })
    queryClient.invalidateQueries({ queryKey: ["transactions"] })
  }

  const handleWithdraw = async () => {
    setIsWithdraweOpen(false)
    // 使用 invalidateQueries 重新获取钱包余额和交易记录
    queryClient.invalidateQueries({ queryKey: ["wallet-balance"] })
    queryClient.invalidateQueries({ queryKey: ["transactions"] })
  }

  return (
    <div className="container mx-auto pb-6">
      <AppHeader breadcrumbs={[{ label: "我的钱包" }]} />
      <ScrollArea className="h-[calc(100vh-200px)]">
        {/* 钱包余额卡片 */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium mr-2">钱包余额</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {balance?.sui?.toFixed(2) || "0.00"} SUI
                </div>
                <p className="text-xs text-muted-foreground">
                  ≈ ${balance?.usd?.toFixed(2) || "0.00"}
                </p>
              </div>

              <div>
                <Button
                  onClick={() => setIsRechargeOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-violet-500"
                >
                  充值
                </Button>
                <Button
                  onClick={() => setIsWithdraweOpen(true)}
                  className="ml-2"
                  variant="outline"
                >
                  提现
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 交易记录 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">交易记录</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>类型</TableHead>
                  <TableHead>SUI 数量</TableHead>
                  <TableHead>美元金额</TableHead>
                  <TableHead>汇率</TableHead>
                  <TableHead>时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions?.list?.map((tx: any) => (
                  <TableRow key={tx._id}>
                    <TableCell>{tx.type === 0 ? "充值" : "提现"}</TableCell>
                    <TableCell>{tx.sui.toFixed(2)} SUI</TableCell>
                    <TableCell>${tx.amount.toFixed(2)}</TableCell>
                    <TableCell>${tx.exchangeRate.toFixed(2)}</TableCell>
                    <TableCell>{formatDate(tx.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="ml-auto">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setTransactionPage(p => Math.max(1, p - 1))
                      }
                      className={`cursor-pointer ${
                        transactionPage === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-muted"
                      }`}
                    />
                  </PaginationItem>

                  {Array.from(
                    {
                      length:
                        transactions?.total % pageSize > 0
                          ? Math.floor(transactions?.total / pageSize) + 1
                          : Math.floor(transactions?.total / pageSize),
                    },
                    (_, i) => i + 1,
                  ).map(pageNumber => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setTransactionPage(pageNumber)}
                        isActive={transactionPage === pageNumber}
                        className={`cursor-pointer ${
                          transactionPage === pageNumber
                            ? "pointer-events-none"
                            : "hover:bg-muted"
                        }`}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setTransactionPage(p =>
                          Math.min(
                            Math.ceil(transactions?.total / pageSize),
                            p + 1,
                          ),
                        )
                      }
                      className={`cursor-pointer ${
                        transactionPage ===
                        Math.ceil(transactions?.total / pageSize)
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-muted"
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>

        {/* AI 使用记录 */}
        <div>
          <h2 className="text-lg font-semibold mb-4">AI 使用记录</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>模型</TableHead>
                  <TableHead>Prompt</TableHead>
                  <TableHead>Token 数量</TableHead>
                  <TableHead>费用</TableHead>
                  <TableHead>时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aiUsage?.list?.map((usage: any) => (
                  <TableRow key={usage._id}>
                    <TableCell>{usage.aiModel}</TableCell>
                    <TableCell
                      className="truncate max-w-[200px]"
                      title={usage.prompt}
                    >
                      {usage.prompt}
                    </TableCell>
                    <TableCell>{usage.tokens}</TableCell>
                    <TableCell>${usage.cost.toFixed(4)}</TableCell>
                    <TableCell>{formatDate(usage.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="ml-auto">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setAiUsagePage(p => Math.max(1, p - 1))}
                      className={`cursor-pointer ${
                        aiUsagePage === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-muted"
                      }`}
                    />
                  </PaginationItem>

                  {Array.from(
                    {
                      length:
                        aiUsage?.total % pageSize > 0
                          ? Math.floor(aiUsage?.total / pageSize) + 1
                          : aiUsage?.total / pageSize,
                    },
                    (_, i) => i + 1,
                  ).map(pageNumber => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setAiUsagePage(pageNumber)}
                        isActive={aiUsagePage === pageNumber}
                        className={`cursor-pointer ${
                          aiUsagePage === pageNumber
                            ? "pointer-events-none"
                            : "hover:bg-muted"
                        }`}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setAiUsagePage(p =>
                          Math.min(aiUsage?.total / pageSize, p + 1),
                        )
                      }
                      className={`cursor-pointer ${
                        aiUsagePage === Math.ceil(aiUsage?.total / pageSize)
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-muted"
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>

        {/* 充值对话框 */}
        <RechargeDialog
          open={isRechargeOpen}
          onOpenChange={setIsRechargeOpen}
          user={user}
          onRecharge={handleRecharge}
        />

        <WithdrawDialog
          open={isWithdrawOpen}
          onOpenChange={setIsWithdraweOpen}
          onWithdraw={handleWithdraw}
          user={user}
          balance={balance?.sui}
        />
      </ScrollArea>
    </div>
  )
}
