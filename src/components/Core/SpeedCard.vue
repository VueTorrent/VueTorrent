<script setup lang="ts">
// props
const props = defineProps<{
  color: string
  icon: string
  value: string | number
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

const getDataUnit = (data: number) => {
  if (data === -1) return null
  if (!data) return 'B'
  const c = 1024
  const e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const f = Math.floor(Math.log(data) / Math.log(c))

  return `${e[f]}`
}
</script>

<template>
  <VDialog v-model="open">
    <template #activator>
      <VCard v-ripple flat rounded="md" color="secondary" class="speedCard" @click="open = !open">
        <!-- <VContainer>
          <VRow justify="space-evenly">
            <VCol>
              <VIcon :icon="icon" />
            </VCol>
            <VCol :class="`text-${color}`">
              {{ getSpeedValue(value) }}
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <span data-testid="SpeedCard-unit"> {{ getDataUnit(1) }}/s </span>
            </VCol>
          </VRow>
        </VContainer> -->
        <VLayout row align-center :class="`text-${color}`">
          <div class="d-flex pl-1" v-if="icon">
            <VIcon :icon="icon" />
          </div>
          <VLayout class="justify-space-between flex-column">
            <div>
              <span data-testid="SpeedCard-value">
                {{ getSpeedValue(value) }}
              </span>
            </div>
            <div>
              <span data-testid="SpeedCard-unit"> {{ getDataUnit(1) }}/s </span>
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
