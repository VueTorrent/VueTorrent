<script setup lang="ts">
import { mdiCheckNetwork, mdiNetworkOff, mdiCloseNetwork, mdiHelpNetwork } from '@mdi/js'

const props = defineProps<{
  status: 'connected' | 'disconnected' | 'connecting' | 'error'
}>()

const currentIcon = computed(() => {
  //   switch (props.status) {
  //     case 'connected':
  //       return mdiCheckNetwork
  //     case 'disconnected':
  //       return mdiNetworkOff
  //     case 'connecting':
  //       return mdiCloseNetwork
  //     case 'error':
  //       return mdiHelpNetwork
  //   }
  const icons = {
    connected: mdiCheckNetwork,
    disconnected: mdiNetworkOff,
    firewalled: mdiCloseNetwork
  }

  const icon = icons[props.status]

  if (!props.status || !icon) return mdiHelpNetwork

  return icon
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
