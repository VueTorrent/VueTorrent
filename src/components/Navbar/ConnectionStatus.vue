<template>
  <v-tooltip top>
    <template #activator="{ on }">
      <div class="d-flex justify-center fill-height">
        <v-icon class="white--text" v-on="on">
          {{ currentIcon }}
        </v-icon>
      </div>
    </template>

    <span>{{ status || $t('unknown') }}</span>
  </v-tooltip>
</template>

<script>
import {
  mdiCheckNetwork,
  mdiNetworkOff,
  mdiCloseNetwork,
  mdiHelpNetwork
} from '@mdi/js'

export default {
  props: ['status'],
  computed: {
    currentIcon() {
      const icons = {
        connected: mdiCheckNetwork,
        disconnected: mdiNetworkOff,
        firewalled: mdiCloseNetwork
      }
      const icon = icons?.[this.status]

      if (!this.status || !icon) return mdiHelpNetwork

      return icon
    }
  }
}
</script>
