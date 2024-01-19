<script setup lang="ts">
import { TRCMenuEntry } from '@/types/vuetorrent'

const props = defineProps<{
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

const onClick = () => {
  if (props.action) {
    props.action()
  }
}
</script>

<template>
  <v-list-item class="px-3" :disabled="disabled" v-if="!hidden" @click="onClick">
    <div class="d-flex">
      <v-icon class="mr-2" v-if="disabled && disabledIcon">{{ disabledIcon }}</v-icon>
      <v-icon class="mr-2" v-else-if="icon">{{ icon }}</v-icon>
      <span v-if="disabled && disabledText">{{ disabledText }}</span>
      <span v-else>{{ text }}</span>
      <v-spacer />
      <v-icon v-if="!disabled && children">mdi-chevron-right</v-icon>
    </div>
    <v-menu v-if="children" activator="parent" open-on-hover open-on-click close-delay="10" open-delay="0" location="right">
      <v-list>
        <RightClickMenuEntry v-for="child in children" v-bind="child" />
      </v-list>
    </v-menu>
  </v-list-item>
</template>

<style scoped></style>
