<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const props = withDefaults(
  defineProps<{
    mobileOverride?: boolean
    mobileValue?: boolean
    icon: string
    text: string
  }>(),
  {
    mobileOverride: false
  }
)

const { mobile: mobileRef } = useDisplay()

const mobile = computed(() => (props.mobileOverride ? props.mobileValue : mobileRef.value))
</script>

<template>
  <v-btn :icon="mobile">
    <v-icon v-if="mobile" data-testid="mixedbtn-icon">{{ icon }}</v-icon>
    <span v-else data-testid="mixedbtn-text">{{ text }}</span>
  </v-btn>
</template>
