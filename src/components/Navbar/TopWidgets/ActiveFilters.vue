<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useI18nUtils } from '@/composables'
import { FilterState, TrackerSpecialFilter } from '@/constants/vuetorrent'
import { getTorrentStateColor } from '@/helpers'
import { useTorrentStore } from '@/stores'

const { mobile } = useDisplay()
const { t, getTorrentStateString } = useI18nUtils()
const {
  isTextFilterActive,
  textFilter,
  isStatusFilterActive,
  statusFilter,
  isCategoryFilterActive,
  categoryFilter,
  isTagFilterActive,
  tagFilterInclude,
  tagFilterExclude,
  isTrackerFilterActive,
  trackerFilterInclude,
  trackerFilterExclude,
} = storeToRefs(useTorrentStore())

const aggregatedTagFilters = computed(() => {
  const included = Array.from(tagFilterInclude.value).map(tag => ({ value: tag, state: FilterState.INCLUDED }))
  const excluded = Array.from(tagFilterExclude.value).map(tag => ({ value: tag, state: FilterState.EXCLUDED }))
  return [...included, ...excluded]
})
const aggregatedTrackerFilters = computed(() => {
  const included = Array.from(trackerFilterInclude.value).map(tracker => ({ value: tracker, state: FilterState.INCLUDED }))
  const excluded = Array.from(trackerFilterExclude.value).map(tracker => ({ value: tracker, state: FilterState.EXCLUDED }))
  return [...included, ...excluded]
})

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
const isTagFilterPresent = computed(() => aggregatedTagFilters.value.length > 0)
const isTrackerFilterPresent = computed(() => aggregatedTrackerFilters.value.length > 0)

const globalFilterColor = computed(() => (globalFilterActive.value ? 'active-global' : 'active-global-disabled'))
const textFilterColor = computed(() => (isTextFilterActive.value ? 'active-text' : 'active-text-disabled'))
const singleStatusFilterColor = computed(() =>
  isStatusFilterActive.value ? getTorrentStateColor(statusFilter.value[0]) : `${getTorrentStateColor(statusFilter.value[0])}-darken-2`
)
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
  tagFilterInclude.value = []
  tagFilterExclude.value = []
}

function toggleTrackerFilter() {
  isTrackerFilterActive.value = !isTrackerFilterActive.value
}

function resetTrackerFilter() {
  trackerFilterInclude.value = []
  trackerFilterExclude.value = []
}
</script>

