<template>
    <v-card flat>
        <v-card-text
            class="mx-auto mt-5"
            style="font-size: 1.1em; max-height: 500px; min-height: 300px"
        >
            <v-layout class="mx-auto" row wrap>
                <v-flex xs12 sm12>
                    <h3>Available Tags:</h3>
                </v-flex>
                <v-flex xs12 sm12 class="mt-3 d-flex flex-wrap">
                    <v-chip
                        v-for="tag in availableTags"
                        :key="tag"
                        small
                        class="download white--text caption mx-2 my-1"
                        style="font-size: 0.95em !important"
                    >
                        {{ tag }}
                    </v-chip>
                </v-flex>
            </v-layout>
            <v-card-actions class="justify-center pb-5">
                <v-btn text class="error white--text mt-3" @click="deleteTag"
                    >Delete</v-btn
                >
                <v-btn
                    text
                    class="green_accent white--text mt-3"
                    @click="createTag"
                    >Create new</v-btn
                >
            </v-card-actions>
            <v-layout class="mx-auto" row wrap>
                <v-flex xs12 sm12>
                    <h3>Available Categories:</h3>
                </v-flex>
                <v-flex class="d-flex flex-wrap  mt-3" xs12 sm12>
                    <v-chip
                        v-for="cat in availableCategories"
                        :key="cat.name"
                        small
                        class="upload white--text caption mx-2 my-1"
                        style="font-size: 0.95em !important"
                        @click="editCategory(cat)"
                        @click:close="editCategory(cat)"
                    >
                        {{ cat.name }}
                    </v-chip>
                </v-flex>
            </v-layout>
            <v-card-actions class="justify-center pb-5">
                <v-btn
                    text
                    class="error white--text mt-3"
                    @click="deleteCategory"
                    >Delete</v-btn
                >
                <v-btn
                    text
                    class="green_accent white--text mt-3"
                    @click="createCategory"
                    >Create new</v-btn
                >
            </v-card-actions>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import qbit from '@/services/qbit'

import { Tab, General } from '@/mixins'

export default {
    name: 'TagsAndCategories',
    mixins: [Tab, General],
    props: {
        hash: String
    },
    data: () => ({
        selectedCategory: null
    }),
    computed: {
        ...mapGetters(['getTorrent', 'getAvailableTags', 'getCategories']),

        availableTags() {
            return this.getAvailableTags()
        },
        availableCategories() {
            return this.getCategories()
        }
    },
    methods: {
        activeMethod() {
            this.fetchCategories()
        },
        async fetchCategories() {
            const { data } = await qbit.getCategories()
            this.categories = data
        },
        deleteTag() {
            this.createModal('DeleteTagDialog')
        },
        createTag() {
            this.createModal('CreateTagDialog')
        },
        createCategory() {
            this.createModal('CreateCategoryDialog')
        },
        deleteCategory() {
            this.createModal('DeleteCategoryDialog')
        },
        editCategory(cat) {
            this.createModal('CreateCategoryDialog', { initialCategory: cat })
        }
    },
    created() {
        this.$store.commit('FETCH_CATEGORIES')
    }
}
</script>
