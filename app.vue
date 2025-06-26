<template>
  <div
    class="grid grid-rows-[max-content_1fr_max-content] grid-cols-[1fr] w-full justify-items-center"
  >
    <div class="max-w-[1300px] w-full lg:px-md">
      <SvgIcon
        name="logo"
        class="w-[370px] h-auto mt-md sm:w-[340px] xs:w-[300px]"
      />
    </div>
    <div class="max-w-[1100px] w-full grid gap-2xl">
      <div
        class="grid gap-lg grid-cols-2 grid-rows-1 sm:grid-cols-1 mt-3xl items-center"
      >
        <div class="h-max lg:px-md">
          <h1 class="font-title text-5xl text-white-50 font-bold">
            Race to stake
          </h1>
          <p class="text-xl text-white-200 mt-sm">
            Secure the network, earn rewards
          </p>
        </div>
        <APYCalculator :total-staked="totalStaked" />
      </div>
      <StakeVolume
        :visible-stakers="visibleStakers"
        :total-staked="totalStaked"
        :circulating-supply="circulatingSupply"
        :loading="loading"
        class="h-max md:m-md"
      />
      <div class="md:m-md">
        <LeaderBoard :visible-stakers="visibleStakers" class="h-max" />
      </div>
    </div>
    <WFooter class="!bg-black-800 mt-2xl" :footer-sections="footerSections" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useIntervalFn } from "@vueuse/core"
import { WFooter } from "wit-vue-ui"
import dayjs from "dayjs"

import { footerSections } from "./footerSections"

const { data: staking, refresh: refreshStaking } =
  await useFetch("/api/staking")
const { data: supply, refresh: refreshSupply } = await useFetch("/api/supply")

useIntervalFn(refreshStaking, 10000)
useIntervalFn(refreshSupply, 10000)

function epochToTimestamp(genesisDate, epoch) {
  const secondsSinceGenesis = epoch * 45
  const targetDate = dayjs(genesisDate).add(secondsSinceGenesis, "second")

  return targetDate.valueOf()
}

const visibleStakers = computed(() => {
  return staking.value.map((stake) => {
    const validator = stake.key.validator
    const withdrawer = stake.key.withdrawer
    const amount = stake.value.coins.toString()
    const epoch = stake.value.epochs.mining
    const genesisDate = new Date(1602666000000)
    const timestamp = epochToTimestamp(genesisDate, epoch)

    return {
      id: `${withdrawer}${validator}${amount}${epoch}`,
      validator,
      withdrawer,
      amount,
      epoch,
      timestamp,
    }
  })
})

const totalStaked = computed(() => {
  return visibleStakers.value
    ? visibleStakers.value
        .reduce((acc, staker) => acc + BigInt(staker.amount), BigInt(0))
        .toString()
    : "0"
})

const circulatingSupply = computed(() => {
  return parseInt(supply.value)
})

const loading = ref(false)

const handleScroll = () => {
  const element = document.documentElement
  if (element.scrollHeight - element.scrollTop === element.clientHeight) {
    loadMoreStakers()
  }
}

const loadMoreStakers = () => {
  // TODO: use with real data
  if (visibleStakers.value.length >= 5) return
  loading.value = true
  setTimeout(() => {
    const newStakers = visibleStakers.value.map((staker) => ({
      ...staker,
      address:
        "0x" +
        Math.random().toString(16).slice(2, 10) +
        "..." +
        Math.random().toString(16).slice(2, 6),
      amount: Math.floor(staker.amount * 0.8),
    }))
    visibleStakers.value = [...visibleStakers.value, ...newStakers]
    loading.value = false
  }, 1000)
}

onMounted(async () => {
  window.addEventListener("scroll", handleScroll)
})
</script>

<style lang="scss">
@import url("wit-vue-ui/style.css");
</style>
