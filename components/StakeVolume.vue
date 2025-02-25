<template>
      <div class="">
        <div class="grid grid-cols-3 sm:grid-cols-1 gap-6 mb-md">
          <div class="text-center">
            <p class="title">
              Total Staked
            </p>
            <p class="data">
              {{ formatNumber(totalStaked) }}
            </p>
          </div>
          <div class="text-center">
            <p class="title">
              Progress to Goal
            </p>
            <p class="data ">
              {{ ((totalStaked / stakingGoal) * 100).toFixed(2) }}%
            </p>
          </div>
          <div class="text-center">
            <p class="title">
              Target
            </p>
            <p class="data ">
              {{ formatNumber(stakingGoal) }}
            </p>
          </div>
        </div>

        <div class="relative">
          <div class="overflow-hidden h-md bg-black-800 rounded-full">
            <div
              class="h-full bg-wit-blue-500 rounded-full transition-all duration-300"
              :style="{ width: `${(totalStaked / stakingGoal) * 100}%` }"
            />
          </div>
        </div>
      </div>
</template>

<script setup>
import { WCard } from "wit-vue-ui"
import { formatNumber } from '@/utils/formatNumber.js'
const props = defineProps({
  visibleStakers: Array,
})
const stakingGoal = 300_000_000
const totalStaked = computed(() => {
  return props.visibleStakers
    ? nanoWitToWit(
        props.visibleStakers.reduce((acc, staker) => acc + staker.amount, 0),
      ).toFixed()
    : 0
})
</script>

<style lang="scss" scoped>
.title {
  @apply font-title text-white-200 text-sm uppercase tracking-wider mb-md;
}
.data {
  @apply font-title text-white-50 text-3xl font-bold;
}
</style>