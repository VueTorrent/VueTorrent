<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useVueTorrentStore } from '@/stores'
import { computed } from 'vue'
import { getColorFromName } from '@/helpers'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    defaultColor: string
    disabled?: boolean
    disabledValue?: string
    value: string
  }>(),
  {
    disabled: false
  }
)

const { t } = useI18n()
const { enableHashColors, hideColoredChip } = storeToRefs(useVueTorrentStore())

const chipColor = computed(() => (props.disabled || !enableHashColors.value ? props.defaultColor : getColorFromName(props.value)))
const chipValue = computed(() => (props.disabled ? props.disabledValue || t('common.none') : props.value))
const shouldShowColoredChips = computed(() => !hideColoredChip.value)
</script>

<template>
  <v-chip :color="chipColor" :variant="shouldShowColoredChips ? 'flat' : 'text'">
    {{ chipValue }}
  </v-chip>
</template>
