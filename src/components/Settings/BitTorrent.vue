<script setup lang="ts">
import { Encryption, ShareLimitAction } from '@/constants/qbit/AppPreferences'
import { usePreferenceStore } from '@/stores'
import { computed, ref } from 'vue'
import { useI18nUtils } from '@/composables'
import { useAppStore } from '@/stores'

const { t } = useI18nUtils()
const preferenceStore = usePreferenceStore()
const appStore = useAppStore()

const encyptionModeOptions = ref([
  { title: t('constants.encryption.preferEncryption'), value: Encryption.PREFER_ENCRYPTION },
  { title: t('constants.encryption.forceOn'), value: Encryption.FORCE_ON },
  { title: t('constants.encryption.forceOff'), value: Encryption.FORCE_OFF }
])
const thenTypes = ref([
  { title: t('constants.shareLimitAction.stopTorrent'), value: ShareLimitAction.STOP_TORRENT },
  { title: t('constants.shareLimitAction.removeTorrent'), value: ShareLimitAction.REMOVE_TORRENT },
  { title: t('constants.shareLimitAction.removeTorrentAndFiles'), value: ShareLimitAction.REMOVE_TORRENT_AND_FILES },
  { title: t('constants.shareLimitAction.torrentSuperseeding'), value: ShareLimitAction.ENABLE_SUPERSEEDING }
])

const trackerUrlListItems = computed<string[]>(() => {
  if (preferenceStore.preferences?.add_trackers_url_list) {
    return preferenceStore.preferences.add_trackers_url_list
      .split('\n')
      .map(tracker => tracker.trim())
      .filter(tracker => tracker !== '')
  }
  return []
})
</script>

