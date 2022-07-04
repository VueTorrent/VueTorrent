<template>
  <v-card flat>
    <v-tabs v-model="tab">
      <v-tab href="#general">
        {{ $t('modals.settings.pageRss.tabName.general') }}
      </v-tab>
      <v-tab href="#feeds">
        {{ $t('modals.settings.pageRss.tabName.feeds') }}
      </v-tab>
      <v-tab href="#rules">
        {{ $t('modals.settings.pageRss.tabName.rules') }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" touchless>
      <v-tab-item eager value="general">
        <General />
      </v-tab-item>
      <v-tab-item eager value="feeds">
        <Feeds />
      </v-tab-item>
      <v-tab-item eager value="rules">
        <Rules />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import General from './Rss/General'
import Feeds from './Rss/Feeds'
import Rules from './Rss/Rules'
import { FullScreenModal } from '@/mixins'

export default {
  name: 'VueTorrent',
  components: {
    General, Feeds, Rules
  },
  mixins: [FullScreenModal],
  data: () => ({
    tab: null
  })
}
</script>
