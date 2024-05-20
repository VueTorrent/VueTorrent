<script setup lang="ts">
import { useTorrentStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const {
  isTextFilterActive,
  textFilter,
  isStatusFilterActive,
  statusFilter,
  isCategoryFilterActive,
  categoryFilter,
  isTagFilterActive,
  tagFilter,
  isTrackerFilterActive,
  trackerFilter
} = storeToRefs(useTorrentStore())

const globalFilterActive = computed(
  () =>
    (isTextFilterActive.value && isTextFilterPresent.value) ||
    (isStatusFilterActive.value && isStatusFilterPresent.value) ||
    (isCategoryFilterActive.value && isCategoryFilterPresent.value) ||
    (isTagFilterActive.value && isTagFilterPresent.value) ||
    (isTrackerFilterActive.value && isTrackerFilterPresent.value)
)

const isTextFilterPresent = computed(() => textFilter.value.length > 0)
const isStatusFilterPresent = computed(() => statusFilter.value.length > 0)
const isCategoryFilterPresent = computed(() => categoryFilter.value.length > 0)
const isTagFilterPresent = computed(() => tagFilter.value.length > 0)
const isTrackerFilterPresent = computed(() => trackerFilter.value.length > 0)

const globalFilterColor = computed(() => (globalFilterActive.value ? 'active-global' : 'active-global-disabled'))
const textFilterColor = computed(() => (isTextFilterActive.value ? 'active-text' : 'active-text-disabled'))
const singleStatusFilterColor = computed(() => (isStatusFilterActive.value ? `torrent-${statusFilter.value[0]}` : `torrent-${statusFilter.value[0]}-darken-2`))
const statusFilterColor = computed(() => (isStatusFilterActive.value ? 'active-status' : 'active-status-disabled'))
const categoryFilterColor = computed(() => (isCategoryFilterActive.value ? 'active-category' : 'active-category-disabled'))
const tagFilterColor = computed(() => (isTagFilterActive.value ? 'active-tag' : 'active-tag-disabled'))
const trackerFilterColor = computed(() => (isTrackerFilterActive.value ? 'active-tracker' : 'active-tracker-disabled'))

const filterPresentCount = computed(
  () =>
    Number(isTextFilterPresent.value) +
    Number(isStatusFilterPresent.value) +
    Number(isCategoryFilterPresent.value) +
    Number(isTagFilterPresent.value) +
    Number(isTrackerFilterPresent.value)
)

const filterActiveCount = computed(
  () =>
    Number(isTextFilterPresent.value && isTextFilterActive.value) +
    Number(isStatusFilterPresent.value && isStatusFilterActive.value) +
    Number(isCategoryFilterPresent.value && isCategoryFilterActive.value) +
    Number(isTagFilterPresent.value && isTagFilterActive.value) +
    Number(isTrackerFilterPresent.value && isTrackerFilterActive.value)
)

function toggleAllFilters() {
  if (globalFilterActive.value) {
    isTextFilterActive.value = false
    isStatusFilterActive.value = false
    isCategoryFilterActive.value = false
    isTagFilterActive.value = false
    isTrackerFilterActive.value = false
  } else {
    isTextFilterActive.value = true
    isStatusFilterActive.value = true
    isCategoryFilterActive.value = true
    isTagFilterActive.value = true
    isTrackerFilterActive.value = true
  }
}

function resetAllFilters() {
  resetTextFilter()
  resetStatusFilter()
  resetCategoryFilter()
  resetTagFilter()
  resetTrackerFilter()
}

function toggleTextFilter() {
  isTextFilterActive.value = !isTextFilterActive.value
}

function resetTextFilter() {
  textFilter.value = ''
}

function toggleStatusFilter() {
  isStatusFilterActive.value = !isStatusFilterActive.value
}

function resetStatusFilter() {
  statusFilter.value = []
}

function toggleCategoryFilter() {
  isCategoryFilterActive.value = !isCategoryFilterActive.value
}

function resetCategoryFilter() {
  categoryFilter.value = []
}

function toggleTagFilter() {
  isTagFilterActive.value = !isTagFilterActive.value
}

function resetTagFilter() {
  tagFilter.value = []
}

function toggleTrackerFilter() {
  isTrackerFilterActive.value = !isTrackerFilterActive.value
}

function resetTrackerFilter() {
  trackerFilter.value = []
}
</script>

<template>
  <v-menu close-delay="5" open-delay="0" open-on-click open-on-hover open-on-focus>
    <template v-slot:activator="{ props }">
      <v-slide-x-transition>
        <v-chip v-if="filterPresentCount > 0" v-bind="props" class="ml-6" :color="globalFilterColor" variant="elevated" closable @click:close="resetAllFilters()">
          <template v-slot:prepend>
            <v-icon class="mr-1" @click="toggleAllFilters()">{{ globalFilterActive ? 'mdi-filter' : 'mdi-filter-off' }} </v-icon>
          </template>
          {{ t('navbar.top.active_filters.menu_label', filterActiveCount) }}
        </v-chip>
      </v-slide-x-transition>
    </template>

    <div class="d-flex flex-column flex-gap mt-3">
      <v-chip v-if="isTextFilterPresent" :color="textFilterColor" variant="elevated" closable @click:close="resetTextFilter()">
        <template v-slot:prepend>
          <v-icon class="mr-1" @click="toggleTextFilter()">{{ isTextFilterActive ? 'mdi-filter' : 'mdi-filter-off' }} </v-icon>
        </template>
        {{ t('navbar.top.active_filters.text', { value: textFilter }) }}
      </v-chip>

      <template v-if="isStatusFilterPresent">
        <v-chip v-if="statusFilter.length === 1" :color="singleStatusFilterColor" variant="elevated" closable @click:close="resetStatusFilter()">
          <template v-slot:prepend>
            <v-icon class="mr-1" @click="toggleStatusFilter()">{{ isStatusFilterActive ? 'mdi-filter' : 'mdi-filter-off' }} </v-icon>
          </template>
          {{ t('navbar.top.active_filters.state', { value: t(`torrent.state.${statusFilter[0]}`) }) }}
        </v-chip>
        <v-chip v-else :color="statusFilterColor" variant="elevated" closable @click:close="resetStatusFilter()">
          <template v-slot:prepend>
            <v-icon class="mr-1" @click="toggleStatusFilter()">{{ isStatusFilterActive ? 'mdi-filter' : 'mdi-filter-off' }} </v-icon>
          </template>
          {{ t('navbar.top.active_filters.multiple_state', statusFilter.length) }}
        </v-chip>
      </template>

      <template v-if="isCategoryFilterPresent">
        <v-chip v-if="categoryFilter.length === 1" :color="categoryFilterColor" variant="elevated" closable @click:close="resetCategoryFilter()">
          <template v-slot:prepend>
            <v-icon class="mr-1" @click="toggleCategoryFilter()">
              {{ isCategoryFilterActive ? 'mdi-filter' : 'mdi-filter-off' }}
            </v-icon>
          </template>
          {{ t('navbar.top.active_filters.category', { value: categoryFilter[0] === '' ? t('navbar.side.filters.uncategorized') : categoryFilter[0] }) }}
        </v-chip>
        <v-chip v-else :color="categoryFilterColor" variant="elevated" closable @click:close="resetCategoryFilter()">
          <template v-slot:prepend>
            <v-icon class="mr-1" @click="toggleCategoryFilter()">
              {{ isCategoryFilterActive ? 'mdi-filter' : 'mdi-filter-off' }}
            </v-icon>
          </template>
          {{ t('navbar.top.active_filters.multiple_category', categoryFilter.length) }}
        </v-chip>
      </template>

      <template v-if="isTagFilterPresent">
        <v-chip v-if="tagFilter.length === 1" :color="tagFilterColor" variant="elevated" closable @click:close="resetTagFilter()">
          <template v-slot:prepend>
            <v-icon class="mr-1" @click="toggleTagFilter()">{{ isTagFilterActive ? 'mdi-filter' : 'mdi-filter-off' }} </v-icon>
          </template>
          {{ t('navbar.top.active_filters.tag', { value: tagFilter[0] === null ? t('navbar.side.filters.untagged') : tagFilter[0] }) }}
        </v-chip>
        <v-chip v-else :color="tagFilterColor" variant="elevated" closable @click:close="resetTagFilter()">
          <template v-slot:prepend>
            <v-icon class="mr-1" @click="toggleTagFilter()">{{ isTagFilterActive ? 'mdi-filter' : 'mdi-filter-off' }} </v-icon>
          </template>
          {{ t('navbar.top.active_filters.multiple_tag', tagFilter.length) }}
        </v-chip>
      </template>

      <template v-if="isTrackerFilterPresent">
        <v-chip v-if="trackerFilter.length === 1" :color="trackerFilterColor" variant="elevated" closable @click:close="resetTrackerFilter()">
          <template v-slot:prepend>
            <v-icon class="mr-1" @click="toggleTrackerFilter()">
              {{ isTrackerFilterActive ? 'mdi-filter' : 'mdi-filter-off' }}
            </v-icon>
          </template>
          {{ t('navbar.top.active_filters.tracker', { value: trackerFilter[0] === '' ? t('navbar.side.filters.untracked') : trackerFilter[0] }) }}
        </v-chip>
        <v-chip v-else :color="trackerFilterColor" variant="elevated" closable @click:close="resetTrackerFilter()">
          <template v-slot:prepend>
            <v-icon class="mr-1" @click="toggleTrackerFilter()">
              {{ isTrackerFilterActive ? 'mdi-filter' : 'mdi-filter-off' }}
            </v-icon>
          </template>
          {{ t('navbar.top.active_filters.multiple_tracker', trackerFilter.length) }}
        </v-chip>
      </template>
    </div>
  </v-menu>
</template>
