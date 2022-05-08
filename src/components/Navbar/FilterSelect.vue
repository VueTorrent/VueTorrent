<template>
  <div class="mt-1">
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
    <div v-if="showTrackerFilter">
      <label class="white--text text-uppercase font-weight-medium caption ml-4">
        Tracker
      </label>
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
    selectedTracker: null
  }),
  computed: {
    ...mapGetters(['getCategories', 'getTrackers']),
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
        { value: 'stalled_uploading', name: this.$i18n.t('navbar.filters.stalled_uploading') },
        { value: 'stalled_downloading', name: this.$i18n.t('navbar.filters.stalled_downloading') },
        { value: 'errored', name: this.$i18n.t('errored') }
      ]
    },
    availableCategories() {
      const categories = [
        { name: 'All', value: null },
        { name: 'Uncategorized', value: '' }]
      categories.push(...this.getCategories().map(c => {
        return { name: c.name, value: c.name }
      }))

      return categories
    },
    availableTrackers() {
      const trackers = [
        { name: 'All', value: null },
        { name: 'Not working', value: '' }
      ]
         
      if (this.showTrackerFilter) {
        trackers.push(...this.getTrackers().map(t => {
          return {
            name: t, value: t
          }
        }))
      }

      return trackers
    }
  },
  mounted() {
    this.setDefaultValues()
  },
  methods: {
    applyFilter() {
      this.$store.commit('UPDATE_SORT_OPTIONS', {
        filter: this.selectedState,
        category: this.selectedCategory,
        tracker: this.selectedTracker
      })
    },
    setState(value) {
      this.selectedState = value
      this.applyFilter()
    },
    setTracker(value) {
      this.selectedTracker = value
      this.applyFilter()
    },
    setCategory(value) {
      this.selectedCategory = value
      this.applyFilter()
    },
    setDefaultValues() {
      this.selectedState = this.options.find(o => o.value === this.sort_options.filter).value || this.options[0].value
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

