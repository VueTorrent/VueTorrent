<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useNumberFormatter } from '@/composables'
import { useVueTorrentStore } from '@/stores'

const props = defineProps<{
  value: number
  unit?: string
}>()

const { formatRawNumber } = useNumberFormatter()
const { enableRawValueTooltips } = storeToRefs(useVueTorrentStore())

const formattedValue = computed(() => formatRawNumber({ value: props.value, unit: props.unit }))
</script>

<template>
  <v-tooltip v-if="enableRawValueTooltips" :text="formattedValue" location="top">
    <template #activator="{ props: activatorProps }">
      <span v-bind="activatorProps" class="raw-number-tooltip" tabindex="0">
        <slot />
      </span>
    </template>
  </v-tooltip>
  <slot v-else />
</template>

<style scoped>
.raw-number-tooltip {
  cursor: help;
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-underline-offset: 0.2em;
}

.raw-number-tooltip:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
