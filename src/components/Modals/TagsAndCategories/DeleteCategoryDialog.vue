<template>
    <v-dialog :value="dialog" max-width="600px">
        <v-card>
            <v-container style="min-height: 200px" :class="`pa-0 project done`">
                <v-card-title class="justify-center">
                    <h2>Delete Category</h2>
                </v-card-title>

                <v-list
                    rounded
                    v-if="categories"
                    class="text-center mx-auto"
                    style="max-width: 200px"
                >
                    <v-list-item
                        @click="deleteCategory(t)"
                        v-for="(t, i) in categories"
                        :key="i"
                    >
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="t.name"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-card-subtitle
                    class="text-center mx-auto"
                    style="font-size: 1.5em; margin-top: 20px"
                    v-else
                >
                    No categories found
                </v-card-subtitle>
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
import { Modal } from '@/mixins'
import { mapGetters } from 'vuex'
export default {
    name: 'DeleteCategoryDialog',
    mixins: [Modal],
    computed: {
        ...mapGetters(['getCategories']),
        categories() {
            return this.getCategories()
        }
    },
    methods: {
        deleteCategory(cat) {
            qbit.deleteCategory(cat.name)
            this.cancel()
        },
        cancel() {
            this.$store.commit('FETCH_CATEGORIES')
            this.deleteModal()
        }
    }
}
</script>

<style></style>
