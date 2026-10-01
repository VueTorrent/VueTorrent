<script setup lang="ts">
import debounce from 'lodash.debounce'
import { computed } from 'vue'
import { useI18nUtils } from '@/composables'
import { useTorrentStore } from '@/stores'

const { t } = useI18nUtils()
const torrentStore = useTorrentStore()

function resetInput() {
  torrentStore.textFilter = ''
}

const torrentTitleFilter = computed({
  get: () => torrentStore.textFilter,
  set: debounce((newValue: string | null) => {
    torrentStore.textFilter = newValue ?? ''
  }, 300),
})
</script>

<template>
  <v-text-field
    id="searchInput"
    v-model="torrentTitleFilter"
    :label="t('common.search')"
    clearable
    density="compact"
    single-line
    hide-details
    prepend-inner-icon="mdi-magnify"
    variant="solo"
    base-color="white"
    @click:clear="resetInput()" />
</template>

<style scoped>
/* Safari fix: Vuetify 4 grid layout needs explicit min-width: 0
   on the v-text-field to prevent Safari from shrinking the input
   in flex containers (v-app-bar). This is a known WebKit issue
   where min-width: 0 isn't properly inherited by grid children. */
.v-text-field {
  min-width: 0;
}
</style>
