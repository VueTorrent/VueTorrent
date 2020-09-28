<template>
    <div style="margin-top: 30px">
        <div class="secondary_lighter--text text-uppercase caption ml-4">
            Status
        </div>
        <v-select
            :value="selectedState"
            v-model="selectedState"
            flat
            class="ml-2 mr-2"
            :items="options"
            item-text="name"
            item-value="value"
            dense
            solo
            color="download"
            background-color="secondary"
            item-color="download"
            @input="setStatusFilter"
            height="55"
        ></v-select>
        <div class="secondary_lighter--text text-uppercase caption ml-4">
            Category
        </div>
        <v-select
            :value="selectedCategory"
            v-model="selectedCategory"
            flat
            class="ml-2 mr-2"
            :items="availableCategories"
            dense
            solo
            color="download"
            background-color="secondary"
            item-color="download"
            @input="setCategoryFilter"
            height="55"
        ></v-select>
        <div
            style="font-size: 0.9em"
            class="download--text text-uppercase text-center"
        >
            {{ torrentCountString }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'FilterSelect',
    data: () => ({
        options: [
            { value: 'all', name: 'All' },
            { value: 'downloading', name: 'Downloading' },
            { value: 'seeding', name: 'Seeding' },
            { value: 'completed', name: 'Completed' },
            { value: 'resumed', name: 'Resumed' },
            { value: 'paused', name: 'Paused' },
            { value: 'active', name: 'Active' },
            { value: 'inactive', name: 'Inactive' },
            { value: 'stalled', name: 'Stalled' },
            { value: 'stalled_uploading', name: 'Stalled Uploading' },
            { value: 'stalled_downloading', name: 'Stalled Downloading' },
            { value: 'errored', name: 'Erorred' }
        ],
        selectedState: { value: 'all', name: 'All' },
        selectedCategory: null
    }),
    computed: {
        ...mapGetters(['getCategories', 'getTorrentCountString']),
        availableCategories() {
            const categories = ['All', 'Uncategorized']
            categories.push(...Object.keys(this.getCategories()))
            return categories
        },
        categoryFilter() {
            switch (this.selectedCategory) {
                case 'All':
                    return null
                case 'Uncategorized':
                    return ''
                default:
                    return this.selectedCategory
            }
        },
        torrentCountString() {
            return this.getTorrentCountString()
        }
    },
    methods: {
        setStatusFilter(value) {
            this.$store.commit('UPDATE_SORT_OPTIONS', {
                filter: value,
                category: this.categoryFilter
            })
        },
        setCategoryFilter() {
            this.$store.commit('UPDATE_SORT_OPTIONS', {
                filter: this.selectedState.value,
                category: this.categoryFilter
            })
        }
    },
    mounted() {
        this.selectedCategory = this.availableCategories[0]
    }
}
</script>

<style lang="scss">
.v-select__selection,
.v-input__icon i {
    color: #64ceaa !important;
}
</style>
