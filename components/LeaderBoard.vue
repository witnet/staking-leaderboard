<template>
  <BaseCard class="!w-full">
    <h2 class="text-xl font-bold text-white-50 mb-md p-md sm:w-max">
      Staking Leaderboard
    </h2>
    <table
      class="w-full divide-y divide-white-500 text-white-200 mb-md sm:w-md"
    >
      <thead class="text-xs text-white-200 sm:hidden">
        <tr>
          <th scope="col" class="px-md py-md text-start cursor-pointer" @click="setSortLabel(Label.rank)" >Rank <span class="text-[8px] pl-xs">{{ getOrderArrow(Label.rank) }}</span></th>
          <th scope="col" class="px-md py-md text-start cursor-pointer" @click="setSortLabel(Label.address)">Withdrawer <span class="text-[8px] pl-xs">{{ getOrderArrow(Label.address) }}</span></th>
          <th scope="col" class="px-md text-end cursor-pointer" @click="setSortLabel(Label.amount)">Staked Amount <span class="text-[8px] pl-xs">{{ getOrderArrow(Label.amount) }}</span></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(staker) in sortedList"
          :key="staker.withdrawer"
          class="transition-all duration-200 even:bg-black-600 sm:grid sm:grid-col-1 sm:py-md"
        >
          <th class="label">Rank</th>
          <td class="px-md py-md [&&]:sm:pt-sm whitespace-nowrap">
            {{ staker.rank }}
          </td>
          <th class="label">Withdrawer</th>
          <td
            class="px-md py-md [&&]:sm:pt-sm whitespace-nowrap text-sm text-wit-blue-500 font-mono truncate hover:cursor-pointer [&&]sm:py-xs"
          >
            <a
              :href="`https://witnet.network/search/${staker.withdrawer}`"
              target="_blank"
            >
              {{ staker.withdrawer ?? "unknown" }}
            </a>
          </td>
          <th class="label">Amount</th>
          <td
            class="px-md py-md [&&]:sm:pt-sm whitespace-nowrap text-sm font-bold text-black text-end"
          >
            {{ formatNumber(nanoWitToWit(staker.amount).toFixed()) }} $WIT
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="text-center py-4">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wit-blue-500"
      />
    </div>
    <div class="flex justify-end pb-md">
      <WPagination v-if="total > pageSize" :total="total" :pageSize="pageSize" v-model:page="currentPage" class="text-white-50 mt-md" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import dayjs from "dayjs"
import { WPagination } from "wit-vue-ui"
import { ref, watch } from "vue"
enum Label {
  rank,
  address,
  amount,
}
type Staker = {
  withdrawer: string,
  amount: number
}
type AggregatedStaker = {
  rank: number
  amount: number
  withdrawer: string,
}
const props = defineProps({
  loading: Boolean,
  visibleStakers: {
    type: Array<Staker>,
    required: true,
  }
})

function formatDate(timestamp: number) {
  const targetDate = dayjs(timestamp)

  return targetDate.format("MMM D, YYYY [@] hh:mm A")
}

const currentPage = ref(1)
const total = computed(() => withdrawers.value.length)
watch(currentPage, (valX, _valY) => {
  console.log("Page updated:", valX)
})

const currentLabel: Ref<Label> = ref(Label.rank)
const order: Ref<boolean> = ref(true)
const withdrawers = computed(() => {
  return  Object.values(props.visibleStakers.reduce((acc: Record<string, Staker>, staker: Staker) => {
    return {
      ...acc,
      [staker.withdrawer]: {withdrawer: staker.withdrawer, amount: (acc[staker.withdrawer] ? acc[staker.withdrawer].amount : 0) + staker.amount}
    }
  }, {}))
})
function getOrderArrow(label: Label) {
  if(currentLabel.value === label) {
    return order.value ? '▼': '▲'
  } else {
    return '▼'
  }
}
function getWithdrawersWithRank(): AggregatedStaker[] {
  return  withdrawers.value.sort((a, b) => b.amount - a.amount).map((staker, index) => {
    return {
      ...staker,
      rank: index + 1
    }
  })
}
const sortedList = computed(() => {
  const sortedInfoA = {
    [Label.rank]: getWithdrawersWithRank().sort((a, b) => a.rank - b.rank),
    [Label.address] : getWithdrawersWithRank().sort((a, b) => a.withdrawer.localeCompare(b.withdrawer)),
    [Label.amount]: getWithdrawersWithRank().sort((a, b) => b.amount - a.amount),
  }
  const sortedInfoB = {
    [Label.rank]: getWithdrawersWithRank().sort((a, b) => b.rank - a.rank),
    [Label.address] : getWithdrawersWithRank().sort((a, b) => b.withdrawer.localeCompare(a.withdrawer)),
    [Label.amount]: getWithdrawersWithRank().sort((a, b) => a.amount - b.amount),
  }
  return order.value ? sortedInfoA[currentLabel.value] : sortedInfoB[currentLabel.value]
})

function setSortLabel(label: Label) {
  if(currentLabel.value === label) {
    order.value = !order.value
  } else {
    currentLabel.value = label
    order.value = true
  }
}

const pageSize = ref(withdrawers.value.length)
</script>
<style lang="scss" scoped>
.pointer-events-none {
  @apply text-black-950;
}
.label {
  @apply hidden sm:block px-md font-bold text-sm text-white-300 text-start;
}
.t-value {
  @apply px-md py-md [&&]:sm:pt-sm;
}
</style>
