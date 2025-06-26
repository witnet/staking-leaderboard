import { RouteName } from "~/types"
import cacheData from "./cacheData"
import { Witnet } from "@witnet/sdk"


const provider = new Witnet.JsonRpcProvider("https://rpc-01.witnet.io")

const stakes = async () => {
  const limit = 40;
  let lastResult: Array<Witnet.StakeEntry> | null = null;
  const results: Array<Witnet.StakeEntry> = [];
  let offset = 0;
  const maxRetries = 3;

  while (!lastResult || lastResult.length === limit) {
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
      try {
        lastResult = await provider.stakes({ params: { limit, offset } });
        results.push(...lastResult);

        offset += limit;
        success = true;
      } catch (error) {
        attempt++;
        console.warn(`Attempt ${attempt} failed:`, error);
        if (attempt >= maxRetries) {
          console.error('Max retries reached. Aborting.');
          throw error;
        }

        // Exponential backoff
        await new Promise((res) => setTimeout(res, 1000 * attempt)); 
      }
    }
  }

  return results;
};


export default cacheData(stakes, RouteName.staking)
