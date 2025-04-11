export type Staker = {
  withdrawer: string,
  amount: number
}
export type AggregatedStaker = {
  rank: number
  amount: number
  withdrawer: string,
}
export enum RouteName {
  supply,
  staking
}
export enum Label {
  rank,
  address,
  amount,
}