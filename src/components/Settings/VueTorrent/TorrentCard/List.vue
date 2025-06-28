<script setup lang="ts">
import { computed } from 'vue'
import draggable from 'vuedraggable'
import DashboardItem from '@/components/Settings/VueTorrent/DashboardItem.vue'
import { TorrentProperty } from '@/constants/vuetorrent'
import { useVueTorrentStore } from '@/stores'

const vueTorrentStore = useVueTorrentStore()

const busyProperties = computed({
  get: () => vueTorrentStore.busyTorrentProperties,
  set: newValue => vueTorrentStore.updateBusyProperties(newValue)
})
const doneProperties = computed({
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

function setActiveToAll(isBusy: boolean, active: boolean) {
  if (isBusy) {
    busyProperties.value = busyProperties.value.map(property => ({ ...property, active }))
  } else {
    doneProperties.value = doneProperties.value.map(property => ({ ...property, active }))
  }
}

function selectNone(isBusy: boolean) {
  setActiveToAll(isBusy, false)
}

function selectAll(isBusy: boolean) {
  setActiveToAll(isBusy, true)
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-list>
        <v-list-subheader>{{ $t('settings.vuetorrent.torrentCard.list.busyTip') }}</v-list-subheader>

        <v-list-item>
          <v-row>
            <v-col cols="6" class="d-flex justify-center">
              <v-btn :text="$t('common.selectAll')" color="primary" @click="selectAll(true)" />
            </v-col>
            <v-col cols="6" class="d-flex justify-center">
              <v-btn :text="$t('common.selectNone')" color="primary" @click="selectNone(true)" />
            </v-col>
          </v-row>
        </v-list-item>

        <v-table>
          <draggable v-model="busyProperties" item-key="name" tag="tbody" handle=".dnd-handle">
            <!--suppress VueUnrecognizedSlot -->
            <template #item="{ element }">
              <DashboardItem :property="element" @update="toggleActive(true, element)" />
            </template>
          </draggable>
        </v-table>
      </v-list>
    </v-col>

    <v-col cols="12" md="6">
      <v-list>
        <v-list-subheader>{{ $t('settings.vuetorrent.torrentCard.list.doneTip') }}</v-list-subheader>

        <v-list-item>
          <v-row>
            <v-col cols="6" class="d-flex justify-center">
              <v-btn :text="$t('common.selectAll')" color="primary" @click="selectAll(false)" />
            </v-col>
            <v-col cols="6" class="d-flex justify-center">
              <v-btn :text="$t('common.selectNone')" color="primary" @click="selectNone(false)" />
            </v-col>
          </v-row>
        </v-list-item>

        <v-table>
          <draggable v-model="doneProperties" item-key="name" tag="tbody" handle=".dnd-handle">
            <!--suppress VueUnrecognizedSlot -->
            <template #item="{ element }">
              <DashboardItem :property="element" @update="toggleActive(false, element)" />
            </template>
          </draggable>
        </v-table>
      </v-list>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
