<script setup lang="ts">
import { getDataUnit } from '@/utils/dataParse'
// props
const props = defineProps<{
  color: string
  icon: string
  value: number
}>()

// data
const open = ref(false)

//methods
const getSpeedValue = (value: string | number) => {
  if (!value) return '0'
  const data = Number(value)
  const c = 1024
  const d = data > 1048576 ? 1 : 0 // 2 decimals when MB
  const f = Math.floor(Math.log(data) / Math.log(c))

  return `${parseFloat((data / Math.pow(c, f)).toFixed(d))}`
}
</script>

<template>
  <VDialog v-model="open">
    <template #activator>
      <VBtn
        flat
        rounded="md"
        color="secondary"
        :class="`speedCard w-100 text-${color}`"
        @click="open = !open"
        :prependIcon="icon"
        height="50"
      >
        <VLayout class="justify-space-between flex-column" align-center justify-center>
          <span data-testid="SpeedCard-value" class="align-self-center font-weight-bold">
            {{ getSpeedValue(value) }}
          </span>
          <span data-testid="SpeedCard-unit" class="text-caption align-self-center mt-n1">
            {{ getDataUnit(value) }}/s
          </span>
        </VLayout>
      </VBtn>
    </template>
  </VDialog>
</template>

<style scoped>
.speedCard {
  font-size: 1.1em;
}
</style>
