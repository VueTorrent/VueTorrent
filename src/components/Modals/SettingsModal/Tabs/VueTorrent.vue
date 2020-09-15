<template>
    <v-container>
        <v-card flat>
            <v-card-text class="pa-0" style="font-size: 1.1em">
                <div class="box">
                    <v-subheader
                        >These settings are for the custom WebUI
                        itself</v-subheader
                    >
                    <v-form class="px-6 mt-3">
                        <v-container>
                            <v-switch
                                class="v-input--reverse v-input--expand pa-0 ma-0"
                                inset
                                v-model="showCurrentSpeed"
                                color="green_accent"
                            >
                                <template #label> Show Current Speed </template>
                            </v-switch>
                            <v-switch
                                class="v-input--reverse v-input--expand pa-0 ma-0"
                                inset
                                v-model="showSpeedGraph"
                                color="green_accent"
                            >
                                <template #label> Show Speed Graph</template>
                            </v-switch>
                            <v-switch
                                class="v-input--reverse v-input--expand pa-0 ma-0"
                                inset
                                v-model="showSessionStat"
                                color="green_accent"
                            >
                                <template #label> Show Session Stats </template>
                            </v-switch>
                            <v-switch
                                class="v-input--reverse v-input--expand pa-0 ma-0"
                                inset
                                v-model="freeSpace"
                                color="green_accent"
                            >
                                <template #label> Show Free Space </template>
                            </v-switch>
                            <v-row dense>
                                <v-col cols="10" sm="10" md="11">
                                    <p class="subtitle-1">Current Version:</p>
                                </v-col>
                                <v-col cols="2" sm="2" md="1">
                                    <p class="mb-2">{{ version }}</p>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'VueTorrent',
    computed: {
        ...mapState(['webuiSettings']),
        ...mapGetters(['getAppVersion']),
        freeSpace: {
            get() {
                return this.webuiSettings.showFreeSpace
            },
            set(val) {
                this.webuiSettings.showFreeSpace = val
            }
        },
        showCurrentSpeed: {
            get() {
                return this.webuiSettings.showCurrentSpeed
            },
            set(val) {
                this.webuiSettings.showCurrentSpeed = val
            }
        },
        showSpeedGraph: {
            get() {
                return this.webuiSettings.showSpeedGraph
            },
            set(val) {
                this.webuiSettings.showSpeedGraph = val
            }
        },
        showSessionStat: {
            get() {
                return this.webuiSettings.showSessionStat
            },
            set(val) {
                this.webuiSettings.showSessionStat = val
            }
        },
        version() {
            return this.getAppVersion()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/SettingsTab.scss';
</style>

<style lang="scss" scoped>
// Reversed input variant
::v-deep .v-input--reverse .v-input__slot {
    flex-direction: row-reverse;
    justify-content: flex-end;
    .v-application--is-ltr & {
        .v-input--selection-controls__input {
            margin-right: 0;
            margin-left: 8px;
        }
    }
    .v-application--is-rtl & {
        .v-input--selection-controls__input {
            margin-left: 0;
            margin-right: 8px;
        }
    }
}
</style>
