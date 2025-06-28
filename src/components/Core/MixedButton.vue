<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps<{
  /** Whether the default mobile breakpoint should be overridden */
  mobileOverride?: boolean
  /** Whether mobile layout should be rendered */
  mobileValue?: boolean
  /** force icon render on desktop */
  position?: 'left' | 'right'
  icon: string
  text: string
}>()

const { mobile: mobileRef } = useDisplay()

const mobile = computed(() => (props.mobileOverride ? props.mobileValue : mobileRef.value))
</script>

<template>
  <v-btn :icon="mobile">
    <v-icon v-if="mobile || position === 'left'" data-testid="mixedbtn-icon-left">
      {{ icon }}
    </v-icon>
    <span v-if="!mobile" data-testid="mixedbtn-text">{{ text }}</span>
    <v-icon v-if="!mobile && position === 'right'" data-testid="mixedbtn-icon-right">
      {{ icon }}
    </v-icon>
  </v-btn>
</template>
