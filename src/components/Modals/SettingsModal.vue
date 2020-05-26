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
                            class="blue_accent white--text mx-0 mt-3"
                            >switch to old ui</v-btn
                        >
                    </v-card-actions>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import Modal from '@/mixins/Modal'
import qbit from '@/services/qbit'
export default {
    name: 'SettingsModal',
    mixins: [Modal],
    methods: {
        async switchOldUI() {
            await qbit.switchToOldUi()

            window.location.reload(true)
        }
    }
}
</script>
