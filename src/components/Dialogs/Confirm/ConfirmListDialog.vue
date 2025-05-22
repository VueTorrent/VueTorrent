<script setup lang="ts">
import ConfirmDialog from './ConfirmDialog.vue'

defineProps<{
  guid: string
  title: string

  items?: string[]

  noColor?: string
  noText?: string

  yesColor?: string
  yesText?: string
}>()
</script>

<template>
  <ConfirmDialog :guid="guid" :title="title"
                 :noColor="noColor" :noText="noText"
                 :yesColor="yesColor" :yesText="yesText"
                 @cancel="$emit('cancel')" @confirm="$emit('confirm')">
    <div class="d-flex flex-wrap flex-gap-small">
      <span class="pa-1 border wrap-anywhere" v-for="item in items">{{ item }}</span>
    </div>

    <slot />
  </ConfirmDialog>
</template>
