<script setup lang="ts">
import { mdiCheckNetwork, mdiCloseNetwork, mdiHelpNetwork, mdiNetworkOff } from '@mdi/js'
import { computed } from 'vue'

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
