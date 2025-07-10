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
          <th
            scope="col"
            class="px-md py-md text-start cursor-pointer"
            @click="setSortLabel(Label.rank)"
          >
            Rank
            <SortArrow
              :currentLabel="currentLabel"
              :label="Label.rank"
              :order="order"
            />
          </th>
          <th
            scope="col"
            class="px-md py-md text-start cursor-pointer"
            @click="setSortLabel(Label.address)"
          >
            Withdrawer
            <SortArrow
              :currentLabel="currentLabel"
              :label="Label.address"
              :order="order"
            />
          </th>
          <th
            scope="col"
            class="px-md text-end cursor-pointer"
            @click="setSortLabel(Label.amount)"
          >
            Staked Amount
            <SortArrow
              :currentLabel="currentLabel"
              :label="Label.amount"
              :order="order"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="staker in sortedStakers"
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
            {{ formatNumber(new Big(nanoWitToWit(staker.amount)).round(0)) }}
            $WIT
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
      <WPagination
        v-if="total > pageSize"
        :total="total"
        :pageSize="pageSize"
        v-model:page="currentPage"
        class="text-white-50 mt-md"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { Big } from "big.js"
import { WPagination } from "wit-vue-ui"
import { ref, watch } from "vue"
import { Label, type AggregatedStaker, type Staker } from "@/types"

const props = defineProps({
  loading: Boolean,
  visibleStakers: {
    type: Array<Staker>,
    required: true,
  },
})

const currentPage = ref(1)
const total = computed(() => withdrawers.value.length)
watch(currentPage, (valX, _valY) => {
  console.log("Page updated:", valX)
})

const currentLabel: Ref<Label> = ref(Label.rank)
const order: Ref<boolean> = ref(true)
const withdrawers = computed(() => getWithdrawers(props.visibleStakers))

const sortedStakers = computed(() => {
  const formattedWithdrawers = formatWithdrawers(withdrawers.value)
  const sortFunctions = {
    [Label.rank]: (a: AggregatedStaker, b: AggregatedStaker) =>
      order.value ? a.rank - b.rank : b.rank - a.rank,
    [Label.address]: (a: AggregatedStaker, b: AggregatedStaker) =>
      order.value
        ? a.withdrawer.localeCompare(b.withdrawer)
        : b.withdrawer.localeCompare(a.withdrawer),
    [Label.amount]: (a: AggregatedStaker, b: AggregatedStaker) => {
      const amountA = BigInt(a.amount)
      const amountB = BigInt(b.amount)

      if (amountA === amountB) return 0

      return order.value
        ? amountB > amountA
          ? 1
          : -1
        : amountA > amountB
          ? 1
          : -1
    },
  }
  return formattedWithdrawers.sort(sortFunctions[currentLabel.value])
})

function setSortLabel(label: Label) {
  if (currentLabel.value === label) {
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
