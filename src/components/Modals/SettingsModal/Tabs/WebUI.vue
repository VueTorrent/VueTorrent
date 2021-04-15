<template>
  <v-card flat>
    <v-subheader>public settings</v-subheader>
    <v-list-item>
      <v-checkbox
        v-model="settings.alternative_webui_enabled"
        hide-details
        class="ma-0 pa-0"
        label="Use Alternative WebUI"
      />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="settings.alternative_webui_path"
        class="mb-2"
        outlined
        dense
        hide-details
        label="Files location"
        :disabled="!settings.alternative_webui_enabled"
      />
    </v-list-item>
    <v-divider insert />
    <v-subheader>Web User Interface (Remote Control)</v-subheader>
    <v-list-item>
      <v-row class="ml-5 mr-5 pb-4">
        <v-col cols="9" class="pa-0">
          <v-text-field
            v-model="settings.web_ui_address"
            class="mr-1"
            outlined
            dense
            hide-details="true"
            :label="`IP Address:`"
          />
        </v-col>
        <v-col cols="3" class="pa-0">
          <v-text-field
            v-model="settings.web_ui_port"
            class="ml-1"
            outlined
            dense
            hide-details="true"
            :label="`Port`"
          />
        </v-col>
      </v-row>
    </v-list-item>
  </v-card>
</template>

<script>
import { FullScreenModal, SettingsTab } from '@/mixins'

export default {
  name: 'WebUI',
  mixins: [SettingsTab, FullScreenModal]
}
</script>
