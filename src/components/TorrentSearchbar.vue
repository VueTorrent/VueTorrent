<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18nUtils } from '@/composables'
import { useTorrentStore } from '@/stores'

const { t } = useI18nUtils()
const { textFilter, isQueryRegexMatch } = storeToRefs(useTorrentStore())

const searchIcon = computed(() => (isQueryRegexMatch.value ? 'mdi-regex' : 'mdi-magnify'))
</script>

<template>
  <v-text-field
    id="searchInput"
    v-model="textFilter"
    :label="t('common.search')"
    clearable
    density="compact"
    single-line
    hide-details
    :prepend-inner-icon="searchIcon"
    variant="solo"
    base-color="white"
    @click:clear="textFilter = ''" />
</template>

<style scoped>
/*
 * Safari workaround: explicitly set min-width: 0 on v-text-field
 * to allow the input to shrink correctly inside flex containers
 * such as v-app-bar. Flex and grid items can have a content-based
 * automatic minimum width; min-width: 0 overrides that minimum.
 *
 * References:
 * https://bugs.webkit.org/show_bug.cgi?id=150024
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-width
 */
.v-text-field {
  min-width: 0;
}
</style>
