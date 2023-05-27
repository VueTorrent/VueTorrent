<script setup lang="ts">
import type { Torrent } from '@/models'
import MobileCard from './MobileCard.vue'
import DesktopCard from './DesktopCard.vue'
import { useDisplay } from 'vuetify'

defineProps<{
  torrent: Torrent
}>()

// composables
const { mobile } = useDisplay()
</script>

<template>
  <VCard class="pointer">
    <VLayout>
      <MobileCard v-if="mobile" :torrent="torrent" />
      <DesktopCard v-else :torrent="torrent" />
    </VLayout>
  </VCard>
</template>
