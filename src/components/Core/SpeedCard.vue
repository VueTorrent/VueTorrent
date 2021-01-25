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
      <v-flex xs7 class="text-center font-weight-bold robot-mono">
        <span data-testid="SpeedCard-value">
          {{ value | getDataValue(2) }}
        </span>
      </v-flex>
      <v-flex
        xs3
        class="caption robot-mono text-right mt-1"
      >
        <span class="speedUnits" data-testid="SpeedCard-unit">
          {{ value | getDataUnit(1) }}/s
        </span>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'SpeedCard',
  props: ['color', 'icon', 'value']
}
</script>

<style scoped>
.speedCard {
  padding: 32px 16px !important;
  font-size: 1.05em;
}

.speedUnits {
  font-size:  .8em !important;
}
</style>