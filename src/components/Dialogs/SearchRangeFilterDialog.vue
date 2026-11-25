<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useI18nUtils } from '@/composables'

defineProps<{
  title: string
  format?: (value: number) => string
}>()

const min = defineModel<number>('min', { required: true })
const max = defineModel<number>('max', { required: true })
const isOpened = defineModel<boolean>('isOpened')

const { t } = useI18nUtils()

const localMin = ref(min.value)
const localMax = ref(max.value)

watch(isOpened, opened => {
  if (opened) {
    localMin.value = min.value
    localMax.value = max.value
  }
})

function localField(target: Ref<number>, sibling: Ref<number>, isMin: boolean) {
  return computed<number, string>({
    get: () => target.value,
    set: raw => {
      const parsed = Number(raw)
      const value = Number.isNaN(parsed) ? 0 : Math.max(parsed, 0)
      target.value = value
      if (isMin ? value > sibling.value : value < sibling.value) {
        sibling.value = value
      }
    },
  })
}

const minField = localField(localMin, localMax, true)
const maxField = localField(localMax, localMin, false)

function cancel() {
  isOpened.value = false
}

function confirm() {
  min.value = localMin.value
  max.value = localMax.value
  isOpened.value = false
}
</script>

<template>
  <v-dialog v-model="isOpened" max-width="450">
    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="cancel" />
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col cols="4">{{ t('searchEngine.filters.rangeFilters.min') }}</v-col>
          <v-col cols="8">
            <v-text-field v-model="minField" density="compact" hide-details hide-spin-buttons single-line type="number" variant="outlined" />
            <div v-if="format" class="text-caption text-medium-emphasis mt-1">{{ format(localMin) }}</div>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="4">{{ t('searchEngine.filters.rangeFilters.max') }}</v-col>
          <v-col cols="8">
            <v-text-field v-model="maxField" density="compact" hide-details hide-spin-buttons single-line type="number" variant="outlined" />
            <div v-if="format" class="text-caption text-medium-emphasis mt-1">{{ format(localMax) }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="cancel">{{ t('common.cancel') }}</v-btn>
        <v-btn color="accent" @click="confirm">{{ t('common.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
