<template>
<WCard class="lg:col-span-3 space-y-8">
  <template #header>
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-[rgb(0,226,237)]">
        Staking Leaderboard
      </h2>
      <span class="text-gray-400 text-sm">Top Stakers</span>
    </div>
  </template>

  <template #description>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-800">
        <thead class="">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-bold text-[rgb(0,226,237)] uppercase tracking-wider"
            >
              Rank
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-bold text-[rgb(0,226,237)] uppercase tracking-wider"
            >
              Address
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-bold text-[rgb(0,226,237)] uppercase tracking-wider"
            >
              Staked Amount
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-bold text-[rgb(0,226,237)] uppercase tracking-wider"
            >
              Since
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-800">
          <tr
            v-for="(staker, index) in visibleStakers"
            :key="staker.address"
            class="hover:bg-gray-300 transition-all duration-200"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <span
                  class="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-[rgb(0,226,237)] font-bold"
                >
                  {{ index + 1 }}
                </span>
              </div>
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-[rgb(0,226,237)]"
            >
              {{ staker.address }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-bold text-black"
            >
              {{ formatNumber(nanoWitToWit(staker.amount).toFixed()) }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-400"
            >
              {{ staker.since }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="text-center py-4">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(0,226,237)]"
        />
      </div>
    </div>
  </template>
</WCard>
</template>

<script setup>
import { WCard } from "wit-vue-ui"
const props = defineProps({
  loading: Boolean,
  visibleStakers: Array
})
</script>