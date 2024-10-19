<script setup lang="ts">
import RightClickMenuEntry from './RightClickMenuEntry.vue'
import { RightClickMenuEntryType } from '@/types/vuetorrent'

defineProps<{
  menuData: RightClickMenuEntryType[]
}>()

const rightClickMenuVisible = defineModel<boolean>({ required: true })
</script>

<template>
  <v-menu v-if="rightClickMenuVisible" v-model="rightClickMenuVisible" activator="parent" :close-on-content-click="true" transition="slide-y-transition" scroll-strategy="none">
    <v-list>
      <slot name="top" />
      <v-divider v-if="$slots.top" thickness="3" />
      <v-virtual-scroll :items="menuData" item-height="48" renderless>
        <template #default="{ item }">
          <RightClickMenuEntry :entryData="item" />
        </template>
      </v-virtual-scroll>
    </v-list>
  </v-menu>
</template>
