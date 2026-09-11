<script setup lang="ts">
import { computed } from 'vue'
import { useNumberFormatter } from '@/composables'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent; titleKey: string; value: (t: Torrent) => number }>()

const { formatSpeedUnit, formatSpeedValue } = useNumberFormatter()

const val = computed(() => props.value(props.torrent))
</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <div>
      {{ formatSpeedValue({ speed: val }) }}
      <span class="text-caption text-grey">
        {{ formatSpeedUnit({ speed: val }) }}
      </span>
    </div>
  </div>
</template>
