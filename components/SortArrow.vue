<template>
  <SvgIcon
    v-if="order && isCurrentLabel"
    :name="'arrow-down'"
    class="w-[10px] h-auto pl-xs inline"
  />
  <SvgIcon
    v-else-if="!order && isCurrentLabel"
    :name="'arrow-up'"
    class="w-[10px] h-auto pl-xs inline"
  />
  <SvgIcon v-else :name="'arrow-down'" class="w-[10px] h-auto pl-xs inline" />
</template>

<script setup lang="ts">
import type { Label } from "~/types"

const props = defineProps({
  label: {
    required: true,
    type: Number,
  },
  order: {
    required: true,
    type: Boolean,
  },
  currentLabel: {
    required: true,
    type: Number,
  },
})
const isCurrentLabel = computed(() => props.currentLabel === props.label)
</script>
