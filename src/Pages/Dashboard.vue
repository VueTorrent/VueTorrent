<script setup lang="ts">
import { useMainData } from '@/composables/api/info'
import { definePage } from 'vue-router/auto'
import { computed } from 'vue'
import type { Torrent } from '@/models'
import { isProduction } from '@/utils'
import { generateMultiple } from '@/utils/faker/faker'
import MobileCardVue from '@/components/Torrent/MobileCard.vue'

definePage({
  path: '/dashboard',
  name: 'Dashboard'
})

const mainData = useMainData()

const torrents = computed(() => {
  const torrents: Torrent[] = []

  // const ts = mainData.data.value?.torrents
  // for (let t in ts) {
  //   let data = ts[t]
  //   console.log(data)
  //   // torrents.push(new Torrent({ ...data }))
  // }

  if (isProduction()) return torrents
  if (import.meta.env.VITE_USE_FAKE_TORRENTS === false) return torrents
  const count = import.meta.env.VITE_FAKE_TORRENT_COUNT
  torrents.push(...generateMultiple(count))

  return torrents
})
</script>

<template>
  <div v-if="torrents.length === 0" class="mt-5 text-xs-center">
    <p class="grey--text">{{ $t('dashboard.emptyTorrentList') }}</p>
  </div>
  <div v-else>
    <VList class="pa-0 transparent">
      <VListItem class="px-0" v-for="torrent in torrents" :key="torrent.hash">
        <VCard :class="'sideborder ' + torrent.state">
          <MobileCardVue :torrent="torrent" />
        </VCard>
      </VListItem>
    </VList>
  </div>
</template>
