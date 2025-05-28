<script setup lang="ts">
import { isMac } from '@/helpers'
import { RightClickMenuEntryType } from '@/types/vuetorrent'
import { useKeyModifier } from '@vueuse/core'

const props = defineProps<{
  entryData: RightClickMenuEntryType
}>()

const isCtrlPressed = useKeyModifier(isMac ? 'Meta' : 'Control', { initial: false })

const onClick = () => {
  if (props.entryData.action) {
    props.entryData.action()
  }
}
</script>

<template>
  <v-list-item v-if="!entryData.hidden" class="px-3" :disabled="entryData.disabled" @click="onClick">
    <div class="d-flex">
      <v-icon class="mr-2" v-if="entryData.disabled && entryData.disabledIcon">{{ entryData.disabledIcon }}</v-icon>
      <v-icon class="mr-2" v-else-if="entryData.icon">{{ entryData.icon }}</v-icon>
      <span v-if="entryData.disabled && entryData.disabledText">{{ entryData.disabledText }}</span>
      <span v-else>{{ entryData.text }}</span>
      <v-spacer />
      <v-icon v-if="!entryData.disabled && entryData.children">mdi-chevron-right</v-icon>
    </div>
    <v-menu v-if="entryData.children" activator="parent" open-on-hover open-on-click :close-on-content-click="!isCtrlPressed" close-delay="10" open-delay="0" location="right">
      <v-list>
        <template v-if="entryData.slots?.top">
          <RightClickMenuEntry v-for="slotData in entryData.slots.top" :entryData="slotData" />
          <v-divider thickness="3" />
        </template>

        <v-virtual-scroll :items="entryData.children" item-height="48" renderless>
          <template #default="{ item }">
            <RightClickMenuEntry :entryData="item" />
          </template>
        </v-virtual-scroll>

        <template v-if="entryData.slots?.bottom">
          <v-divider thickness="3" />
          <RightClickMenuEntry v-for="slotData in entryData.slots.bottom" :entryData="slotData" />
        </template>
      </v-list>
    </v-menu>
  </v-list-item>
</template>
