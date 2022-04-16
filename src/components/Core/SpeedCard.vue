<template>
  <v-card
    v-ripple
    flat
    rounded="md"
    color="secondary"
    class="speedCard"
    data-testid="SpeedCard"
    @click="open"
  >
    <v-layout row align-center :class="color + '--text'">
      <v-flex v-if="icon" xs2 class="pl-1">
        <v-icon data-testid="SpeedCard-icon" :color="color" size="20px">
          {{ icon }}
        </v-icon>
      </v-flex>
      <v-layout column xs10>
        <v-flex class="text-center font-weight-bold robot-mono">
          <span data-testid="SpeedCard-value">
            {{ value | getSpeedValue }}
          </span>
        </v-flex>
        <v-flex
          class="caption robot-mono text-center mt-n1"
        >
          <span data-testid="SpeedCard-unit">
            {{ value | getDataUnit(1) }}/s
          </span>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
import { General } from '@/mixins'

export default {
  name: 'SpeedCard',
  filters: {
    getSpeedValue(value) {
      if (!value) return '0'
      const c = 1024
      const d = value > 1048576 ? 1 : 0 // 2 decimals when MB
      const f = Math.floor(Math.log(value) / Math.log(c))

      return `${parseFloat((value / Math.pow(c, f)).toFixed(d))}`
    }
  },
  mixins: [General],
  props: ['color', 'icon', 'value'],
  methods: {
    open() {
      this.createModal('SpeedLimitModal', { mode: this.color })
    }
  }
}
</script>

<style scoped>
.speedCard {
  padding: 20px 20px !important;
  font-size: 1.10em;
  cursor: pointer;
}
</style>
