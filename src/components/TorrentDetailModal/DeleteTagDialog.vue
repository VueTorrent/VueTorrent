<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-container
                style="min-height: 200px;"
                :class="`pa-0 project done`"
            >
                <v-card-title class="justify-center">
                    <h2>Delete Tag</h2>
                </v-card-title>

                <v-list
                    rounded
                    v-if="tags"
                    class="text-center mx-auto"
                    style="max-width: 200px;"
                >
                    <v-list-item
                        @click="deleteTag(t)"
                        v-for="(t, i) in tags"
                        :key="i"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="t"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-container>
            <v-card-actions class="justify-center pb-5 project done">
                <v-btn text @click="cancel" class="error white--text mt-3"
                    >Close</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import qbit from '@/services/qbit'
export default {
    name: 'DeleteTagDialog',
    props: {
        dialog: Boolean,
        tags: Array
    },
    methods: {
        deleteTag(tag) {
            qbit.deleteTag(tag)
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
