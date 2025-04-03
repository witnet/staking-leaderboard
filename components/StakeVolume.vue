<template>
  <div class="">
    <div class="grid grid-cols-3 sm:grid-cols-1 mb-md">
      <div class="text-center mb-md">
        <p class="title">Total Staked</p>
        <p class="data">{{ formatNumber(totalStakedFormatted) }} $WIT</p>
      </div>
      <div class="text-center mb-md">
        <p class="title">Staked supply</p>
        <p class="data">
          {{ stakedSupplyPercentage }}%
        </p>
      </div>
      <div class="text-center mb-md">
        <p class="title">Stakers</p>
        <p class="data">{{ numberOfStakers }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatNumber } from "@/utils/formatNumber.js"
const props = defineProps({
  visibleStakers: Array,
  totalStaked: Number,
  circulatingSupply: Number
})
const totalStakedFormatted = computed(() => {
  return props.totalStaked ? nanoWitToWit(props.totalStaked).toFixed() : 0
})

const stakedSupplyPercentage = computed(() => {
  return (props.totalStaked / (props.circulatingSupply * 1000000000)).toFixed(4) * 100
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
