import { defineEventHandler } from "h3"

import Witnet from "witnet-toolkit"

const cache: { data: any | null; timestamp: number } = {
  data: null,
  timestamp: 0,
}
const CACHE_TTL = 1 * 60 * 1000 // 1 minute

export default defineEventHandler(async () => {
  const now = Date.now()

  // If cache is valid, return cached data
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return cache.data
  }

  try {
    const provider = new Witnet.RPC.Provider("http://3.133.4.38:21339")
    const stakes = await provider.stakes({ params: { limit: 10, offset: 0 } })

    // Store in cache
    cache.data = stakes
    cache.timestamp = now

    return cache.data
  } catch {
    return { error: "Failed to fetch data" }
  }
})
