<template>
  <v-card flat>
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
            label="IP Address:"
          />
        </v-col>
        <v-col cols="3" class="pa-0">
          <v-text-field
            v-model="settings.web_ui_port"
            class="ml-1"
            outlined
            dense
            type="number"
            hide-details="true"
            label="Port"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-divider insert />
    <v-subheader>Authentication</v-subheader>
    <v-list-item>
      <v-row class="ml-5 mr-5 pb-4">
        <v-col cols="6" class="pa-0">
          <v-text-field
            v-model="settings.web_ui_username"
            class="mr-1"
            outlined
            dense
            hide-details="true"
            label="Username"
          />
        </v-col>
        <v-col cols="6" class="pa-0">
          <v-text-field
            v-model="settings.web_ui_password"
            class="ml-1"
            outlined
            dense
            hide-details="true"
            label="password"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row class="ml-5 mr-5 pb-4">
        <v-col cols="6" class="pa-0">
          <v-text-field
            v-model="settings.web_ui_max_auth_fail_count"
            class="mr-1"
            outlined
            dense
            type="number"
            hide-details="true"
            label="Max attempts"
          />
        </v-col>
        <v-col cols="6" class="pa-0">
          <v-text-field
            v-model="settings.web_ui_ban_duration"
            class="ml-1"
            outlined
            dense
            type="number"
            hide-details="true"
            label="Ban Duration (seconds)"
          />
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item class="ml-5 mr-4">
      <v-text-field
        v-model="settings.web_ui_session_timeout"
        class="mr-1"
        outlined
        dense
        type="number"
        hide-details="true"
        label="Session timeout (seconds)"
      />
    </v-list-item>
    <v-list-item class="ml-4">
      <v-checkbox
        v-model="settings.bypass_local_auth"
        hide-details
        class="ma-0 pa-0"
        label="Bypass authentication for clients on localhost" 
      />
    </v-list-item>
    <v-list-item class="ml-4">
      <v-checkbox
        v-model="settings.bypass_auth_subnet_whitelist_enabled"
        hide-details
        class="ma-0 pa-0"
        label="Bypass authentication for clients in whitelisted IP subnets" 
      />
    </v-list-item>
    <v-list-item class="ml-4">
      <v-textarea
        v-model="settings.bypass_auth_subnet_whitelist"
        class="mr-1"
        outlined
        dense
        placeholder="Example: 172.17.32.0/24, fdff:ffff:c8::/40"
        hide-details="true"
        :disabled="!settings.bypass_auth_subnet_whitelist_enabled"
      />
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
