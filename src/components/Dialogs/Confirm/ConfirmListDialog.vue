<script setup lang="ts">
import { useDialog, useI18nUtils } from '@/composables'

const props = defineProps<{
  guid: string
  title: string

  items?: string[]

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

      <v-card-text>
        <div class="d-flex flex-wrap flex-gap-small">
          <span class="pa-1 border wrap-anywhere" v-for="item in items">{{ item }}</span>
        </div>

        <slot />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn :color="noColor" @click="onCancel">{{ noText ?? t('common.no') }}</v-btn>
        <v-btn :color="yesColor" @click="onConfirm">{{ yesText ?? t('common.yes') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
