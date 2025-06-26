import { type Staker } from "@/types"

export function getWithdrawers(stakes: Staker[]): Staker[] {
  return Object.values(
    stakes.reduce((acc: Record<string, Staker>, staker: Staker) => {
      return {
        ...acc,
        [staker.withdrawer]: {
          withdrawer: staker.withdrawer,
          amount: (
            (acc[staker.withdrawer]
              ? BigInt(acc[staker.withdrawer].amount)
              : BigInt(0)) + BigInt(staker.amount)
          ).toString(),
        },
      }
    }, {}),
  )
}
