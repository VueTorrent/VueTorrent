<template>
  <v-container>
    <v-card flat>
      <v-card-text
        class="pa-0"
        style="font-size: 1.1em"
        :style="{ minHeight: phoneLayout ? '' : '70vh'}"
      >
        <div class="box">
          <v-subheader>Use Alternative WebUI</v-subheader>
          <div class="ml-5 mr-5">
            <v-checkbox
              v-model="settings.alternative_webui_enabled"
              dense
              :label="`Use Alternative WebUI`"
            />
            <v-text-field
              v-model="settings.alternative_webui_path"
              outlined
              dense
              hide-details="true"
              :label="`Files location`"
              :disabled="!settings.alternative_webui_enabled"
            />
          </div>
        </div>
        <div class="box">
          <v-subheader class="pb-4">
            Web User Interface (Remote Control)
          </v-subheader>
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
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { FullScreenModal, SettingsTab } from '@/mixins'

export default {
  name: 'WebUI',
  mixins: [SettingsTab, FullScreenModal]
}
</script>

<style lang="scss" scoped>
@import '~@/styles/SettingsTab.scss';
</style>
