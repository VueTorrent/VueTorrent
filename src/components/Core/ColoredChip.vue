<script setup lang="ts">
import { TinyColor } from '@ctrl/tinycolor'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { useI18nUtils } from '@/composables'
import { ThemeMode } from '@/constants/vuetorrent'
import { getColorFromName } from '@/helpers'
import { useVueTorrentStore } from '@/stores'

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

const { t } = useI18nUtils()
const { current } = useTheme()
const vueTorrentStore = useVueTorrentStore()
const { enableHashColors, hideColoredChip } = storeToRefs(vueTorrentStore)

function getThemeColor(color: string) {
  return current.value.colors[color] ?? color
}

function transformColor(color: TinyColor) {
  if (isDarkOledTheme.value) return color.darken(30)
  else return color
}

const isDarkOledTheme = computed(() => vueTorrentStore.theme.mode === ThemeMode.DARK && vueTorrentStore.theme.dark === 'dark-oled')
const chipColor = computed(() => (props.disabled || !enableHashColors.value ? props.defaultColor : getColorFromName(props.value, transformColor)))
const rawChipColor = computed(() => (props.disabled || !enableHashColors.value ? getThemeColor(props.defaultColor) : getColorFromName(props.value, transformColor)))
const chipValue = computed(() => (props.disabled ? props.disabledValue || props.value || t('common.none') : props.value))
const shouldShowColoredChips = computed(() => !hideColoredChip.value)
</script>

<template>
  <v-chip v-if="shouldShowColoredChips" :color="chipColor" variant="flat">
    {{ chipValue }}
  </v-chip>
  <div v-else class="text-no-wrap" :style="`color: ${rawChipColor}`">
    {{ chipValue }}
  </div>
</template>
