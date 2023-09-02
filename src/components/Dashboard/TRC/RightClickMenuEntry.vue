<script setup lang="ts">
import { TRCMenuEntry } from '@/types/VueTorrent'

defineProps<{
  text: string
  icon?: string
  action?: () => void
  hidden?: boolean
  disabled?: boolean
  disabledText?: string
  disabledIcon?: string
  divider?: boolean
  children?: TRCMenuEntry[]
}>()
</script>

<template>
  <v-list-item class="px-3" :disabled="disabled" v-if="!hidden">
    <div class="d-flex">
      <v-icon class="mr-2" v-if="disabled && disabledIcon">{{ disabledIcon }}</v-icon>
      <v-icon class="mr-2" v-else>{{ icon }}</v-icon>
      <span v-if="disabled && disabledText">{{ disabledText }}</span>
      <span v-else>{{ text }}</span>
      <v-spacer />
      <v-icon v-if="children">mdi-chevron-right</v-icon>
    </div>
    <v-menu v-if="children"
            activator="parent"
            :open-on-hover="true"
            close-delay="0"
            open-delay="0"
            location="right">
      <v-list>
        <RightClickMenuEntry v-for="child in children" v-bind="child" />
      </v-list>
    </v-menu>
  </v-list-item>
</template>

<style scoped>

</style>