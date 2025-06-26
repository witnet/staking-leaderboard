import { type Staker, type AggregatedStaker } from "@/types"

export function formatWithdrawers(stakes: Staker[]): AggregatedStaker[] {
  return stakes
    .sort((a, b) => {
      const amountA = BigInt(a.amount)
      const amountB = BigInt(b.amount)

      if (amountA === amountB) return 0

      return amountB > amountA ? 1 : -1
    })
    .map((staker, index) => ({
      ...staker,
      rank: index + 1,
    }))
}
