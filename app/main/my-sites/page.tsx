"use client"

import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
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
import { Skeleton } from "@/components/ui/skeleton"
import { AppHeader } from "@/components/biz/AppHeader"
import { toast } from "@/hooks/use-toast"
import { Send } from "lucide-react"
import { useCurrentAccount } from "@mysten/dapp-kit"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

export default function MySitesPage() {
  const { data: session } = useSession()
  const [page, setPage] = useState(1)
  const pageSize = 10

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["walrus-sites", session?.user?.id, page],
    queryFn: async () => {
      const res = await fetch(
        `/api/sites?userId=${session?.user?.id}&page=${page}&pageSize=${pageSize}`,
      )
      return res.json()
    },
    enabled: !!session?.user?.id,
  })

  const sites = data?.data?.list || []
  const totalPages = Math.ceil((data?.data?.total || 0) / pageSize)
  const [sendDialogOpen, setSendDialogOpen] = useState(false)
  const [selectedSite, setSelectedSite] = useState<any>(null)
  const account = useCurrentAccount()
  const [isSending, setIsSending] = useState(false)

  if (isLoading) {
    return (
      <div className="container mx-auto pb-6">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  const handleSend = async (site: any) => {
    if (!account) {
      toast({
        title: "Please connect wallet first",
        description: "Please connect your wallet to transfer the website",
        variant: "destructive",
      })
      return
    }

    setSelectedSite(site)
    setSendDialogOpen(true)
  }

  const handleConfirmSend = async () => {
    try {
      setIsSending(true)
      debugger
      const response = await fetch(
        `/api/transactions?id=${selectedSite._id}&wallet=${account?.address}`,
        {
          method: "get",
        },
      )

      const result = await response.json()
      setSendDialogOpen(false)
      setIsSending(false)
      if (result.code === 0) {
        toast({
          title: "Transfer Success",
          description:
            "Your website has been transferred to your wallet successfully",
        })
        refetch()
      } else {
        throw new Error(result.msg || "Transfer failed, please try again later")
      }
    } catch (error: any) {
      toast({
        title: "Transfer Failed",
        description: error.message || "Transfer failed, please try again later",
        variant: "destructive",
      })
    } finally {
    }
  }

  return (
    <div className="container mx-auto pb-6">
      <AppHeader breadcrumbs={[{ label: "My Sites" }]} />
      {/* <h1 className="text-2xl font-bold mb-6">我的网站</h1> */}
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="">Website Url</TableHead>
              <TableHead className="w-[200px]">Sui Object ID</TableHead>
              <TableHead className="w-[200px]">Blob ID</TableHead>
              <TableHead className="text-right w-[200px]">
                Gas Fee(Mist)
              </TableHead>
              <TableHead className="w-[100px]">Net Type</TableHead>
              <TableHead className="w-[180px]">Create Date</TableHead>
              <TableHead className="w-[180px]">Update Date</TableHead>
              <TableHead className="w-[100px]">Operations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sites.map((site: any) => (
              <TableRow
                key={site._id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-normal hover:text-primary"
                    onClick={() => window.open(site.siteUrl, "_blank")}
                  >
                    <span className="truncate max-w-[350px] block">
                      {site.siteUrl}
                    </span>
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  <Button
                    variant="link"
                    className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"
                    onClick={() =>
                      window.open(
                        `https://suiscan.xyz/${
                          site.netType || "testnet"
                        }/object/${site.siteObjectId}`,
                        "_blank",
                      )
                    }
                  >
                    <span className="truncate max-w-[120px] block">
                      {site.transactionDigest}
                    </span>
                  </Button>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  <Button
                    variant="link"
                    className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"
                    onClick={() =>
                      window.open(
                        `https://walruscan.com/${site.netType}/blob/${site.blobId}`,
                        "_blank",
                      )
                    }
                  >
                    <span className="truncate max-w-[120px] block">
                      {site.blobId}
                    </span>
                  </Button>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {site.gasFee}
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-muted">
                    {site.netType || "testnet"}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(site.createdAt)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(site.updatedAt)}
                </TableCell>
                <TableCell>
                  {site.transferDigest === " " && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSend.bind(null, site)}
                    >
                      <Send /> Transfer
                    </Button>
                  )}
                </TableCell>
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
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className={`cursor-pointer ${
                    page === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-muted"
                  }`}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                pageNumber => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => setPage(pageNumber)}
                      isActive={page === pageNumber}
                      className={`cursor-pointer ${
                        page === pageNumber
                          ? "pointer-events-none"
                          : "hover:bg-muted"
                      }`}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className={`cursor-pointer ${
                    page === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-muted"
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <AlertDialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm to transfer website</AlertDialogTitle>
            <AlertDialogDescription>
              是否要把该网站发送到当前连接的钱包地址{" "}
              {account?.address.slice(0, 6)}...{account?.address.slice(-6)}？
              After transferring the website to your wallet, you can bind the
              <Button
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={() =>
                  window.open("https://testnet.suins.io/", "_blank")
                }
              >
                suins name
              </Button>
              .This operation requires payment of transaction gas fees.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSend}
              disabled={isSending}
              className="relative"
            >
              {isSending ? "Sending..." : "Confirm"}
              {selectedSite?.netType === "testnet" && (
                <Badge
                  variant="secondary"
                  className="ml-2 absolute -top-3 -right-10"
                >
                  Gas Free
                </Badge>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
