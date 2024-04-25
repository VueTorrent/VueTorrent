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
const { enableHashColors } = storeToRefs(useVueTorrentStore())

const chipColor = computed(() => (props.disabled || !enableHashColors.value ? props.defaultColor : getColorFromName(props.value)))
const chipValue = computed(() => (props.disabled ? props.disabledValue || t('common.none') : props.value))
</script>

<template>
  <v-chip :color="chipColor" variant="flat">
    {{ chipValue }}
  </v-chip>
</template>
