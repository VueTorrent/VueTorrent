<script setup lang="ts">
import { mdiCheckNetwork, mdiNetworkOff, mdiCloseNetwork, mdiHelpNetwork } from '@mdi/js'

const props = defineProps<{
  status: 'connected' | 'disconnected' | 'firewalled'
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
      <div class="d-flex justify-center fill-height">
        <VIcon v-bind="props">
          {{ currentIcon }}
        </VIcon>
      </div>
    </template>
  </VTooltip>
</template>
