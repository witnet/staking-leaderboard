<template>
<BaseCard class="!w-full">
  <h2 class="text-xl font-bold text-white-50 mb-md p-md sm:w-max">
    Staking Leaderboard
  </h2>
      <table class="w-full divide-y divide-white-500 text-white-200 mb-md sm:w-md">
        <thead class="text-xs text-white-200 sm:hidden">
            <tr>
                <th scope="col" class="px-md py-md text-start">
                  Rank
                </th>
                <th scope="col" class="px-md py-md text-start">
                  Address
                </th>
                <th scope="col" class="px-md py-md text-start">
                  Staked Amount
                </th>
                <th scope="col" class="px-md text-end">
                  Timestamp
                </th>
            </tr>
        </thead>
        <tbody>
          <tr
            v-for="(staker, index) in visibleStakers"
            :key="staker.withdrawer"
            class="transition-all duration-200 even:bg-black-600 sm:grid sm:grid-col-1"
          >
            <th class="label">Rank</th>
            <td class="px-md py-md whitespace-nowrap">
              {{ index + 1 }}
            </td>
            <th class="label">Address</th>
            <td
              class="px-md py-md whitespace-nowrap text-sm text-wit-blue-500 font-mono truncate"
            >
              {{ staker.withdrawer ?? "unknown" }}
            </td>
            <th class="label">Amount</th>
            <td
             class="px-md py-md whitespace-nowrap text-sm font-bold text-black"
            >
              {{ formatNumber(nanoWitToWit(staker.amount).toFixed()) }} $WIT
            </td>
            <th class="label">Timestamp</th>
            <td
              class="px-md py-md whitespace-nowrap text-sm text-end sm:text-start font-mono"
            >
              {{ formatDate(staker.timestamp) }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="text-center py-4">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wit-blue-500"
        />
      </div>
    <!-- <div class="border-t border-white-500 flex justify-end pb-md" v-if="total > pageSize">
      <WPagination :total="total" :pageSize="pageSize" :page="currentPage" v-model:page="currentPage" class="text-white-50 mt-md" />
    </div> -->
</BaseCard>
</template>

<script setup>
import dayjs from "dayjs"
import { WPagination } from "wit-vue-ui"
import {ref, watch} from 'vue'
const props = defineProps({
  loading: Boolean,
  visibleStakers: Array,
})

function formatDate(timestamp) {
  const targetDate = dayjs(timestamp)

  return targetDate.format("MMM D, YYYY [@] hh:mm A")
}
const pageSize = ref(15)
const currentPage = ref(1)
const total = computed(() => props.visibleStakers.length)
watch(currentPage, (valX, _valY) => {
  console.log('Page updated:', valX)
})
</script>
<style lang="scss" scoped>
.pointer-events-none {
  @apply text-black-950;
}
.label {
  @apply hidden sm:block px-md pb-xs py-md font-bold text-sm text-white-300 text-start;
}
</style>