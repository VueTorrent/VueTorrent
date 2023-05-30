<script setup lang="ts">
import type { Torrent } from '@/models'
import { getDataUnit, getDataValue } from '@/utils/dataParse'
import { titleCase } from '@/utils/textFormatting'

defineProps<{
  torrent: Torrent
}>()
</script>

<template>
  <v-col cols="6" sm="2">
    <div class="text-caption text-grey">
      {{ titleCase($t('torrent.properties.amount_left')) }}
    </div>
    <div>
      {{ getDataValue(torrent.amount_left, 2) }}
      <span class="text-caption text-grey">
        {{ getDataUnit(torrent.amount_left) }}
      </span>
    </div>
  </v-col>
</template>
