<script setup lang="ts">
import { RightClickMenuEntryType, isClassicEntry, isSpecialEntry } from '@/types/vuetorrent'

const props = defineProps<RightClickMenuEntryType>()

const onClick = () => {
  if (isClassicEntry(props) && props.action) {
    props.action()
  }
}
</script>

<template>
  <v-list-item v-if="isClassicEntry(props) && !props.hidden" class="px-3" :disabled="props.disabled" @click="onClick">
    <div class="d-flex">
      <v-icon class="mr-2" v-if="props.disabled && props.disabledIcon">{{ props.disabledIcon }}</v-icon>
      <v-icon class="mr-2" v-else-if="props.icon">{{ props.icon }}</v-icon>
      <span v-if="props.disabled && props.disabledText">{{ props.disabledText }}</span>
      <span v-else>{{ props.text }}</span>
      <v-spacer />
      <v-icon v-if="!props.disabled && props.children">mdi-chevron-right</v-icon>
    </div>
    <v-menu v-if="props.children" activator="parent" open-on-hover open-on-click close-delay="10" open-delay="0" location="right">
      <v-list>
        <RightClickMenuEntry v-for="child in props.children" v-bind="child" />
      </v-list>
    </v-menu>
  </v-list-item>
  <template v-if="isSpecialEntry(props)">
    <v-divider v-if="props.type === 'divider'" />
  </template>
</template>
