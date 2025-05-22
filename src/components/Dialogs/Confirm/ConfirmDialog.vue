<script setup lang="ts">
import { useDialog, useI18nUtils } from '@/composables'
import { onBeforeMount, onUnmounted } from 'vue'

const props = defineProps<{
  guid: string
  title: string

  text?: string

  noColor?: string
  noText?: string

  yesColor?: string
  yesText?: string
}>()

const emit = defineEmits(['confirm', 'cancel'])

const { t } = useI18nUtils()
const { isOpened } = useDialog(props.guid)

const close = () => {
  isOpened.value = false
}

function onCancel() {
  close()
  emit('cancel')
}

function onConfirm() {
  close()
  emit('confirm')
}

function handleKeyboardShortcuts(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    onConfirm()
  } else if (e.key === 'Escape') {
    e.preventDefault()
    e.stopPropagation()
    onCancel()
  }
}

onBeforeMount(() => {
  document.addEventListener('keydown', handleKeyboardShortcuts)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboardShortcuts)
})
</script>

<template>
  <v-dialog v-model="isOpened" width="auto" max-width="1000">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>

      <v-card-text v-if="$slots.default">
        <slot />
      </v-card-text>
      <v-card-text v-else-if="text" class="text-pre">
        {{ text }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn :color="noColor" @click="onCancel">{{ noText ?? t('common.no') }}</v-btn>
        <v-btn :color="yesColor" @click="onConfirm">{{ yesText ?? t('common.yes') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
