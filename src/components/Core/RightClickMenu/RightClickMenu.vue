<script setup lang="ts">
import { isMac } from '@/helpers'
import RightClickMenuEntry from './RightClickMenuEntry.vue'
import { useKeyModifier } from '@vueuse/core'
import { RightClickMenuEntryType } from '@/types/vuetorrent'

defineProps<{
  menuData: RightClickMenuEntryType[]
}>()

const rightClickMenuVisible = defineModel<boolean>({ required: true })

const isCtrlPressed = useKeyModifier(isMac ? 'Meta' : 'Control', { initial: false })
</script>

<template>
  <v-menu
    v-if="rightClickMenuVisible"
    v-model="rightClickMenuVisible"
    activator="parent"
    :close-on-content-click="!isCtrlPressed"
    transition="slide-y-transition"
    scroll-strategy="none">
    <v-list>
      <slot name="top" />
      <v-divider v-if="$slots.top" thickness="3" />

      <v-virtual-scroll :items="menuData" item-height="48" renderless>
        <template #default="{ item }">
          <RightClickMenuEntry :entryData="item" />
        </template>
      </v-virtual-scroll>

      <v-divider v-if="$slots.bottom" thickness="3" />
      <slot name="bottom" />
    </v-list>
  </v-menu>
</template>
