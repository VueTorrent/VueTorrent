<template>
  <v-list-item class="ma-2 elevation-2 rounded-lg pointer">
    <v-checkbox v-model="active" dense hide-details class="pa-0 ma-0" />
    <v-list-item-content>
      <v-list-item-title class="truncate" v-text="label" />
    </v-list-item-content>
    <v-list-item-action v-if="isDraggable">
      <v-icon>
        {{ mdiMenu }}
      </v-icon>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mdiMenu } from '@mdi/js'
import i18n from '@/plugins/i18n'
import { TorrentProperty } from '@/types/vuetorrent'

export default defineComponent({
  name: 'VDashboardItem',
  props: { isDraggable: Boolean, property: TorrentProperty },
  data: () => ({ mdiMenu }),
  computed: {
    active: {
      get: function () {
        return this.property?.active
      },
      // setter
      set: function (newValue: boolean) {
        if (this.property) this.property.active = newValue
      }
    },
    label() {
      if (!this.property?.name) return ''

      // convert component name from PascalCase to snake_case to match locale key
      const value = this.property.name.replace(/\.?([A-Z]+)/g, (x: string, y: string) => '_' + y.toLowerCase()).replace(/^_/, '')
      return i18n.t(`torrent.properties.${value}`)
    }
  }
})
</script>
