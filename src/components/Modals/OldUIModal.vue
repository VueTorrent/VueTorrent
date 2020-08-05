<template>
    <v-dialog max-width="500px" v-model="dialog">
        <v-card>
            <v-container
                style="min-height: 300px;"
                :class="`pa-0 project done`"
            >
                <v-card-title class="justify-center">
                    <h2>Settings</h2>
                </v-card-title>
                <v-form>
                    <v-card-actions class="justify-center">
                        <v-btn
                            text
                            @click="switchOldUI"
                            class="green_accent white--text mx-0 mt-3"
                            >switch to old ui</v-btn
                        >
                    </v-card-actions>
                </v-form>
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
            </v-container>
            <v-card-actions class="justify-center pb-5 project done">
                <v-btn
                    text
                    @click="save"
                    class="green_accent white--text mx-0 mt-3"
                    >Save</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '@/mixins/Modal'
import qbit from '@/services/qbit'
export default {
    name: 'OldUIModal',
    mixins: [Modal],
    methods: {
        async switchOldUI() {
            await qbit.switchToOldUi()

            window.location.reload(true)
        },
        save() {
            this.$store.commit('TOGGLE_MODAL', 'olduimodal')
        }
    },
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
