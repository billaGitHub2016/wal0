export interface RechargeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: {
    email: string
  }
  onRecharge: (amount: { sui: number; usd: number }) => void
  loading?: boolean
}
