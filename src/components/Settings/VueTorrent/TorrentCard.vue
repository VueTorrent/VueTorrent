<script setup lang="ts">
import { useVueTorrentStore } from '@/stores'
import { ref, watch } from 'vue'
import Draggable from 'vuedraggable'

const vuetorrentStore = useVueTorrentStore()

const isDragging = ref(false)

const items = ref([
  { order: 1, name: 'elem1' },
  { order: 2, name: 'elem2' },
  { order: 3, name: 'elem3' },
  { order: 4, name: 'elem4' },
  { order: 5, name: 'elem5' },
  { order: 6, name: 'elem6' },
])

watch(items, (newValue) => {
  console.log(newValue)
})
</script>

<template>
  <v-list>
    <v-list-subheader>{{ $t('settings.vuetorrent.torrentCard.busyTorrentTip') }}</v-list-subheader>

    <Draggable v-model="items"
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