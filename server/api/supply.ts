import { EXPLORER_API } from "~/constants";
import cacheData from "./cacheData";
import { RouteName } from "~/types";

const supply = async () => await $fetch(`${EXPLORER_API}/network/supply?key=current_supply`)

export default cacheData(supply, RouteName.supply)