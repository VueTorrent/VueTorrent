<script setup lang="ts">
import { computed } from 'vue'
import { usePreferenceStore } from '@/stores'
import { EnhancedAppPreferences } from '@/types/qbit/models/AppPreferences'

const preferenceStore = usePreferenceStore()

const preferences = computed({
  get: () => preferenceStore.preferences as EnhancedAppPreferences,
  set: v => (preferenceStore.preferences = v),
})
</script>

<template>
  <v-list>
    <v-list-item>
      <v-checkbox v-model="preferences.auto_ban_bt_player_peer" hide-details :label="$t('settings.addons.enhanced_edition.auto_ban_bt_player_peer')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferences.auto_ban_unknown_peer" hide-details :label="$t('settings.addons.enhanced_edition.auto_ban_unknown_peer')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="preferences.auto_update_trackers_enabled" hide-details :label="$t('settings.addons.enhanced_edition.auto_update_trackers')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferences.customize_trackers_list_url"
        :disabled="!preferences.auto_update_trackers_enabled"
        hide-details
        :label="$t('settings.addons.enhanced_edition.trackers_list_url')" />
    </v-list-item>

    <v-list-item>
      <v-textarea
        v-model="preferences.public_trackers"
        disabled
        auto-grow
        persistent-hint
        :hint="$t('settings.bittorrent.autoAddTrackersHint')"
        :label="$t('settings.addons.enhanced_edition.public_trackers')" />
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
