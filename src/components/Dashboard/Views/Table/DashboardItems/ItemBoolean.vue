<script setup lang="ts">
import { Torrent } from '@/types/vuetorrent'

defineProps<{ torrent: Torrent; value: (t: Torrent) => boolean }>()
</script>

<template>
  <td class="text-no-wrap">
    <v-icon v-if="value(torrent)" color="accent"> mdi-check </v-icon>
    <v-icon v-else color="error"> mdi-close </v-icon>
  </td>
</template>
