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
      <VCard v-ripple flat rounded="md" color="secondary" class="speedCard" @click="open = !open">
        <VLayout row align-center :class="`text-${color}`">
          <div class="d-flex pl-1">
            <VIcon data-testid="SpeedCard-icon" :icon="icon" />
          </div>
          <VLayout class="justify-space-between flex-column" xs10>
            <div class="align-self-center font-weight-bold">
              <span data-testid="SpeedCard-value">
                {{ getSpeedValue(value) }}
              </span>
            </div>
            <div class="text-caption align-self-center mt-n1">
              <span data-testid="SpeedCard-unit"> {{ getDataUnit(value) }}/s </span>
            </div>
          </VLayout>
        </VLayout>
      </VCard>
    </template>
  </VDialog>
</template>

<style scoped>
.speedCard {
  padding: 20px 20px !important;
  font-size: 1.1em;
  cursor: pointer;
}
</style>
