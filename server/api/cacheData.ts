import { defineEventHandler } from "h3"
import { CACHE_TTL } from "~/constants"
import { RouteName } from "~/types"

const supplyCache: { data: any | null; timestamp: number } = {
  data: null,
  timestamp: 0,
}
const stakingCache: { data: any | null; timestamp: number } = {
  data: null,
  timestamp: 0,
}

const cacheByType = {
  [RouteName.staking]: stakingCache,
  [RouteName.supply]: supplyCache,
}

export default (call: Function, name: RouteName) =>
  defineEventHandler(async () => {
    const cache = cacheByType[name]
    const now = Date.now()

    // If cache is valid, return cached data
    if (cache.data && now - cache.timestamp < CACHE_TTL) {
      return cache.data
    }

    try {
      const result = await call()
      // Store in cache
      if (result !== null) {
        cache.data = result
        cache.timestamp = now
      } else {
        console.warn(
          `No data returned for ${name}, cache not updated. Using stale data if available.`,
        )
      }

      return cache.data
    } catch {
      return { error: "Failed to fetch data" }
    }
  })
