<script setup lang="ts">
import DashboardItem from '@/components/Settings/VueTorrent/DashboardItem.vue'
import { TorrentProperty } from '@/constants/vuetorrent'
import { useVueTorrentStore } from '@/stores'
import { computed } from 'vue'
import Draggable from 'vuedraggable'

const vueTorrentStore = useVueTorrentStore()

const busyTorrentProperties = computed({
  get: () => vueTorrentStore.tableProperties,
  set: newValue => vueTorrentStore.updateTableProperties(newValue)
})

function toggleActive(property: TorrentProperty) {
  vueTorrentStore.toggleTableProperty(property.name)
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-list>
        <v-list-subheader>{{ $t('settings.vuetorrent.torrentCard.table.tip') }}</v-list-subheader>

        <v-table>
          <draggable v-model="busyTorrentProperties" item-key="name" tag="tbody" handle=".dnd-handle">
            <template v-slot:item="{ element }">
              <DashboardItem :property="element" @update="toggleActive(element)" />
            </template>
          </draggable>
        </v-table>
      </v-list>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
