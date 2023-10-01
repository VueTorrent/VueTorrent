<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.rss.general.reader.subheader') }}</v-subheader>

    <v-list-item>
      <v-checkbox v-model="settings.rss_processing_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.rss.general.reader.enableProcessing')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.rss_refresh_interval"
        type="number"
        dense
        outlined
        :hint="$t('modals.settings.rss.general.reader.feedsRefreshIntervalHint')"
        :label="$t('modals.settings.rss.general.reader.feedsRefreshInterval')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.rss_max_articles_per_feed"
        class="mb-3"
        type="number"
        dense
        hide-details
        outlined
        :label="$t('modals.settings.rss.general.reader.maximumArticlesPerFeed')"
      />
    </v-list-item>

    <v-divider />
    <v-subheader>{{ $t('modals.settings.rss.general.autoDownloader.subheader') }}</v-subheader>

    <v-list-item>
      <v-checkbox v-model="settings.rss_auto_downloading_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.rss.general.autoDownloader.enable')" />
    </v-list-item>

    <v-divider />
    <v-subheader>{{ $t('modals.settings.rss.general.smartEpisodeFilter.subheader') }}</v-subheader>

    <v-list-item>
      <v-checkbox
        v-model="settings.rss_download_repack_proper_episodes"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.rss.general.smartEpisodeFilter.downloadEpisodes')"
      />
    </v-list-item>

    <v-list-item>
      <v-textarea
        v-model="settings.rss_smart_episode_filters"
        outlined
        auto-grow
        clearable
        persistent-hint
        :hint="$t('modals.settings.rss.general.smartEpisodeFilter.filtersHint')"
        :label="$t('modals.settings.rss.general.smartEpisodeFilter.filters')"
      />
    </v-list-item>
  </v-card>
</template>
<script>
import { FullScreenModal, SettingsTab } from '@/mixins'

export default {
  name: 'RssGeneral',
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
  @import '../../../../styles/styles';
  @include reverse-switch;
}
</style>
