<script setup lang="ts">
import { useVueTorrentStore } from '@/stores'
import { ref } from 'vue'
import Draggable from 'vuedraggable'

const vuetorrentStore = useVueTorrentStore()

const isDragging = ref(false)
</script>

<template>
  <v-list>
    <v-list-subheader>{{ $t('settings.vuetorrent.torrentCard.busyTorrentTip') }}</v-list-subheader>

    <Draggable v-model="vuetorrentStore.busyTorrentProperties"
               group="busyDesktop"
               @start="isDragging = true"
               @ended="isDragging = false"
               item-key="order">
      <template v-slot:item="{element}">
        <v-list-item>{{ element.name }}</v-list-item>
      </template>
    </Draggable>
  </v-list>
</template>

<style scoped lang="scss">

</style>