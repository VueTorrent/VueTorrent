<script setup lang="ts">
import { useKeyModifier } from '@vueuse/core'
import { computed } from 'vue'
import { isMac } from '@/helpers'
import { RightClickMenuEntryType } from '@/types/vuetorrent'

const props = defineProps<{
  entryData: RightClickMenuEntryType
}>()

const isCtrlPressed = useKeyModifier(isMac ? 'Meta' : 'Control', { initial: false })
const isTouchDevice = computed(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0)

function onClick() {
  props.entryData.action?.()
}
</script>

<template>
  <v-list-item v-if="!entryData.hidden" class="px-3" :disabled="entryData.disabled" @click="onClick">
    <div class="d-flex">
      <v-icon v-if="entryData.disabled && entryData.disabledIcon" class="mr-2">
        {{ entryData.disabledIcon }}
      </v-icon>
      <v-icon v-else-if="entryData.icon" class="mr-2">
        {{ entryData.icon }}
      </v-icon>
      <span v-if="entryData.disabled && entryData.disabledText">{{ entryData.disabledText }}</span>
      <span v-else>{{ entryData.text }}</span>
      <v-spacer />
      <v-icon v-if="!entryData.disabled && entryData.children"> mdi-chevron-right </v-icon>
    </div>
    <v-menu 
      v-if="entryData.children" 
      activator="parent" 
      :open-on-hover="!isTouchDevice" 
      open-on-click 
      :close-on-content-click="!isCtrlPressed" 
      close-delay="10" 
      open-delay="0" 
      location="right">
      <v-list>
        <template v-if="entryData.slots?.top">
          <RightClickMenuEntry v-for="(slotData, i) in entryData.slots.top" :key="i" :entry-data="slotData" />
          <v-divider thickness="3" />
        </template>

        <v-virtual-scroll :items="entryData.children" item-height="48" renderless>
          <template #default="{ item }">
            <RightClickMenuEntry :entry-data="item" />
          </template>
        </v-virtual-scroll>

        <template v-if="entryData.slots?.bottom">
          <v-divider thickness="3" />
          <RightClickMenuEntry v-for="(slotData, i) in entryData.slots.bottom" :key="i" :entry-data="slotData" />
        </template>
      </v-list>
    </v-menu>
  </v-list-item>
</template>
