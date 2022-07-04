<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.pageConnection.subHeader') }}</v-subheader>
    <v-list-item>
      <v-text-field
        v-model="settings.max_connec"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.pageConnection.globalMaxConnection')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_connec_per_torrent"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.pageConnection.perTorrentMaxConnection')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_uploads"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.pageConnection.globalMaxUploadSlots')"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.max_uploads_per_torrent"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        :label="$t('modals.settings.pageConnection.perTorrentMaxUploadSlots')"
      />
    </v-list-item>
  </v-card>
</template>

<script>
import { SettingsTab, FullScreenModal } from '@/mixins'

export default {
  name: 'Connection',
  mixins: [SettingsTab, FullScreenModal]
}
</script>