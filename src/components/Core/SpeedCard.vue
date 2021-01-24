<template>
  <v-card
    width="112px"
    flat
    color="secondary"
    class="mx-1"
  >
    <div
      class="pa-3 my-2 row"
      :class="color + '--text'"
    >
      <v-flex xs1>
        <v-icon :color="color" size="16px">
          {{ icon }}
        </v-icon>
      </v-flex>
      <v-flex xs7 class="text-center" style="font-family: 'Roboto Mono', sans-serif">
        <span>
          {{ value | getDataValue(2) }}
        </span>
      </v-flex>
      <v-flex xs3 class="pa-0 text-end">
        <span class="caption font-weight-regular">
          {{ value | getDataUnit(1) }}/s
        </span>
      </v-flex>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'SpeedCard',
  props: ['color', 'icon', 'value']
}
</script>