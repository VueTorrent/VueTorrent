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
                                class="v-input--reverse v-input--expand"
                                inset
                                v-model="freeSpace"
                                color="green_accent"
                            >
                                <template #label>
                                    <span class="grey--text">
                                        Show Free Space
                                    </span>
                                </template>
                            </v-switch>
                        </v-container>
                    </v-form>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'VueTorrent',
    computed: {
        ...mapState(['webuiSettings']),
        freeSpace: {
            get() {
                return this.webuiSettings.showFreeSpace
            },
            set(val) {
                this.webuiSettings.showFreeSpace = val
            }
        }
    }
}
</script>

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
