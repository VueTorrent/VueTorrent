<template>
  <v-card v-ripple flat rounded="md" color="secondary" class="speedCard" data-testid="SpeedCard" @click="open">
    <v-layout row align-center :class="color + '--text'">
      <v-flex v-if="icon" xs2 class="pl-1">
        <v-icon data-testid="SpeedCard-icon" :color="color" size="20px">
          {{ icon }}
        </v-icon>
      </v-flex>
      <v-layout column xs10>
        <v-flex class="text-center font-weight-bold robot-mono">
          <span data-testid="SpeedCard-value">{{ value | formatSpeedValue(shouldUseBitSpeed()) }}</span>
        </v-flex>
        <v-flex class="caption robot-mono text-center mt-n1">
          <span data-testid="SpeedCard-unit">{{ value | formatSpeedUnit(shouldUseBitSpeed()) }}</span>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { General } from '@/mixins'

export default defineComponent({
  name: 'SpeedCard',
  mixins: [General],
  props: ['color', 'icon', 'value'],
  computed: {
    ...mapGetters(['shouldUseBitSpeed'])
  },
  methods: {
    open() {
      this.createModal('SpeedLimitModal', { mode: this.color })
    }
  }
})
</script>

<style scoped>
.speedCard {
  padding: 20px 20px !important;
  font-size: 1.1em;
  cursor: pointer;
}
</style>
