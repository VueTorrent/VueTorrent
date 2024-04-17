<script lang="ts" setup>
import { TorrentState } from '@/constants/qbit'
import { useMaindataStore, useTorrentStore, useVueTorrentStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { categories: _categories, tags: _tags, trackers: _trackers } = storeToRefs(useMaindataStore())
const { statusFilter, categoryFilter, tagFilter, trackerFilter } = storeToRefs(useTorrentStore())
const vueTorrentStore = useVueTorrentStore()

const statuses = computed(() => Object.values(TorrentState).map(state => ({ title: t(`torrent.state.${state}`), value: state })))
const categories = computed(() => [{ title: t('navbar.side.filters.uncategorized'), value: '' }, ..._categories.value.map(c => ({ title: c.name, value: c.name }))])
const tags = computed(() => [{ title: t('navbar.side.filters.untagged'), value: null }, ..._tags.value.map(tag => ({ title: tag, value: tag }))])
const trackers = computed(() => [{ title: t('navbar.side.filters.untracked'), value: '' }, ..._trackers.value.map(tracker => ({ title: tracker, value: tracker }))])

function selectAllStatuses() {
  statusFilter.value = []
}

function selectActive() {
  statusFilter.value = [
    TorrentState.UPLOADING,
    TorrentState.CHECKING_UP,
    TorrentState.FORCED_UP,
    TorrentState.ALLOCATING,
    TorrentState.DOWNLOADING,
    TorrentState.META_DL,
    TorrentState.FORCED_META_DL,
    TorrentState.CHECKING_DL,
    TorrentState.FORCED_DL,
    TorrentState.CHECKING_RESUME_DATA,
    TorrentState.MOVING
  ]
}

function selectAllCategories() {
  categoryFilter.value = []
}

function selectAllTags() {
  tagFilter.value = []
}

function selectAllTrackers() {
  trackerFilter.value = []
}
</script>

<template>
  <v-list class="pb-0">
    <v-list-item class="px-0 pb-3">
      <v-list-item-title class="px-0 text-uppercase white--text ml-1 font-weight-normal text-caption">
        {{ t('navbar.side.filters.state') }}
      </v-list-item-title>
      <v-select
        v-model="statusFilter"
        :items="statuses.sort((a, b) => a.title.localeCompare(b.title))"
        :placeholder="t('navbar.side.filters.disabled')"
        bg-color="secondary"
        class="text-accent pt-1"
        density="compact"
        hide-details
        multiple
        variant="solo">
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllStatuses" />
          <v-list-item :title="$t('common.active')" @click="selectActive" />
          <v-divider />
        </template>
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && statusFilter.length === 1" class="text-accent">{{ t(`torrent.state.${item.props.value}`) }}</span>
          <span v-else-if="index === 0" class="text-accent">{{ t('navbar.side.filters.activeFilter', statusFilter.length) }}</span>
        </template>
      </v-select>
    </v-list-item>

    <v-list-item class="px-0 pb-3">
      <v-list-item-title class="px-0 text-uppercase white--text ml-1 font-weight-light text-subtitle-2">
        {{ t('navbar.side.filters.category') }}
      </v-list-item-title>
      <v-select
        v-model="categoryFilter"
        :items="categories"
        :placeholder="t('navbar.side.filters.disabled')"
        bg-color="secondary"
        class="text-accent pt-1"
        density="compact"
        hide-details
        multiple
        variant="solo">
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllCategories" />
          <v-divider />
        </template>
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && categoryFilter.length === 1" class="text-accent">
            {{ item.props.title }}
          </span>
          <span v-else-if="index === 0" class="text-accent">
            {{ t('navbar.side.filters.activeFilter', categoryFilter.length) }}
          </span>
        </template>
      </v-select>
    </v-list-item>

    <v-list-item class="px-0 pb-3">
      <v-list-item-title class="px-0 text-uppercase white--text ml-1 font-weight-light text-subtitle-2">
        {{ t('navbar.side.filters.tag') }}
      </v-list-item-title>
      <v-select
        v-model="tagFilter"
        :items="tags"
        :placeholder="t('navbar.side.filters.disabled')"
        bg-color="secondary"
        class="text-accent pt-1"
        density="compact"
        hide-details
        multiple
        variant="solo">
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllTags" />
          <v-divider />
        </template>
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && tagFilter.length === 1" class="text-accent">
            {{ item.props.title }}
          </span>
          <span v-else-if="index === 0" class="text-accent">
            {{ t('navbar.side.filters.activeFilter', tagFilter.length) }}
          </span>
        </template>
      </v-select>
    </v-list-item>

    <v-list-item v-if="vueTorrentStore.showTrackerFilter" :class="{ 'px-0': true, 'pb-3': vueTorrentStore.showTrackerFilter }">
      <v-list-item-title class="px-0 text-uppercase white--text ml-1 font-weight-light text-subtitle-2">
        {{ t('navbar.side.filters.tracker') }}
      </v-list-item-title>
      <v-select
        v-model="trackerFilter"
        :items="trackers"
        :placeholder="t('navbar.side.filters.disabled')"
        bg-color="secondary"
        class="text-accent pt-1"
        density="compact"
        hide-details
        multiple
        variant="solo">
        <template v-slot:prepend-item>
          <v-list-item :title="$t('common.disable')" @click="selectAllTrackers" />
          <v-divider />
        </template>
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0 && trackerFilter.length === 1" class="text-accent">
            {{ item.props.title }}
          </span>
          <span v-else-if="index === 0" class="text-accent">
            {{ t('navbar.side.filters.activeFilter', trackerFilter.length) }}
          </span>
        </template>
      </v-select>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
