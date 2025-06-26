export type Staker = {
  withdrawer: string
  amount: string
}
export type AggregatedStaker = {
  rank: number
  amount: string
  withdrawer: string
}
export enum RouteName {
  supply,
  staking,
}
export enum Label {
  rank,
  address,
  amount,
}
