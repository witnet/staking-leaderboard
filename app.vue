<template>
  <div class="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
    <!-- Hero Section with Total Staked Progress -->
    <div class="max-w-7xl mx-auto mb-16">
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-white mb-4">Staking Dashboard</h1>
        <p class="text-[rgb(0,226,237)] text-xl">
          Secure the network, earn rewards
        </p>
      </div>

      <WCard class="">
        <template v-slot:header>
          <div class="flex justify-center items-center">
            <h2 class="text-2xl font-bold text-[rgb(0,226,237)]">
              Race to stake
            </h2>
          </div>
        </template>

        <template v-slot:description>
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
                  :style="{ width: `${(totalStaked / stakingGoal) * 100}%` }"></div>
              </div>
            </div>
          </div>
        </template>
      </WCard>
    </div>

    <!-- Main Content Grid with Sticky Calculator -->

    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
        <!-- Leaderboard Section - Spans 3 columns -->

        <WCard class="lg:col-span-3 space-y-8">
          <template v-slot:header>
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-bold text-[rgb(0,226,237)]">
                Staking Leaderboard
              </h2>
              <span class="text-gray-400 text-sm">Top Stakers</span>
            </div>
          </template>

          <template v-slot:description>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-800">
                <thead class="bg-gray-900">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-bold text-[rgb(0,226,237)] uppercase tracking-wider">
                      Rank
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-bold text-[rgb(0,226,237)] uppercase tracking-wider">
                      Address
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-bold text-[rgb(0,226,237)] uppercase tracking-wider">
                      Staked Amount
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-bold text-[rgb(0,226,237)] uppercase tracking-wider">
                      Since
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-gray-900 divide-y divide-gray-800">
                  <tr v-for="(staker, index) in visibleStakers" :key="staker.address"
                    class="hover:bg-gray-800 transition-all duration-200">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <span
                          class="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-[rgb(0,226,237)] font-bold">
                          {{ index + 1 }}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[rgb(0,226,237)]">
                      {{ staker.address }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                      {{ formatNumber(staker.amount) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {{ staker.since }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="loading" class="text-center py-4">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(0,226,237)]"></div>
              </div>
            </div>
          </template>
        </WCard>

        <!-- Sticky Calculator Section - Spans 2 columns -->
        <div class="lg:col-span-2">
          <WCard
            class="sticky !h-fit">
            >
            <template v-slot:header>
              <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-[rgb(0,226,237)] mb-2">
                  APY Calculator
                </h2>
                <p class="text-gray-400">Calculate your potential earnings</p>
              </div>
            </template>

            <template v-slot:description>
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-bold text-[rgb(0,226,237)] mb-2">
                    Enter Address or Amount
                  </label>
                  <input v-model="calculatorInput" type="text"
                    class="w-full px-4 py-3 bg-gray-800 border-2 border-[rgb(0,226,237)] rounded-lg focus:ring-[rgb(0,226,237)] focus:border-[rgb(0,226,237)] text-white placeholder-gray-500 transition-all duration-200"
                    placeholder="Enter wallet address or amount..." />
                </div>

                <button @click="calculateAPY"
                  class="w-full bg-[rgb(0,226,237)] text-black py-3 px-4 rounded-lg hover:bg-[rgb(0,200,210)] focus:outline-none focus:ring-2 focus:ring-[rgb(0,226,237)] focus:ring-offset-2 focus:ring-offset-gray-900 font-bold transition-all duration-200 text-lg">
                  Calculate APY
                </button>

                <div v-if="calculatedAPY"
                  class="mt-8 p-6 bg-gray-800 rounded-lg border-2 border-[rgb(0,226,237)] transform transition-all duration-300 hover:scale-[1.02]">
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
        </div>
      </div>
    </div>
  </div>
  <WFooter :footer-sections="footerSections" />
</template>

<script setup>
import { WFooter, WCard } from "wit-vue-ui";

// Script remains the same as the previous version
import { ref, onMounted } from "vue";
const footerSections = [
  {
    title: "Developers",
    links: [
      {
        url: "#reference",
        label: "reference",
      },
      {
        url: "#randomness",
        label: "randomness",
      },
      {
        url: "#randomness",
        label: "randomness",
      },
      {
        url: "#supported_chains",
        label: "supported_chains",
      },
      {
        url: "#solidity_sdk",
        label: "solidity_sdk",
      },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      {
        url: "#block_explorer",
        label: "block_explorer",
      },
      {
        url: "#data_feeds_explorer",
        label: "data_feeds_explorer",
      },
      {
        url: "#sheikah",
        label: "sheikah",
      },
      {
        url: "#my_wit_wallet",
        label: "my_wit_wallet",
      },
    ],
  },
  {
    title: "Learn",
    links: [
      {
        url: "#whitepaper",
        label: "whitepaper",
      },
      {
        url: "#medium",
        label: "medium",
      },
      {
        url: "#tutorials",
        label: "tutorials",
      },
    ],
  },
];
const stakingGoal = 300_000_000;
const totalStaked = ref(175_000_000);
const mockStakers = [
  { address: "0x1234...5678", amount: 15000000, since: "2024-01-15" },
  { address: "0x8765...4321", amount: 12000000, since: "2024-01-20" },
  { address: "0x9876...3210", amount: 10000000, since: "2024-02-01" },
  { address: "0x2468...1357", amount: 8000000, since: "2024-02-10" },
  { address: "0x1357...2468", amount: 6000000, since: "2024-02-15" },
];

const visibleStakers = ref(mockStakers);
const loading = ref(false);
const calculatorInput = ref("");
const calculatedAPY = ref(null);
const estimatedMonthlyRewards = ref(null);

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const calculateAPY = () => {
  calculatedAPY.value = "12.5";
  const amount = parseFloat(calculatorInput.value) || 100000;
  estimatedMonthlyRewards.value = formatNumber(
    Math.floor((amount * 0.125) / 12)
  );
};

const handleScroll = () => {
  const element = document.documentElement;
  if (element.scrollHeight - element.scrollTop === element.clientHeight) {
    loadMoreStakers();
  }
};

const loadMoreStakers = () => {
  if (visibleStakers.value.length >= 5) return;
  loading.value = true;
  setTimeout(() => {
    const newStakers = mockStakers.map((staker) => ({
      ...staker,
      address:
        "0x" +
        Math.random().toString(16).slice(2, 10) +
        "..." +
        Math.random().toString(16).slice(2, 6),
      amount: Math.floor(staker.amount * 0.8),
    }));
    visibleStakers.value = [...visibleStakers.value, ...newStakers];
    loading.value = false;
  }, 1000);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<style lang="scss">
@import url("wit-vue-ui/style.css");

</style>
