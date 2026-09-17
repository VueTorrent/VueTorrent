<script setup lang="ts">
import { computed } from 'vue'
import { useNumberFormatter } from '@/composables'
import { Torrent } from '@/types/vuetorrent'

const props = defineProps<{ torrent: Torrent; titleKey: string; value: (t: Torrent) => number }>()

const { formatDataUnit, formatDataValue } = useNumberFormatter()
const val = computed(() => props.value(props.torrent))
</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="titleKey" class="text-caption text-grey">
      {{ $t(titleKey) }}
    </div>
    <div>
      {{ formatDataValue({ data: val }) }}
      <span class="text-caption text-grey">
        {{ formatDataUnit({ data: val }) }}
      </span>
    </div>
  </div>
</template>
