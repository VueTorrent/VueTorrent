<script setup lang="ts">
import type { Torrent } from '@/models'

defineProps<{
  torrent: Torrent
}>()
</script>

<template>
  <v-col v-if="torrent.tags && torrent.tags.length" cols="6" sm="2">
    <div class="text-caption text-grey">
      {{ $t('torrent.properties.tags') }}
    </div>
    <v-row wrap class="ma-0">
      <v-chip
        v-for="tag in torrent.tags"
        :key="tag"
        small1
        class="tags text-white text-caption mb-1 mx-1"
      >
        {{ tag }}
      </v-chip>
    </v-row>
  </v-col>
</template>

<style scoped>
.tags {
  background-color: #048b9a !important;
}
</style>
