<script setup lang="ts">
import TorrentRightClickMenu from '@/components/Torrent/TorrentRightClickMenu.vue'

definePage({
  path: '/dashboard',
  name: 'Dashboard'
})
</script>

<template>
  <TorrentRightClickMenu :hash="'123123'" :touchmode="false" :x="123" />
</template>
