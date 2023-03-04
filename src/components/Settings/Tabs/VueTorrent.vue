<template>
  <v-card flat>
    <v-tabs v-model="tab">
      <v-tab href="#general">
        {{ $t('modals.settings.pageVueTorrent.tabName.general') }}
      </v-tab>
      <v-tab href="#desktopCard">
        {{ $t('modals.settings.pageVueTorrent.tabName.desktopCard') }}
      </v-tab>
      <v-tab href="#mobileCard">
        {{ $t('modals.settings.pageVueTorrent.tabName.mobileCard') }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" touchless>
      <v-tab-item eager value="general">
        <VGeneral />
      </v-tab-item>
      <v-tab-item eager value="desktopCard">
        <VDesktopCard />
      </v-tab-item>
      <v-tab-item eager value="mobileCard">
        <VMobileCard />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import VGeneral from './VueTorrent/VGeneral.vue'
import VDesktopCard from './VueTorrent/VDesktopCard.vue'
import VMobileCard from './VueTorrent/VMobileCard.vue'
import { FullScreenModal } from '@/mixins'

export default {
  name: 'VueTorrent',
  components: {
    VGeneral,
    VDesktopCard,
    VMobileCard
  },
  mixins: [FullScreenModal],
  data: () => ({
    tab: null
  })
}
</script>
