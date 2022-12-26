<template>
  <div class="mt-1">
    <div id="status_filter">
      <label class="white--text text-uppercase font-weight-medium caption ml-4">
        {{ $t('status') }}
      </label>
      <v-select
        name="state_filter"
        aria-label="state_filter"
        :value="selectedState"
        class="ml-2 mr-2"
        :label="$t('status')"
        flat
        solo
        :items="options"
        item-text="name"
        color="download"
        item-color="download"
        background-color="secondary"
        @input="setState"
      />
    </div>
    <div id="category_filter">
      <label class="white--text text-uppercase font-weight-medium caption ml-4">
        {{ $t('category') }}
      </label>
      <v-select
        aria-label="category_filter"
        :value="selectedCategory"
        flat
        solo
        class="ml-2 mr-2"
        :label="$t('category')"
        :items="availableCategories"
        item-text="name"
        color="download"
        item-color="download"
        background-color="secondary"
        @input="setCategory"
      />
    </div>
    <div id="tag_filter">
      <label class="white--text text-uppercase font-weight-medium caption ml-4">
        {{ $t('tags') }}
      </label>
      <v-select
        aria-label="tag_filter"
        :value="selectedTag"
        flat
        solo
        class="ml-2 mr-2"
        :label="$t('tag')"
        :items="availableTags"
        item-text="name"
        color="download"
        item-color="download"
        background-color="secondary"
        @input="setTag"
      />
    </div>
    <div id="tracker_filter" v-if="showTrackerFilter">
      <label class="white--text text-uppercase font-weight-medium caption ml-4"> Tracker </label>
      <v-select
        aria-label="tracker_filter"
        :value="selectedTracker"
        flat
        solo
        class="ml-2 mr-2"
        label="TRACKER"
        :items="availableTrackers"
        item-text="name"
        color="download"
        item-color="download"
        background-color="secondary"
        @input="setTracker"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'FilterSelect',
  props: ['showTrackerFilter'],
  data: () => ({
    selectedState: null,
    selectedCategory: null,
    selectedTag: null,
    selectedTracker: null
  }),
  computed: {
    ...mapGetters(['getCategories', 'getAvailableTags', 'getTrackers']),
    ...mapState(['sort_options']),
    options() {
      return [
        { value: null, name: this.$i18n.t('all') },
        { value: 'downloading', name: this.$i18n.t('downloading') },
        { value: 'seeding', name: this.$i18n.t('seeding') },
        { value: 'completed', name: this.$i18n.t('completed') },
        { value: 'resumed', name: this.$i18n.t('resumed') },
        { value: 'paused', name: this.$i18n.t('paused') },
        { value: 'active', name: this.$i18n.t('active') },
        { value: 'inactive', name: this.$i18n.t('inactive') },
        { value: 'stalled', name: this.$i18n.t('stalled') },
        {
          value: 'stalled_uploading',
          name: this.$i18n.t('navbar.filters.stalled_uploading')
        },
        {
          value: 'stalled_downloading',
          name: this.$i18n.t('navbar.filters.stalled_downloading')
        },
        { value: 'errored', name: this.$i18n.t('errored') }
      ]
    },
    availableCategories() {
      const categories = [
        { name: 'All', value: null },
        { name: 'Uncategorized', value: '' }
      ]
      categories.push(
        ...this.getCategories().map(c => {
          return { name: c.name, value: c.name }
        })
      )

      return categories
    },
    availableTags() {
      return [
        {name: 'All', value: null},
        {name: 'Untagged', value: ''},
        ...this.getAvailableTags()
      ]
    },
    availableTrackers() {
      const trackers = [
        { name: 'All', value: null },
        { name: 'Not working', value: '' }
      ]

      if (this.showTrackerFilter) {
        trackers.push(
          ...this.getTrackers().map(t => {
            return {
              name: t,
              value: t
            }
          })
        )
      }

      return trackers
    }
  },
  mounted() {
    this.loadFilter()
  },
  methods: {
    commitFilter() {
      this.$store.commit('UPDATE_SORT_OPTIONS', {
        filter: this.selectedState,
        category: this.selectedCategory,
        tag: this.selectedTag,
        tracker: this.selectedTracker
      })
    },
    loadFilter() {
      this.selectedState = this.$store.state.sort_options.filter
      this.selectedCategory = this.$store.state.sort_options.category
      this.selectedTag = this.$store.state.sort_options.tag
      this.selectedTracker = this.$store.state.sort_options.tracker
    },
    setState(value) {
      this.selectedState = value
      this.commitFilter()
    },
    setCategory(value) {
      this.selectedCategory = value
      this.commitFilter()
    },
    setTag(value) {
      this.selectedTag = value
      this.commitFilter()
    },
    setTracker(value) {
      this.selectedTracker = value
      this.commitFilter()
    }
  }
}
</script>

<style lang="scss">
.v-select__selection,
.v-input__icon svg {
  color: #64ceaa !important;
}
.v-select__slot > label {
  color: white !important;
}
#app .v-select .v-text-field__details {
  display: none;
}

#app .v-select .v-select__selection {
  padding: 16px 0;
  margin: 0;
}
</style>
