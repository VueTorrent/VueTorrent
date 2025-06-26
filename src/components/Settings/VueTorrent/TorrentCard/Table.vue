<script setup lang="ts">
import { computed } from 'vue'
import Draggable from 'vuedraggable'
import DashboardItem from '@/components/Settings/VueTorrent/DashboardItem.vue'
import { TorrentProperty } from '@/constants/vuetorrent'
import { useVueTorrentStore } from '@/stores'

const vueTorrentStore = useVueTorrentStore()

const properties = computed({
  get: () => vueTorrentStore.tableProperties,
  set: newValue => vueTorrentStore.updateTableProperties(newValue)
})

function toggleActive(property: TorrentProperty) {
  vueTorrentStore.toggleTableProperty(property.name)
}

function setActiveToAll(active: boolean) {
  properties.value = properties.value.map(property => ({ ...property, active }))
}

function selectNone() {
  setActiveToAll(false)
}

function selectAll() {
  setActiveToAll(true)
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-list>
        <v-list-subheader>{{ $t('settings.vuetorrent.torrentCard.table.tip') }}</v-list-subheader>

        <v-list-item>
          <v-row>
            <v-col cols="6" class="d-flex justify-center">
              <v-btn :text="$t('common.selectAll')" color="primary" @click="selectAll()" />
            </v-col>
            <v-col cols="6" class="d-flex justify-center">
              <v-btn :text="$t('common.selectNone')" color="primary" @click="selectNone()" />
            </v-col>
          </v-row>
        </v-list-item>

        <v-table>
          <draggable v-model="properties" item-key="name" tag="tbody" handle=".dnd-handle">
            <!--suppress VueUnrecognizedSlot -->
            <template #item="{ element }">
              <DashboardItem :property="element" @update="toggleActive(element)" />
            </template>
          </draggable>
        </v-table>
      </v-list>
    </v-col>
  </v-row>
</template>
