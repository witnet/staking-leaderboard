import { type Staker, type AggregatedStaker } from '@/types'

export function formatWithdrawers(stakes: Staker[]): AggregatedStaker[] {
  return stakes.sort((a, b) => b.amount - a.amount).map((staker, index) => {
    return {
      ...staker,
      rank: index + 1
    }
  })
}