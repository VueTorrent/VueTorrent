<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.pageRss.pageGeneral.rssAutoProcessing') }}</v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.rss_processing_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.pageRss.pageGeneral.input.enableRssProcessing')"
      />
    </v-list-item>
    <v-subheader>{{ $t('modals.settings.pageRss.pageGeneral.rssAutoDownloader') }}</v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.rss_auto_downloading_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.pageRss.pageGeneral.input.enableRssAutoDownload')"
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
