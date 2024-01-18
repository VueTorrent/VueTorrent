<script setup lang="ts">
import RightClickMenuEntry from './RightClickMenuEntry.vue'
import { TRCMenuEntry } from '@/types/vuetorrent'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  menuData: TRCMenuEntry[]
}>()
const emit = defineEmits(['update:modelValue'])

const trcVisible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>

<template>
  <v-menu v-if="trcVisible" v-model="trcVisible" activator="parent" :close-on-content-click="true"
          transition="slide-y-transition" scroll-strategy="none">
    <v-list>
      <slot name="top" />
      <RightClickMenuEntry v-for="entry in menuData" v-bind="entry" />
    </v-list>
  </v-menu>
</template>

<style lang="scss">
</style>
