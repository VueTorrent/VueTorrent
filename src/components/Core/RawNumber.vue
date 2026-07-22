<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatRawNumber } from '@/helpers'

const props = defineProps<{ value: number }>()
const { locale } = useI18n()

const formattedValue = computed(() => {
  const parts = new Intl.NumberFormat(locale.value).formatToParts(1000.1)
  const thousandsSeparator = parts.find(part => part.type === 'group')?.value ?? ','
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value ?? '.'

  return formatRawNumber(props.value, thousandsSeparator, decimalSeparator)
})
</script>

<template>
  <v-tooltip :text="formattedValue" location="top">
    <template #activator="{ props: activatorProps }">
      <span v-bind="activatorProps" class="raw-number">
        <slot />
      </span>
    </template>
  </v-tooltip>
</template>

<style scoped>
.raw-number {
  cursor: help;
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-underline-offset: 0.2em;
}
</style>
