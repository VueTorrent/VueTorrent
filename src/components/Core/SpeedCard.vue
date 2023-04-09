<script setup lang="ts">
// props
const props = defineProps<{
  color: string
  icon: string
  value: string
}>()

// data
const open = ref(false)

//methods
const getSpeedValue = (input: string | number) => {
  if (!input) return '0'

  // convert value to a number
  const value = Number(input)
  const c = 1024
  const d = value > 1048576 ? 1 : 0 // 2 decimals when MB
  const f = Math.floor(Math.log(value) / Math.log(c))
  return `${parseFloat((value / Math.pow(c, f)).toFixed(d))}`
}
</script>

<template>
  <VDialog v-model="open" width="500">
    <template #activator>
      <VCard v-ripple flat rounded="md" color="secondary" class="speedCard" @click="open = !open">
        <VLayout row align-center :class="color + '--text'">
          <div class="d-flex" v-if="icon">
            <VIcon :icon="icon" />
          </div>
          <VLayout column xs10>
            <!-- <v-flex class="text-center font-weight-bold robot-mono"> -->
            <span data-testid="SpeedCard-value">
              {{ value || getSpeedValue(value) }}
            </span>
            <!-- </v-flex> -->
            <!-- <v-flex class="caption robot-mono text-center mt-n1"> -->
            <!-- <span data-testid="SpeedCard-unit"> {{ value || getDataUnit(1) }}/s </span> -->
            <!-- </v-flex> -->
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
