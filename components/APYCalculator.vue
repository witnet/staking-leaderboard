<template>
  <WCard class="sticky !h-fit">
  >
  <template #header>
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-[rgb(0,226,237)] mb-2">
        APY Calculator
      </h2>
      <p class="text-gray-400">Calculate your potential earnings</p>
    </div>
  </template>

  <template #description>
    <div class="space-y-6">
      <div>
        <label
          class="block text-sm font-bold text-[rgb(0,226,237)] mb-2"
        >
          Enter Address or Amount
        </label>
        <input
          v-model="calculatorInput"
          type="text"
          class="w-full px-4 py-3 bg-gray-100 border-2 border-[rgb(0,226,237)] rounded-lg focus:ring-[rgb(0,226,237)] focus:border-[rgb(0,226,237)] text-black placeholder-gray-500 transition-all duration-200"
          placeholder="Enter wallet address or amount..."
        />
      </div>

      <button
        class="w-full bg-[rgb(0,226,237)] text-black py-3 px-4 rounded-lg hover:bg-[rgb(0,200,210)] focus:outline-none focus:ring-2 focus:ring-[rgb(0,226,237)] focus:ring-offset-2 focus:ring-offset-gray-900 font-bold transition-all duration-200 text-lg"
        @click="calculateAPY"
      >
        Calculate APY
      </button>

      <div
        v-if="calculatedAPY"
        class="mt-8 p-6 rounded-lg border-2 border-[rgb(0,226,237)] transform transition-all duration-300 hover:scale-[1.02]"
      >
        <h3 class="text-lg font-bold text-[rgb(0,226,237)] mb-4">
          Estimated Returns
        </h3>
        <div class="grid grid-cols-2 gap-6">
          <div class="text-center p-4 bg-gray-900 rounded-lg">
            <p class="text-sm text-gray-400 mb-2">
              Annual Percentage Yield
            </p>
            <p class="text-3xl font-bold text-[rgb(0,226,237)]">
              {{ calculatedAPY }}%
            </p>
          </div>
          <div class="text-center p-4 bg-gray-900 rounded-lg">
            <p class="text-sm text-gray-400 mb-2">Monthly Rewards</p>
            <p class="text-3xl font-bold text-white">
              {{ estimatedMonthlyRewards }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
</WCard>
</template>

<script setup>
import { WCard } from "wit-vue-ui"
import { formatNumber } from '@/utils/formatNumber.js'
import { ref } from "vue"

const calculatedAPY = ref(null)
const estimatedMonthlyRewards = ref(null)
const calculatorInput = ref("")

const calculateAPY = () => {
  calculatedAPY.value = "12.5"
  const amount = parseFloat(calculatorInput.value) || 100000
  estimatedMonthlyRewards.value = formatNumber(
    Math.floor((amount * 0.125) / 12),
  )
}

</script>