<template>
  <v-list>
    <v-list-subheader>{{ t('settings.bittorrent.privacy.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.dht" hide-details :label="t('settings.bittorrent.privacy.enableDHT')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.pex" hide-details :label="t('settings.bittorrent.privacy.enablePeX')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.lsd" hide-details :label="t('settings.bittorrent.privacy.enableLPD')" />
    </v-list-item>

    <v-list-item>
      <v-select v-model="preferenceStore.preferences!.encryption" hide-details :items="encyptionModeOptions" :label="t('settings.bittorrent.privacy.encryptionMode')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.anonymous_mode" hide-details :label="t('settings.bittorrent.privacy.enableAnonymous')" />
      <a href="https://github.com/qbittorrent/qBittorrent/wiki/Anonymous-Mode" target="_blank">
        {{ t('settings.bittorrent.privacy.moreInfo') }}
      </a>
    </v-list-item>

    <v-divider />

    <v-list-item class="my-3">
      <v-text-field
        v-model.number="preferenceStore.preferences!.max_active_checking_torrents"
        type="number"
        hide-details
        :label="t('settings.bittorrent.maxActiveCheckingTorrents')" />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-row>
        <v-col cols="12" class="pb-0">
          <v-checkbox v-model="preferenceStore.preferences!.queueing_enabled" hide-details :label="t('settings.bittorrent.torrentQueueing.subheader')" />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model.number="preferenceStore.preferences!.max_active_downloads"
            :disabled="!preferenceStore.preferences!.queueing_enabled"
            type="number"
            hide-details
            :label="t('settings.bittorrent.torrentQueueing.maxActiveDownload')" />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model.number="preferenceStore.preferences!.max_active_uploads"
            :disabled="!preferenceStore.preferences!.queueing_enabled"
            type="number"
            hide-details
            :label="t('settings.bittorrent.torrentQueueing.maxActiveUpload')" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="preferenceStore.preferences!.max_active_torrents"
            :disabled="!preferenceStore.preferences!.queueing_enabled"
            type="number"
            hide-details
            :label="t('settings.bittorrent.torrentQueueing.maxActiveTorrent')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-checkbox
        v-model="preferenceStore.preferences!.dont_count_slow_torrents"
        :disabled="!preferenceStore.preferences!.queueing_enabled"
        hide-details
        :label="t('settings.bittorrent.torrentQueueing.excludeSlowTorrent')" />
    </v-list-item>

    <v-list-item>
      <v-row class="mb-2">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model.number="preferenceStore.preferences!.slow_torrent_dl_rate_threshold"
            :disabled="!preferenceStore.preferences!.queueing_enabled || !preferenceStore.preferences!.dont_count_slow_torrents"
            type="number"
            hide-details
            :label="t('settings.bittorrent.torrentQueueing.downloadRateLimit')"
            suffix="kiB/s" />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model.number="preferenceStore.preferences!.slow_torrent_ul_rate_threshold"
            :disabled="!preferenceStore.preferences!.queueing_enabled || !preferenceStore.preferences!.dont_count_slow_torrents"
            type="number"
            hide-details
            :label="t('settings.bittorrent.torrentQueueing.uploadRateLimit')"
            suffix="kiB/s" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="preferenceStore.preferences!.slow_torrent_inactive_timer"
            :disabled="!preferenceStore.preferences!.queueing_enabled || !preferenceStore.preferences!.dont_count_slow_torrents"
            type="number"
            hide-details
            :label="t('settings.bittorrent.torrentQueueing.torrentInactivityTimer')"
            :suffix="t('units.seconds', preferenceStore.preferences!.slow_torrent_inactive_timer)" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider />
    <v-list-subheader>{{ t('settings.bittorrent.seedLimits.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="6">
          <v-checkbox v-model="preferenceStore.preferences!.max_ratio_enabled" hide-details :label="t('settings.bittorrent.seedLimits.whenRatioReaches')" />
        </v-col>
        <v-col cols="6">
          <v-text-field v-model.number="preferenceStore.preferences!.max_ratio" :disabled="!preferenceStore.preferences!.max_ratio_enabled" type="number" hide-details />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="6">
          <v-checkbox v-model="preferenceStore.preferences!.max_seeding_time_enabled" hide-details :label="t('settings.bittorrent.seedLimits.whenSeedingTimeReaches')" />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model.number="preferenceStore.preferences!.max_seeding_time"
            :disabled="!preferenceStore.preferences!.max_seeding_time_enabled"
            type="number"
            hide-details
            :suffix="t('units.minutes', preferenceStore.preferences!.max_seeding_time)" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="6">
          <v-checkbox
            v-model="preferenceStore.preferences!.max_inactive_seeding_time_enabled"
            hide-details
            :label="t('settings.bittorrent.seedLimits.whenInactiveSeedingTimeReaches')" />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model.number="preferenceStore.preferences!.max_inactive_seeding_time"
            :disabled="!preferenceStore.preferences!.max_inactive_seeding_time_enabled"
            type="number"
            :suffix="t('units.minutes', preferenceStore.preferences!.max_inactive_seeding_time)" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col>
          <v-list-subheader>{{ t('settings.bittorrent.seedLimits.then') }}</v-list-subheader>
        </v-col>
        <v-col>
          <v-select
            v-model="preferenceStore.preferences!.max_ratio_act"
            :disabled="
              !preferenceStore.preferences!.max_ratio_enabled &&
              !preferenceStore.preferences!.max_seeding_time_enabled &&
              !preferenceStore.preferences!.max_inactive_seeding_time_enabled
            "
            hide-details
            :items="thenTypes" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mt-3" />

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.add_trackers_enabled" hide-details :label="t('settings.bittorrent.autoAddTrackers')" />
    </v-list-item>
    <v-list-item>
      <v-textarea
        v-model="preferenceStore.preferences!.add_trackers"
        :disabled="!preferenceStore.preferences!.add_trackers_enabled"
        auto-grow
        clearable
        persistent-hint
        :hint="t('settings.bittorrent.autoAddTrackersHint')" />
    </v-list-item>

    <template v-if="appStore.isFeatureAvailable('5.1.0')">
      <v-list-item>
        <v-checkbox v-model="preferenceStore.preferences!.add_trackers_from_url_enabled" hide-details :label="t('settings.bittorrent.autoAddTrackersFromUrl')" />
      </v-list-item>
      <v-list-item>
        <v-text-field v-model="preferenceStore.preferences!.add_trackers_url" :disabled="!preferenceStore.preferences!.add_trackers_from_url_enabled" />
      </v-list-item>
      <v-list-item v-if="preferenceStore.preferences!.add_trackers_from_url_enabled && trackerUrlListItems.length > 0" width="100%">
        <v-list-subheader>{{ t('settings.bittorrent.trackersFetchedFromUrl') }}</v-list-subheader>
        <v-card outlined>
          <v-virtual-scroll :items="trackerUrlListItems" height="180" item-height="36">
            <template v-slot:default="{ item }">
              <v-list-item dense class="px-2" :title="item" />
              <v-divider />
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-list-item>
    </template>
  </v-list>
</template>

<style scoped lang="scss"></style>
