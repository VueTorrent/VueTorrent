<template>
  <v-card flat>
    <v-subheader>
      {{ $t("modals.settings.pageRss.pageGeneral.rssAutoProcessing") }}
    </v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.rss_processing_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.pageRss.pageGeneral.input.enableRssProcessing')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.rss_refresh_interval"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.pageRss.pageGeneral.input.feedsRefreshInterval') "
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.rss_max_articles_per_feed"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.pageRss.pageGeneral.input.feedsMaxArticles') "
      />
    </v-list-item>
    <v-divider />
    <v-subheader>
      {{ $t("modals.settings.pageRss.pageGeneral.rssAutoDownloader") }}
    </v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.rss_auto_downloading_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="
          $t(
            'modals.settings.pageRss.pageGeneral.input.enableRssAutoDownload'
          )
        "
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

<style lang="scss" scoped>
:deep(.v-select .v-select__selection) {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
// Reversed input variant
:deep(.v-input--reverse .v-input__slot) {
  @import "src/styles/styles.scss";
  @include reverse-switch;
}
</style>
