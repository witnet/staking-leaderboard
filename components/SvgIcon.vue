<template>
  <customIcon v-if="name" />
</template>
<script setup>
const props = defineProps({
  name: {
    type: String,
    default: null,
  },
})
const url = computed(() => `${props.name}`.trim())
const customIcon = defineAsyncComponent(
  () => import(`@/assets/svg/${url.value}.svg`),
)
</script>
