<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <SvgIcon name="logo" />
    <!-- Hero Section with Total Staked Progress -->
    <div class="max-w-7xl mx-auto mb-16">
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-black mb-4">Race to stake</h1>
        <p class="text-[rgb(0,226,237)] text-xl">
          Secure the network, earn rewards
        </p>
      </div>

      <StakeVolume :visible-stakers="visibleStakers" :loading="loading" />
    </div>

    <!-- Main Content Grid with Sticky Calculator -->

    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
        <!-- Leaderboard Section - Spans 3 columns -->

        <LeaderBoard :visible-stakers="visibleStakers" />

        <!-- Sticky Calculator Section - Spans 2 columns -->

        <div class="lg:col-span-2">
          <APYCalculator />
        </div>
      </div>
    </div>
  </div>
  <WFooter :footer-sections="footerSections" />
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useIntervalFn } from "@vueuse/core"
import { WFooter } from "wit-vue-ui"
import { footerSections } from "./footerSections"

const { data, refresh } = await useFetch("/api/staking")

useIntervalFn(refresh, 10000)

const visibleStakers = computed(() => {
  return data.value.map((stake) => {
    const validator = stake.key.validator
    const withdrawer = stake.key.withdrawer
    const amount = stake.value.coins
    const epoch = stake.value.epochs.mining
    const since = new Date(
      new Date() - new Date(stake.value.epochs.mining * 45),
    ).toISOString()

    return {
      id: `${withdrawer}${validator}${amount}${epoch}`,
      validator,
      withdrawer,
      amount,
      epoch,
      since,
    }
  })
})

// const visibleStakers = ref(mockStakers);
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
