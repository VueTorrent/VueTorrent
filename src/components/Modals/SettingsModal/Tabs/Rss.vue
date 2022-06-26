<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.pageRss.rssAutoDownloader') }}</v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.rss_processing_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.pageRss.input.enableRSS')"
      />
    </v-list-item>
  </v-card>
</template>
<script>
import { FullScreenModal, SettingsTab } from '@/mixins'

export default {
  name: 'Rss',
  mixins: [SettingsTab, FullScreenModal]
}
</script>
