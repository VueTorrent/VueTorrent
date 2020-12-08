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
            @input="setCategoryOrTrackerFilter"
            height="55"
        ></v-select>
      <div v-if="showTrackerFilter">
        <div class="secondary_lighter--text text-uppercase caption ml-4">
            Tracker
        </div>
        <v-select
            :value="selectedTracker"
            v-model="selectedTracker"
            flat
            class="ml-2 mr-2"
            :items="availableTrackers"
            dense
            solo
            color="download"
            background-color="secondary"
            item-color="download"
            @input="setCategoryOrTrackerFilter"
            height="55"
        ></v-select>
      </div>
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
    props: ['showTrackerFilter'],
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
            { value: 'errored', name: 'Errored' }
        ],
        selectedState: { value: 'all', name: 'All' },
        selectedCategory: null,
        selectedTracker: 'All'
    }),
    computed: {
        ...mapGetters(['getCategories', 'getTrackers', 'getTorrentCountString']),
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
        availableTrackers() {
            const trackers = ['All', 'Not working']
            if (this.showTrackerFilter) {
                trackers.push(...this.getTrackers())
            }
            return trackers
        },
        trackerFilter() {
            switch (this.selectedTracker) {
            case 'All':
                return null
            case 'Not working':
                return ''
            default:
                return this.selectedTracker
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
                category: this.categoryFilter,
                tracker: this.trackerFilter
            })
        },
        setCategoryOrTrackerFilter() {
            this.$store.commit('UPDATE_SORT_OPTIONS', {
                filter: this.selectedState.value,
                category: this.categoryFilter,
                tracker: this.trackerFilter
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
