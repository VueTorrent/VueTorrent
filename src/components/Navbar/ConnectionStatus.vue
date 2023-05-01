<script setup lang="ts">
import { mdiCheckNetwork, mdiCloseNetwork, mdiHelpNetwork, mdiNetworkOff } from '@mdi/js'
import { computed } from 'vue'

const props = defineProps<{
  status: 'connected' | 'disconnected' | 'firewalled' | 'unknown'
}>()

const currentIcon = computed(() => {
  switch (props.status) {
    case 'connected':
      return mdiCheckNetwork
    case 'disconnected':
      return mdiNetworkOff
    case 'firewalled':
      return mdiCloseNetwork
    default:
      return mdiHelpNetwork
  }
})
</script>

<template>
  <VTooltip>
    <template #activator="{ props }">
      <VBtn :icon="currentIcon" flat block v-bind="props" />
    </template>
    <span>{{ status }}</span>
  </VTooltip>
</template>
