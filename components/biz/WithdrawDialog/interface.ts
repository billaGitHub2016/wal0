export interface WithdrawDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWithdraw: (amount: { sui: number }) => void
  loading?: boolean
  balance: number // SUI 余额
  user: {
    email: string
  }
}
