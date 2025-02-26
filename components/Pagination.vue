<template>
  <nav class="flex items-center gap-xs" aria-label="Pagination">
    <button
      type="button"
      :disabled="!canGoFirstOrPrev"
      @click="onClickPrev"
      :class="{
        'opacity-50': currentPage === 1,
        'pointer-events-none': currentPage === 1
      }"
      class="min-h-[38px] min-w-[38px] py-sm px-sm inline-flex justify-center items-center gap-sm text-sm rounded-lg hover:bg-wit-blue-400 hover:text-black-950 focus:outline-none"
      aria-label="Previous"
    >
      <svg
        class="shrink-0 size-3.5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m15 18-6-6 6-6"></path>
      </svg>
      <span>Previous</span>
    </button>
    <div class="flex items-center gap-x-xs">
      <button
        v-for="(p, i) in displayedPages"
        :key="`${p}-${i}`"
        type="button"
        class="min-h-[38px] min-w-[38px] flex justify-center items-center py-sm px-sm text-sm rounded-lg"
        :disabled="p === divider"
        @click="onClickPage(p)"
        :class="{
          'outline-none': p === currentPage,
          'bg-wit-blue-500': p === currentPage,
          'text-black-950': p === currentPage,
          'pointer-events-none': p === currentPage,
          'hover:bg-wit-blue-400': p !== divider,
          'hover:text-black-950': p !== divider
        }"
      >
        {{ p }}
      </button>
    </div>
    <button
      type="button"
      :disabled="!canGoLastOrNext"
      @click="onClickNext"
      class="min-h-lg min-w-lg py-sm px-sm inline-flex justify-center items-center gap-xs text-sm rounded-lg hover:bg-wit-blue-400 hover:text-black-950 focus:outline-none"
      :class="{ 'opacity-10': !canGoLastOrNext, 'pointer-events-none': !canGoLastOrNext }"
      aria-label="Next"
    >
      <span>Next</span>
      <svg
        class="shrink-0 size-3.5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
// Most of the following code is from NuxtUI library:
// https://github.com/nuxt/ui/blob/dev/src/runtime/components/navigation/Pagination.vue

import { computed } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    default: 7
  }
})

const currentPage = defineModel<number>('page', { required: true })

const divider = '...'

const pages = computed(() =>
  Array.from({ length: Math.ceil(props.total / props.pageSize) }, (_, i) => i + 1)
)
const displayedPages = computed(() => {
  const totalPages = pages.value.length
  const current = currentPage.value || 1
  const maxDisplayedPages = Math.max(props.max, 5)

  const r = Math.floor((Math.min(maxDisplayedPages, totalPages) - 5) / 2)
  const r1 = current - r
  const r2 = current + r

  const beforeWrapped = r1 - 1 > 1
  const afterWrapped = r2 + 1 < totalPages

  if (totalPages <= maxDisplayedPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const items: Array<number | string> = []

  items.push(1)

  if (beforeWrapped) items.push(divider)

  if (!afterWrapped) {
    const addedItems = current + r + 2 - totalPages
    for (let i = current - r - addedItems; i <= current - r - 1; i++) {
      items.push(i)
    }
  }

  for (let i = Math.max(2, r1); i <= Math.min(totalPages, r2); i++) {
    items.push(i)
  }

  if (!beforeWrapped) {
    const addedItems = 1 - (current - r - 2)
    for (let i = current + r + 1; i <= current + r + addedItems; i++) {
      items.push(i)
    }
  }

  if (afterWrapped) items.push(divider)

  if (r2 < totalPages) {
    items.push(totalPages)
  }

  // Replace divider by number on start edge case [1, '…', 3, ...]
  if (items.length >= 3 && items[1] === divider && items[2] === 3) {
    items[1] = 2
  }

  // Replace divider by number on end edge case [..., 48, '…', 50]
  if (
    items.length >= 3 &&
    items[items.length - 2] === divider &&
    items[items.length - 1] === items.length
  ) {
    items[items.length - 2] = items.length - 1
  }

  return items
})

const canGoFirstOrPrev = computed(() => currentPage.value > 1)
const canGoLastOrNext = computed(() => currentPage.value < pages.value.length)

function onClickPage(page: number | string) {
  if (typeof page === 'string') {
    return
  }

  currentPage.value = page
}

function onClickPrev() {
  if (!canGoFirstOrPrev.value) {
    return
  }

  currentPage.value--
}

function onClickNext() {
  if (!canGoLastOrNext.value) {
    return
  }

  currentPage.value++
}
</script>
