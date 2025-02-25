<template>
  <WCard class="">
    <template #header>
      <div class="flex justify-center items-center">
        <h2 class="text-2xl font-bold text-[rgb(0,226,237)]">
          Race to stake
        </h2>
      </div>
    </template>

    <template #description>
      <div class="">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="text-center">
            <p class="text-gray-400 text-sm uppercase tracking-wider mb-1">
              Total Staked
            </p>
            <p class="text-3xl font-bold text-black">
              {{ formatNumber(totalStaked) }}
            </p>
          </div>
          <div class="text-center">
            <p class="text-gray-400 text-sm uppercase tracking-wider mb-1">
              Progress to Goal
            </p>
            <p class="text-3xl font-bold text-black">
              {{ ((totalStaked / stakingGoal) * 100).toFixed(2) }}%
            </p>
          </div>
          <div class="text-center">
            <p class="text-gray-400 text-sm uppercase tracking-wider mb-1">
              Target
            </p>
            <p class="text-3xl font-bold text-black">
              {{ formatNumber(stakingGoal) }}
            </p>
          </div>
        </div>

        <div class="relative">
          <div class="overflow-hidden h-6 bg-gray-800 rounded-full">
            <div
              class="h-full bg-[rgb(0,226,237)] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(0,226,237,0.5)]"
              :style="{ width: `${(totalStaked / stakingGoal) * 100}%` }"
            />
          </div>
        </div>
      </div>
    </template>
  </WCard>
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