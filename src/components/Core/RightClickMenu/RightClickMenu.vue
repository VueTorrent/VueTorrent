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
      <RightClickMenuEntry v-for="entry in menuData" v-bind="entry" />
    </v-list>
  </v-menu>
</template>

<style lang="scss"></style>
