import { RouteName } from "~/types"
import cacheData from "./cacheData"
import Witnet from "witnet-toolkit"

const provider = new Witnet.RPC.Provider("http://3.133.4.38:21339")
const stakes = async () =>
  await provider.stakes({ params: { limit: 50, offset: 0 } })

export default cacheData(stakes, RouteName.staking)
