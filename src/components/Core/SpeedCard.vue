<template>
  <v-card
    flat
    color="secondary"
    class="speedCard"
    data-testid="SpeedCard"
  >
    <v-layout row :class="color + '--text'">
      <v-flex v-if="icon" xs2>
        <v-icon data-testid="SpeedCard-icon" :color="color" size="16px">
          {{ icon }}
        </v-icon>
      </v-flex>
      <v-flex xs6 class="text-center font-weight-bold robot-mono">
        <span data-testid="SpeedCard-value">
          {{ value | getSpeedValue }}
        </span>
      </v-flex>
      <v-flex
        xs4
        class="caption robot-mono text-right mt-1"
      >
        <span data-testid="SpeedCard-unit">
          {{ value | getDataUnit(1) }}/s
        </span>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'SpeedCard',
  filters: {
    getSpeedValue(value) {
      if (!value) return '0'
      const c = 1024
      const d = value > 1048576 ? 2 : 0 // 2 decimals when MB
      const f = Math.floor(Math.log(value) / Math.log(c))

      return `${parseFloat((value / Math.pow(c, f)).toFixed(d))}`
    }
  },
  props: ['color', 'icon', 'value']
}
</script>

<style scoped>
.speedCard {
  padding: 32px 16px !important;
  font-size: 1.05em;
}
</style>