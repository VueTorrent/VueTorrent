<script setup lang="ts">
import { useVueTorrentStore } from '@/stores'
import { ref, watch } from 'vue'
// import Draggable from 'vuedraggable'

const vuetorrentStore = useVueTorrentStore()

const isDragging = ref(false)

watch(isDragging, (value) => {
  console.log(value)
})
watch(() => vuetorrentStore.busyTorrentProperties, (value) => {
  console.log(value)
})
</script>

<template>
  <v-list>
    <v-list-subheader>{{ $t('settings.vuetorrent.torrentCard.busyTorrentTip') }}</v-list-subheader>

<!--    <Draggable v-model="vuetorrentStore.busyTorrentProperties"-->
<!--               item-key="name">-->
<!--      <template v-slot:item="{ element }">-->
<!--        <v-list-item>-->
<!--          {{ element.name }}-->
<!--        </v-list-item>-->
<!--      </template>-->
<!--    </Draggable>-->
  </v-list>
</template>

<style scoped lang="scss">

</style>