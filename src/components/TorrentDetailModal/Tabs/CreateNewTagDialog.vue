<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-container
                style="min-height: 200px;"
                :class="`pa-0 project done`"
            >
                <v-card-title class="justify-center">
                    <h2>Create New Tag</h2>
                </v-card-title>

                <v-form class="px-6 mt-3">
                    <v-container>
                        <v-text-field
                            class="mx-auto"
                            style="max-width: 200px;"
                            v-model="tagname"
                            :rules="rules"
                            :counter="10"
                            label="Tag name"
                            required
                        ></v-text-field>
                    </v-container>
                </v-form>
            </v-container>
            <v-card-actions class="justify-center pb-5 project done">
                <v-btn text @click="cancel" class="error white--text mt-3"
                    >Cancel</v-btn
                >
                <v-btn
                    text
                    @click="create"
                    class="green_accent white--text mt-3"
                    >Save</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import qbit from '@/services/qbit'
export default {
    name: 'createNewTagDialog',
    props: {
        dialog: Boolean
    },
    data: () => ({
        tagname: '',
        rules: [
            v => !!v || 'Tag is required',
            v => v.length <= 10 || 'Tag must be less than 10 characters'
        ]
    }),
    methods: {
        create() {
            qbit.createTag(this.tagname)
            this.cancel()
        },
        cancel() {
            this.tagname = ''
            this.$emit('close')
        }
    }
}
</script>

<style></style>
