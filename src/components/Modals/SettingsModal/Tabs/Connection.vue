<template>
  <v-card flat>
    <v-subheader>Connection Limits</v-subheader>
    <v-list-item>
      <v-text-field
        v-model="settings.max_connec"
        class="mb-2"
        outlined
        dense
        type="number"
        hide-details
        label="Global maximum number of connections"
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
        label="Maximum number of connections per torrent"
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
        label="Global maximum number of upload slots"
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
        label="Maximum number of upload slots per torrent"
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