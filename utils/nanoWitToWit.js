import Big from "big.js"

export function nanoWitToWit(x) {
  return new Big(x).div(1_000_000_000).toString() // 10**9
}
