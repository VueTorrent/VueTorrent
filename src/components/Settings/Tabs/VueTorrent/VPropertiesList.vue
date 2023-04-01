<template>
  <v-list flat class="ma-2 pa-0">
    <draggable v-if="isDraggable" :list="properties" tag="tbody">
      <VDashboardItem :isDraggable="isDraggable" :property="item" v-for="(item, index) in properties" :key="index" />
    </draggable>

    <VDashboardItem v-else :isDraggable="isDraggable" :property="item" v-for="(item, index) in properties" :key="index" />
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'
import { TorrentProperty } from '@/types/vuetorrent'
import VDashboardItem from './VDashboardItem.vue'

export default defineComponent({
  name: 'VPropertiesList',
  components: { VDashboardItem, draggable },
  props: { isDraggable: Boolean, properties: Array<TorrentProperty> }
})
</script>
