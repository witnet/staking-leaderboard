<template>
  <BaseCard class="md:m-md p-md">
    <h2 class="font-title text-xl font-bold text-white-50 mb-2">
      APY Calculator
    </h2>
    <p class="text-white-200">Calculate your potential earnings</p>

    <div
      class="grid grid-cols-[1fr_max-content] sm:grid-cols-1 gap-md sm:gap-sm justify-center items-end"
    >
      <div class="mt-md">
        <label class="block text-xs font-bold text-[rgb(0,226,237)] mb-sm">
          Enter an Amount
        </label>
        <input
          v-model="calculatorInput"
          type="text"
          class="w-full px-md py-xs bg-black-950 border-2 border-black-950 text-white-50 rounded-full outline-none focus:border-1 focus:border-wit-blue-500 focus:border-blue-500 text-black placeholder-white-400"
          placeholder="Enter amount"
        />
      </div>
      <button
        class="sm:justify-self-end w-max h-max bg-wit-blue-500 text-black py-xs px-md rounded-full hover:bg-wit-blue-400 focus:outline-none focus:ring-1 focus:ring-wit-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 font-bold transition-all duration-200 text-lg"
        @click="calculateAPY"
      >
        Calculate APY
      </button>
      <p v-if="showError" class="text-red-50 text-sm">
        {{ errorMessage }}
      </p>
    </div>

    <div v-if="calculatedAPY && !errorMessage" class="mt-md p-6 rounded-lg">
      <div class="flex sm:flex-col gap-md">
        <div
          class="grid justify-center items-middle text-center p-md bg-black-950 rounded-lg w-full"
        >
          <p class="text-sm text-white-200 mb-xs">Annual Percentage Yield</p>
          <p class="text-2xl font-bold text-wit-blue-500">
            {{ calculatedAPY }}%
          </p>
        </div>
        <div
          class="grid justify-center items-middle text-center p-md bg-black-950 rounded-lg w-full"
        >
          <p class="text-sm text-white-200 mb-xs">Monthly Rewards</p>
          <p class="text-2xl font-bold text-wit-blue-500 w-max">
            {{ estimatedMonthlyRewards }} $WIT
          </p>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import Big from "big.js"
import { ref } from "vue"
import { formatNumber } from "@/utils/formatNumber.js"

const props = defineProps({
  totalStaked: String,
})

const calculatedAPY = ref(null)
const estimatedMonthlyRewards = ref(null)
const calculatorInput = ref("")
const errorMessage = ref("")
const calculateAPY = () => {
  if (!Number(calculatorInput.value)) {
    errorMessage.value = "Please enter a valid number"
    return
  } else if (Number(calculatorInput.value) < 10_000) {
    errorMessage.value = "Minimum skate amount is 10,000 $WIT"
    return
  } else if (Number(calculatorInput.value) > 10_000_000) {
    errorMessage.value = "Maximum skate amount is 10,000,000 $WIT"
    return
  } else {
    errorMessage.value = ""
    const yearlyEmission = 78_840_000_000_000_000
    // Can't use native BigInt because division of two BigInt values returns integer division
    // it truncates the decimal part and keeps only the whole number
    const apy = new Big(yearlyEmission).div(new Big(props.totalStaked))

    calculatedAPY.value = apy.mul(100).toFixed(2)
    const amount = parseFloat(calculatorInput.value) || 100000
    estimatedMonthlyRewards.value = formatNumber(
      apy.times(amount).div(12).round(0, 0),
    )
  }
}
</script>
