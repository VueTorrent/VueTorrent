<script setup lang="ts">

import { usePreferenceStore, useVueTorrentStore } from '@/stores'

const preferenceStore = usePreferenceStore()
const vuetorrentStore = useVueTorrentStore()
</script>

<template>
  <v-list>
    <v-list-subheader>{{ $t('settings.rss.general.reader.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.rss_processing_enabled" hide-details
                  :label="$t('settings.rss.general.reader.enableProcessing')" />

      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="preferenceStore.preferences!.rss_refresh_interval"
            type="number"
            hide-details
            :suffix="$t('units.minutes')"
            :label="$t('settings.rss.general.reader.feedsRefreshInterval')" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="preferenceStore.preferences!.rss_max_articles_per_feed" type="number"
                        :label="$t('settings.rss.general.reader.maximumArticlesPerFeed')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider />
    <v-list-subheader>{{ $t('settings.rss.general.autoDownloader.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.rss_auto_downloading_enabled" hide-details class="ma-0 pa-0"
                  :label="$t('settings.rss.general.autoDownloader.enable')" />
    </v-list-item>

    <v-divider />
    <v-list-subheader>{{ $t('settings.rss.general.smartEpisodeFilter.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-checkbox
        v-model="preferenceStore.preferences!.rss_download_repack_proper_episodes"
        hide-details
        class="ma-0 pa-0"
        :label="$t('settings.rss.general.smartEpisodeFilter.downloadEpisodes')" />
      <v-textarea
        v-model="preferenceStore.preferences!.rss_smart_episode_filters"
        outlined
        auto-grow
        clearable
        persistent-hint
        :hint="$t('settings.rss.general.smartEpisodeFilter.filtersHint')"
        :label="$t('settings.rss.general.smartEpisodeFilter.filters')" />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="vuetorrentStore.useIdForRssLinks"
                  hide-details
                  :label="$t('settings.rss.general.useIdForRssLinks')" />
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss"></style>
