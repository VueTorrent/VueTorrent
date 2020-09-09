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
                <v-flex xs12 sm12 class="mt-3">
                    <v-chip
                        v-for="tag in availableTags"
                        :key="tag"
                        small
                        class="download white--text caption mx-2"
                        style="font-size: 0.95em !important"
                    >
                        {{ tag }}
                    </v-chip>
                </v-flex>
            </v-layout>
            <v-card-actions class="justify-center pb-5">
                <v-btn
                    text
                    class="error white--text mt-3"
                    @click="DeleteTagDialog = true"
                    >Delete</v-btn
                >
                <v-btn
                    text
                    class="green_accent white--text mt-3"
                    @click="CreateNewTagDialog = true"
                    >Create new</v-btn
                >
            </v-card-actions>
            <v-layout class="mx-auto" row wrap>
                <v-flex xs12 sm12>
                    <h3>Available Categories:</h3>
                </v-flex>
                <v-flex xs12 sm12 class="mt-3">
                    <v-chip
                        v-for="cat in availableCategories"
                        :key="cat.name"
                        small
                        class="upload white--text caption mx-2"
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
                    @click="CreateNewCategoryDialog = true"
                    >Create new</v-btn
                >
            </v-card-actions>
        </v-card-text>

        <CreateNewTagDialog
            :dialog="CreateNewTagDialog"
            @close="CreateNewTagDialog = false"
        />
        <DeleteTagDialog
            :dialog="DeleteTagDialog"
            @close="DeleteTagDialog = false"
            :tags="availableTags"
        />
        <CreateNewCategoryDialog
            :dialog="CreateNewCategoryDialog"
            @close="
                closeAndRefetch('CreateNewCategoryDialog', 'fetchCategories')
            "
        />
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import qbit from '@/services/qbit'

import { Tab } from '@/mixins'
import {
    CreateNewTagDialog,
    DeleteTagDialog,
    CreateNewCategoryDialog
} from './TagsAndCategories'

export default {
    name: 'TagsAndCategories',
    components: {
        CreateNewTagDialog,
        DeleteTagDialog,
        CreateNewCategoryDialog
    },
    mixins: [Tab],
    props: {
        hash: String
    },
    data: () => ({
        CreateNewTagDialog: false,
        DeleteTagDialog: false,
        DeleteCategoryDialog: false,
        CreateNewCategoryDialog: false,
        categories: [],
        selectedCategory: null
    }),
    computed: {
        ...mapGetters(['getTorrent', 'getAvailableTags']),

        availableTags() {
            return this.getAvailableTags()
        },
        availableCategories() {
            return this.categories
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
        closeAndRefetch(dialog, fetch) {
            if (this[dialog]) this[dialog] = false
            if (this[fetch] && this[fetch] instanceof Function) this[fetch]()
        },
        editCategory(cat) {
            this.$store.commit('SET_SELECT_CATEGORY', cat)
            this.CreateNewCategoryDialog = true
        },
        deleteCategory() {
            this.createDynamicComponent('DeleteCategoryDialog')
        }
    }
}
</script>
