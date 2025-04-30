<script setup lang="ts">
import { useDialog, useI18nUtils } from '@/composables'

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
</script>

<template>
  <v-dialog v-model="isOpened" width="auto" max-width="1000">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>

      <v-card-text v-if="$slots.default">
        <slot />
      </v-card-text>
      <v-card-text v-else-if="text">
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