<template>
  <v-menu close-delay="5" open-delay="0" :close-on-content-click="false" :open-on-click="mobile" open-on-hover open-on-focus>
    <template #activator="{ props }">
      <v-slide-x-transition>
        <v-chip
          v-if="filterPresentCount > 0"
          v-bind="props"
          class="ml-6"
          :color="globalFilterColor"
          variant="elevated"
          closable
          @click="mobile ? undefined : toggleAllFilters()"
          @click:close="resetAllFilters()">
          <template #prepend>
            <v-icon class="mr-1" @click.stop="mobile ? toggleAllFilters() : undefined">
              {{ globalFilterActive ? 'mdi-filter' : 'mdi-filter-off' }}
            </v-icon>
          </template>
          {{ t('navbar.top.active_filters.menu_label', filterActiveCount) }}
        </v-chip>
      </v-slide-x-transition>
    </template>

    <div class="d-flex flex-column flex-gap-row mt-3">
      <v-chip v-if="isTextFilterPresent" :color="textFilterColor" variant="elevated" closable @click="toggleTextFilter()" @click:close="resetTextFilter()">
        <template #prepend>
          <v-icon class="mr-1">
            {{ isTextFilterActive ? 'mdi-filter' : 'mdi-filter-off' }}
          </v-icon>
        </template>
        {{ t('navbar.top.active_filters.text', { value: textFilter }) }}
      </v-chip>

      <template v-if="isStatusFilterPresent">
        <v-chip v-if="statusFilter.length === 1" :color="singleStatusFilterColor" variant="elevated" closable @click="toggleStatusFilter()" @click:close="resetStatusFilter()">
          <template #prepend>
            <v-icon class="mr-1">
              {{ isStatusFilterActive ? 'mdi-filter' : 'mdi-filter-off' }}
            </v-icon>
          </template>
          {{ t('navbar.top.active_filters.state', { value: getTorrentStateString(statusFilter[0]) }) }}
        </v-chip>
        <v-chip v-else :color="statusFilterColor" variant="elevated" closable @click="toggleStatusFilter()" @click:close="resetStatusFilter()">
          <template #prepend>
            <v-icon class="mr-1">
              {{ isStatusFilterActive ? 'mdi-filter' : 'mdi-filter-off' }}
            </v-icon>
          </template>
          {{ t('navbar.top.active_filters.multiple_state', statusFilter.length) }}
        </v-chip>
      </template>

      <template v-if="isCategoryFilterPresent">
        <v-chip v-if="categoryFilter.length === 1" :color="categoryFilterColor" variant="elevated" closable @click="toggleCategoryFilter()" @click:close="resetCategoryFilter()">
          <template #prepend>
            <v-icon class="mr-1">
              {{ isCategoryFilterActive ? 'mdi-filter' : 'mdi-filter-off' }}
            </v-icon>
          </template>
          {{ t('navbar.top.active_filters.category', { value: categoryFilter[0] === '' ? t('navbar.side.filters.category.empty') : categoryFilter[0] }) }}
        </v-chip>
        <v-chip v-else :color="categoryFilterColor" variant="elevated" closable @click="toggleCategoryFilter()" @click:close="resetCategoryFilter()">
          <template #prepend>
            <v-icon class="mr-1">
              {{ isCategoryFilterActive ? 'mdi-filter' : 'mdi-filter-off' }}
            </v-icon>
          </template>
          {{ t('navbar.top.active_filters.multiple_category', categoryFilter.length) }}
        </v-chip>
      </template>

      <template v-if="isTagFilterPresent">
        <v-chip v-if="aggregatedTagFilters.length === 1" :color="tagFilterColor" variant="elevated" closable @click="toggleTagFilter()" @click:close="resetTagFilter()">
          <template #prepend>
            <v-icon class="mr-1">
              {{ isTagFilterActive ? (aggregatedTagFilters[0].state === FilterState.EXCLUDED ? 'mdi-filter-minus' : 'mdi-filter-plus') : 'mdi-filter-off' }}
            </v-icon>
          </template>
          {{ t('navbar.top.active_filters.tag', { value: aggregatedTagFilters[0].value === null ? t('navbar.side.filters.tag.empty') : aggregatedTagFilters[0].value }) }}
        </v-chip>
        <v-chip v-else :color="tagFilterColor" variant="elevated" closable @click="toggleTagFilter()" @click:close="resetTagFilter()">
          <template #prepend>
            <v-icon class="mr-1">
              {{ isTagFilterActive ? 'mdi-filter' : 'mdi-filter-off' }}
            </v-icon>
          </template>
          {{ t('navbar.top.active_filters.multiple_tag', aggregatedTagFilters.length) }}
        </v-chip>
      </template>

      <template v-if="isTrackerFilterPresent">
        <v-chip
          v-if="aggregatedTrackerFilters.length === 1"
          :color="trackerFilterColor"
          variant="elevated"
          closable
          @click="toggleTrackerFilter()"
          @click:close="resetTrackerFilter()">
          <template #prepend>
            <v-icon class="mr-1">
              {{ isTrackerFilterActive ? (aggregatedTrackerFilters[0].state === FilterState.EXCLUDED ? 'mdi-filter-minus' : 'mdi-filter-plus') : 'mdi-filter-off' }}
            </v-icon>
          </template>
          <span v-if="aggregatedTrackerFilters[0].value === TrackerSpecialFilter.UNTRACKED">{{
            t('navbar.top.active_filters.tracker', { value: t('navbar.side.filters.tracker.empty') })
          }}</span>
          <span v-else-if="aggregatedTrackerFilters[0].value === TrackerSpecialFilter.NOT_WORKING">{{
            t('navbar.top.active_filters.tracker', { value: t('navbar.side.filters.tracker.not_working') })
          }}</span>
          <span v-else>{{ t('navbar.top.active_filters.tracker', { value: aggregatedTrackerFilters[0].value }) }}</span>
        </v-chip>
        <v-chip v-else :color="trackerFilterColor" variant="elevated" closable @click:close="resetTrackerFilter()">
          <template #prepend>
            <v-icon class="mr-1">
              {{ isTrackerFilterActive ? 'mdi-filter' : 'mdi-filter-off' }}
            </v-icon>
          </template>
          {{ t('navbar.top.active_filters.multiple_tracker', aggregatedTrackerFilters.length) }}
        </v-chip>
      </template>
    </div>
  </v-menu>
</template>
