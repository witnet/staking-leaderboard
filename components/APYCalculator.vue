<template>
  <BaseCard class="md:m-md p-md">
    <h2 class="font-title text-xl font-bold text-white-50 mb-2">
      APY Calculator
    </h2>
    <p class="text-white-200">Calculate your potential earnings</p>

    <div class="grid grid-cols-[1fr_max-content] sm:grid-cols-1 gap-md sm:gap-sm justify-center items-end">
      <div class="mt-md">
        <label
          class="block text-xs font-bold text-[rgb(0,226,237)] mb-sm"
        >
          Enter Address or Amount
        </label>
        <input
          v-model="calculatorInput"
          type="text"
          class="w-full px-md py-xs bg-black-950 border-2 border-black-950 text-white-50 rounded-full outline-none focus:border-1 focus:border-wit-blue-500 focus:border-blue-500 text-black placeholder-white-400"
          placeholder="Enter wallet address or amount..."
        />
      </div>
      <button
        class="sm:justify-self-end w-max h-max bg-wit-blue-500 text-black py-xs px-md rounded-full hover:bg-wit-blue-400 focus:outline-none focus:ring-1 focus:ring-wit-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 font-bold transition-all duration-200 text-lg"
        @click="calculateAPY"
      >
        Calculate APY
      </button>
    </div>

    <div
        v-if="calculatedAPY"
        class="mt-md p-6 rounded-lg"
      >
        <div class="flex gap-md">
          <div class="grid justify-center items-middle text-center p-md bg-black-950 rounded-lg w-max">
            <p class="text-sm text-white-200 mb-xs block">
              Annual Percentage Yield
            </p>
            <p class="text-2xl font-bold text-wit-blue-500">
              {{ calculatedAPY }}%
            </p>
          </div>
          <div class="grid justify-center items-middle text-center p-md bg-black-950 rounded-lg w-max">
            <p class="text-sm text-white-200 mb-xs">Monthly Rewards</p>
            <p class="text-2xl font-bold text-wit-blue-500 w-max block">
              {{ estimatedMonthlyRewards }} $WIT
            </p>
          </div>
        </div>
      </div>
</BaseCard>
</template>

<script setup>
import { WButton } from "wit-vue-ui"
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