<template>
  <div class="">
    <div class="grid grid-cols-3 sm:grid-cols-1 mb-md">
      <div class="text-center mb-md">
        <p class="title">Total Staked</p>
        <p class="data">{{ formatNumber(totalStakedFormatted) }} $WIT</p>
      </div>
      <div class="text-center mb-md">
        <p class="title">Staked supply</p>
        <p class="data">{{ stakedSupplyPercentage }}%</p>
      </div>
      <div class="text-center mb-md">
        <p class="title">Stakers</p>
        <p class="data">{{ numberOfStakers }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Big from "big.js"
import { formatNumber } from "@/utils/formatNumber.js"
const props = defineProps({
  visibleStakers: Array,
  totalStaked: String,
  circulatingSupply: Number,
})
const totalStakedFormatted = computed(() => {
  return props.totalStaked
    ? new Big(nanoWitToWit(props.totalStaked)).round(0)
    : 0
})

const stakedSupplyPercentage = computed(() => {
  if (!props.totalStaked || !props.circulatingSupply) return "0.00"
  const totalStakedBig = new Big(props.totalStaked)
  const circulatingSupplyBig = new Big(props.circulatingSupply).times(
    1000000000,
  )
  if (circulatingSupplyBig.eq(0)) return "0.00"
  return totalStakedBig.div(circulatingSupplyBig).times(100).round(2).toFixed(2)
})

const numberOfStakers = ref(getWithdrawers(props.visibleStakers).length)
</script>

<style lang="scss" scoped>
.title {
  @apply font-title text-white-200 text-sm uppercase tracking-wider mb-sm;
}
.data {
  @apply font-title text-white-50 text-3xl font-bold;
}
</style>
