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

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <ConfirmDialog :guid="guid" :title="title" :no-color="noColor" :no-text="noText" :yes-color="yesColor" :yes-text="yesText" @cancel="$emit('cancel')" @confirm="$emit('confirm')">
    <div class="d-flex flex-wrap flex-gap-small">
      <span v-for="item in items" :key="item" class="pa-1 border wrap-anywhere">{{ item }}</span>
    </div>

    <slot />
  </ConfirmDialog>
</template>
