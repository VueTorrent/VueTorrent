<script setup lang="ts">
import { useAppStore, usePreferenceStore, useVueTorrentStore } from '@/stores'

const appStore = useAppStore()
const preferenceStore = usePreferenceStore()
const vuetorrentStore = useVueTorrentStore()
</script>

<template>
  <v-list>
    <v-list-subheader>{{ $t('settings.rss.reader.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" class="py-0">
          <v-checkbox v-model="preferenceStore.preferences!.rss_processing_enabled" hide-details :label="$t('settings.rss.reader.enableProcessing')" />
        </v-col>
        <v-col cols="12" sm="6" md="4" class="py-0">
          <v-text-field
            v-model.number="preferenceStore.preferences!.rss_refresh_interval"
            type="number"
            hide-details
            :suffix="$t('units.minutes', preferenceStore.preferences!.rss_refresh_interval)"
            :label="$t('settings.rss.reader.feedsRefreshInterval')" />
        </v-col>
        <v-col cols="12" sm="6" md="4" class="py-0">
          <v-text-field v-model.number="preferenceStore.preferences!.rss_max_articles_per_feed" type="number" :label="$t('settings.rss.reader.maximumArticlesPerFeed')" />
        </v-col>

        <v-col v-if="appStore.usesQbit5" cols="12" md="4" class="pt-0">
          <v-text-field
            v-model.number="preferenceStore.preferences!.rss_fetch_delay"
            type="number"
            hide-details
            :suffix="$t('units.seconds', preferenceStore.preferences!.rss_fetch_delay!)"
            :label="$t('settings.rss.reader.sameHostRequestDelay')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mt-3" />
    <v-list-subheader>{{ $t('settings.rss.autoDownloader.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.rss_auto_downloading_enabled" hide-details class="ma-0 pa-0" :label="$t('settings.rss.autoDownloader.enable')" />
    </v-list-item>

    <v-divider />
    <v-list-subheader>{{ $t('settings.rss.smartEpisodeFilter.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-checkbox
        v-model="preferenceStore.preferences!.rss_download_repack_proper_episodes"
        hide-details
        class="ma-0 pa-0"
        :label="$t('settings.rss.smartEpisodeFilter.downloadEpisodes')" />
      <v-textarea
        v-model="preferenceStore.preferences!.rss_smart_episode_filters"
        outlined
        auto-grow
        clearable
        persistent-hint
        :hint="$t('settings.rss.smartEpisodeFilter.filtersHint')"
        :label="$t('settings.rss.smartEpisodeFilter.filters')" />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="vuetorrentStore.useIdForRssLinks" hide-details :label="$t('settings.rss.useIdForRssLinks')" />
    </v-list-item>
  </v-list>
</template>
