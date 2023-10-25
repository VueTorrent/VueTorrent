<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import { useMaindataStore } from '@/stores/maindata.ts'
import { storeToRefs } from 'pinia'
import { computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const dashboardStore = useDashboardStore()
const { filters } = storeToRefs(useMaindataStore())
const { statusFilter, categoryFilter, tagFilter, trackerFilter } = toRefs(filters.value)

const isTextFilterActive = computed(() => dashboardStore.searchFilter?.length > 0)
const isStatusFilterActive = computed(() => statusFilter.value.length > 0)
const isCategoryFilterActive = computed(() => categoryFilter.value.length > 0)
const isTagFilterActive = computed(() => tagFilter.value.length > 0)
const isTrackerFilterActive = computed(() => trackerFilter.value.length > 0)

const filterCount = computed(
  () =>
    Number(isTextFilterActive.value) +
    Number(isStatusFilterActive.value) +
    Number(isCategoryFilterActive.value) +
    Number(isTagFilterActive.value) +
    Number(isTrackerFilterActive.value)
)
</script>

<template>
  <v-menu open-on-click open-on-hover open-delay="0" close-delay="0">
    <template v-slot:activator="{ props }">
      <v-slide-x-transition>
        <v-chip v-if="filterCount > 0" v-bind="props" class="ml-6" color="primary" variant="elevated">
          {{ t('navbar.top.active_filters.menu_label', filterCount) }}
        </v-chip>
      </v-slide-x-transition>
    </template>

    <div class="d-flex flex-column gap mt-3">
      <v-chip v-if="isTextFilterActive" variant="elevated" color="grey">
        {{ t('navbar.top.active_filters.text', { value: dashboardStore.searchFilter }) }}
      </v-chip>

      <v-chip v-if="isStatusFilterActive && statusFilter.length === 1" :color="'torrent-' + statusFilter[0]" variant="elevated">
        {{ t('navbar.top.active_filters.state', { value: t(`torrent.state.${ statusFilter[0] }`) }) }}
      </v-chip>
      <v-chip v-else-if="isStatusFilterActive" variant="elevated">
        {{ dashboardStore.sortOptions.statusFilter.length }} state filters active
      </v-chip>

      <v-chip v-if="isCategoryFilterActive && categoryFilter.length === 1" color="category" variant="elevated">
        {{
          t('navbar.top.active_filters.category', {
            value: dashboardStore.sortOptions.categoryFilter[0] === '' ? t('navbar.side.filters.uncategorized') : dashboardStore.sortOptions.categoryFilter[0]
          })
        }}
      </v-chip>
      <v-chip v-else-if="isCategoryFilterActive" variant="elevated" color="category">
        {{ dashboardStore.sortOptions.categoryFilter.length }} category filters active
      </v-chip>

      <v-chip v-if="isTagFilterActive && tagFilter.length === 1" color="tag" variant="elevated">
        {{
          t('navbar.top.active_filters.tag', { value: tagFilter[0] === null ? t('navbar.side.filters.untagged') : tagFilter[0] })
        }}
      </v-chip>
      <v-chip v-else-if="isTagFilterActive" variant="elevated" color="tag">
        {{ dashboardStore.sortOptions.tagFilter.length }} tag filters active
      </v-chip>

      <v-chip v-if="isTrackerFilterActive && trackerFilter.length === 1" color="tracker" variant="elevated">
        {{
          t('navbar.top.active_filters.tracker', { value: trackerFilter[0] === '' ? t('navbar.side.filters.untracked') : trackerFilter[0] })
        }}
      </v-chip>
      <v-chip v-else-if="isTrackerFilterActive" variant="elevated" color="tracker">
        {{ dashboardStore.sortOptions.trackerFilter.length }} tracker filters active
      </v-chip>
    </div>
  </v-menu>
</template>

<style scoped>
.gap {
  gap: 8px;
}
</style>
