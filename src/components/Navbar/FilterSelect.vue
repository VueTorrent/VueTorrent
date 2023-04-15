<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

// composables
const { t: $t } = useI18n()

// data
const selectedState = ref(null)
const selectedCategory = ref(null)
const selectedTag = ref(null)
const selectedTracker = ref(null)

// computed
const options = computed(() => {
  return [
    { value: null, name: $t('all') },
    { value: 'downloading', name: $t('downloading') },
    { value: 'seeding', name: $t('seeding') },
    { value: 'completed', name: $t('completed') },
    { value: 'resumed', name: $t('resumed') },
    { value: 'paused', name: $t('paused') },
    { value: 'active', name: $t('active') },
    { value: 'inactive', name: $t('inactive') },
    { value: 'stalled', name: $t('stalled') },
    {
      value: 'stalled_uploading',
      name: $t('navbar.filters.stalled_uploading')
    },
    {
      value: 'stalled_downloading',
      name: $t('navbar.filters.stalled_downloading')
    },
    { value: 'checking', name: $t('navbar.filters.checking') },
    { value: 'moving', name: $t('navbar.filters.moving') },
    { value: 'errored', name: $t('errored') }
  ]
})

const availableCategories = async () => {
  const categories = [
    { name: $t('all'), value: null },
    { name: $t('navbar.filters.uncategorized'), value: '' }
  ]

  // await useCategories().then((r) => {
  //   r.data.value?.map((c) => {
  //     categories.push({ name: c.name, value: c.name })
  //   })
  // })

  return categories
}

const availableTags = async () => {
  return [
    { name: $t('all'), value: null },
    { name: $t('navbar.filters.untagged'), value: '' }
  ]
}
</script>

<template>
  <div class="mt-1">
    <div id="status_filter">
      <label class="text-white text-uppercase font-weight-medium text-caption ml-4">
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
      />
    </div>
    <div id="category_filter">
      <label class="text-white text-uppercase font-weight-medium text-caption ml-4">
        {{ $t('category') }}
      </label>
      <v-select
        aria-label="category_filter"
        :value="selectedCategory"
        flat
        solo
        class="ml-2 mr-2"
        :label="$t('category')"
        :items="availableCategories()"
        item-text="name"
        color="download"
        item-color="download"
        background-color="secondary"
      />
    </div>
    <div id="tag_filter">
      <label class="text-white text-uppercase font-weight-medium text-caption ml-4">
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
      />
    </div>
    <div id="tracker_filter" v-if="true">
      <label class="text-white text-uppercase font-weight-medium text-caption ml-4">
        {{ $t('tracker') }}
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
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
