<script setup lang="ts">
import DashboardItem from '@/components/Settings/VueTorrent/DashboardItem.vue'
import { TorrentProperty } from '@/constants/vuetorrent'
import { useVueTorrentStore } from '@/stores'
import { computed } from 'vue'
import Draggable from 'vuedraggable'

const vueTorrentStore = useVueTorrentStore()

const busyTorrentProperties = computed({
  get: () => vueTorrentStore.busyTorrentProperties,
  set: newValue => vueTorrentStore.updateBusyProperties(newValue)
})
const doneTorrentProperties = computed({
  get: () => vueTorrentStore.doneTorrentProperties,
  set: newValue => vueTorrentStore.updateDoneProperties(newValue)
})

function toggleActive(isBusy: boolean, property: TorrentProperty) {
  if (isBusy) {
    vueTorrentStore.toggleBusyProperty(property.name)
  } else {
    vueTorrentStore.toggleDoneProperty(property.name)
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-list>
        <v-list-subheader>{{ $t('settings.vuetorrent.torrentCard.list.busyTip') }}</v-list-subheader>

        <v-table>
          <draggable v-model="busyTorrentProperties" item-key="name" tag="tbody" handle=".dnd-handle">
            <template v-slot:item="{ element }">
              <DashboardItem :property="element" @update="toggleActive(true, element)" />
            </template>
          </draggable>
        </v-table>
      </v-list>
    </v-col>

    <v-col cols="12" md="6">
      <v-list>
        <v-list-subheader>{{ $t('settings.vuetorrent.torrentCard.list.doneTip') }}</v-list-subheader>

        <v-table>
          <draggable v-model="doneTorrentProperties" item-key="name" tag="tbody" handle=".dnd-handle">
            <template v-slot:item="{ element }">
              <DashboardItem :property="element" @update="toggleActive(false, element)" />
            </template>
          </draggable>
        </v-table>
      </v-list>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
