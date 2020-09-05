<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-container style="min-height: 200px" :class="`pa-0 project done`">
                <v-card-title class="justify-center">
                    <h2>Create New Category</h2>
                </v-card-title>

                <v-form ref="categoryForm" class="px-6 mt-3">
                    <v-container>
                        <v-text-field
                            class="mx-auto"
                            style="max-width: 200px"
                            v-model="category.name"
                            :rules="nameRules"
                            :counter="15"
                            label="Category name"
                            required
                        ></v-text-field>
                        <v-text-field
                            class="mx-auto"
                            style="max-width: 200px"
                            v-model="category.savePath"
                            :rules="PathRules"
                            :counter="40"
                            label="Path"
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
import { mapGetters } from 'vuex'
import qbit from '@/services/qbit'
export default {
    name: 'createNewCategoryDialog',
    props: {
        dialog: Boolean
    },
    computed: {
        ...mapGetters(['getSelectedCategory'])
    },
    data: () => ({
        nameRules: [
            v => !!v || 'Category name is required',
            v =>
                (v && v.length <= 15) ||
                'Category name must be less than 15 characters'
        ],
        PathRules: [
            v => !!v || 'Path is required',
            v => (v && v.length <= 40) || 'Path must be less than 40 characters'
        ],
        category: { name: '', savePath: '' }
    }),
    methods: {
        create() {
            console.log(this.category)
            qbit.createCategory(this.category)
            this.cancel()
        },
        cancel() {
            this.category.name = ''
            this.category.savePath = ''
            this.$refs.categoryForm.reset()
            this.$emit('close')
        }
    },
    watch: {
        dialog() {
            let cat = this.getSelectedCategory()
            if (cat && cat.name && cat.savePath) {
                this.category = cat
            }
        }
    }
}
</script>

<style></style>
