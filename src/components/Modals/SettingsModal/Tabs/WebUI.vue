<template>
    <v-container>
        <v-card flat>
            <v-card-text class="pa-0" style="font-size: 1.1em">
                <div class="box">
                    <v-subheader>Use Alternative WebUI</v-subheader>
                    <div class="ml-5 mr-5">
                        <v-checkbox
                            dense
                            :label="`Use Alternative WebUI`"
                            v-model="settings.alternative_webui_enabled"
                        />
                        <v-text-field
                            outlined
                            dense
                            hide-details="true"
                            :label="`Files location`"
                            :disabled="!settings.alternative_webui_enabled"
                            v-model="settings.alternative_webui_path"
                        />
                    </div>
                </div>
                <div class="box">
                    <v-subheader
                        >Web User Interface (Remote Control)</v-subheader
                    >
                    <v-row class="ml-5 mr-5">
                        <v-col cols="10">
                            <v-text-field
                                class="mr-1"
                                outlined
                                dense
                                hide-details="true"
                                :label="`IP Address:`"
                                v-model="settings.web_ui_address"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                class="ml-1"
                                outlined
                                dense
                                hide-details="true"
                                :label="`Port`"
                                v-model="settings.web_ui_port"
                            />
                        </v-col>
                    </v-row>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import SettingsTab from '@/mixins/SettingsTab'

export default {
    name: 'WebUI',
    mixins: [SettingsTab]
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/SettingsTab.scss';
</style>
