<script setup lang="ts">
import { FilterState } from '@/constants/qbit'
import { useDashboardStore } from '@/stores/dashboard'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const dashboardStore = useDashboardStore()

const isTextFilterActive = computed(() => dashboardStore.searchFilter?.length > 0)
const isStatusFilterActive = computed(() => dashboardStore.sortOptions.statusFilter !== FilterState.ALL)
const isCategoryFilterActive = computed(() => dashboardStore.sortOptions.categoryFilter !== null)
const isTagFilterActive = computed(() => dashboardStore.sortOptions.tagFilter !== null)
const isTrackerFilterActive = computed(() => dashboardStore.sortOptions.trackerFilter !== null)

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
      <v-chip v-if="isStatusFilterActive" variant="elevated" :color="'state-' + dashboardStore.sortOptions.statusFilter">
        {{ t('navbar.top.active_filters.status', { value: t(`constants.filterStatus.${dashboardStore.sortOptions.statusFilter}`) }) }}
      </v-chip>
      <v-chip v-if="isCategoryFilterActive" variant="elevated" color="category">
        {{
          t('navbar.top.active_filters.category', {
            value: dashboardStore.sortOptions.categoryFilter === '' ? t('navbar.side.filters.uncategorized') : dashboardStore.sortOptions.categoryFilter
          })
        }}
      </v-chip>
      <v-chip v-if="isTagFilterActive" variant="elevated" color="tag">
        {{ t('navbar.top.active_filters.tag', { value: dashboardStore.sortOptions.tagFilter === '' ? t('navbar.side.filters.untagged') : dashboardStore.sortOptions.tagFilter }) }}
      </v-chip>
      <v-chip v-if="isTrackerFilterActive" variant="elevated" color="tracker">
        {{ t('navbar.top.active_filters.tracker', { value: dashboardStore.sortOptions.trackerFilter }) }}
      </v-chip>
    </div>
  </v-menu>
</template>

<style scoped>
.gap {
  gap: 8px;
}
</style>
