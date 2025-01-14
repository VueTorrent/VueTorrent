<script setup lang="ts">

import HistoryField from '@/components/Core/HistoryField.vue'
import { useI18nUtils } from '@/composables'
import { ApplyTo, HistoryKey } from '@/constants/vuetorrent'
import { openLink } from '@/helpers'
import { useContentStore } from '@/stores'
import { computed, ref } from 'vue'

const regexpEl = ref<typeof HistoryField>()
const targetEl = ref<typeof HistoryField>()
const regexpInput = ref('')
const targetInput = ref('')

const { t } = useI18nUtils()
const contentStore = useContentStore()

const useRegex = computed({
  get: () => contentStore.bulkRenameConfig.useRegex,
  set: (v: boolean) => (contentStore.bulkRenameConfig.useRegex = v)
})
const matchAll = computed({
  get: () => contentStore.bulkRenameConfig.matchAll,
  set: (v: boolean) => (contentStore.bulkRenameConfig.matchAll = v)
})
const caseSensitive = computed({
  get: () => contentStore.bulkRenameConfig.caseSensitive,
  set: (v: boolean) => (contentStore.bulkRenameConfig.caseSensitive = v)
})
const applyTo = computed({
  get: () => contentStore.bulkRenameConfig.applyTo,
  set: (v: ApplyTo) => (contentStore.bulkRenameConfig.applyTo = v)
})
const includeFiles = computed({
  get: () => contentStore.bulkRenameConfig.includeFiles,
  set: (v: boolean) => (contentStore.bulkRenameConfig.includeFiles = v)
})
const includeFolders = computed({
  get: () => contentStore.bulkRenameConfig.includeFolders,
  set: (v: boolean) => (contentStore.bulkRenameConfig.includeFolders = v)
})
const includeChildren = computed({
  get: () => contentStore.bulkRenameConfig.includeChildren,
  set: (v: boolean) => (contentStore.bulkRenameConfig.includeChildren = v)
})

const rules = [(v: string) => !!v]

const applyToOptions = [
  { title: t('constants.apply_to.filename'), value: ApplyTo.FILENAME },
  { title: t('constants.apply_to.extension'), value: ApplyTo.EXTENSION },
  { title: t('constants.apply_to.both'), value: ApplyTo.BOTH },
]
</script>

<template>
  <v-list>
    <v-list-item>
      <HistoryField
        v-model="regexpInput"
        ref="regexpEl"
        :historyKey="HistoryKey.BULK_RENAME_REGEXP"
        hide-details
        :rules="rules"
        :label="t('dialogs.bulkRenameFiles.config.source')"
        append-inner-icon="mdi-help-circle"
        @click:append-inner="openLink('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="useRegex" hide-details :label="t('dialogs.bulkRenameFiles.config.use_regex')" />
    </v-list-item>
    <v-list-item>
      <v-checkbox v-model="matchAll" hide-details :label="t('dialogs.bulkRenameFiles.config.match_all')" />
    </v-list-item>
    <v-list-item>
      <v-checkbox v-model="caseSensitive" hide-details :label="t('dialogs.bulkRenameFiles.config.case_sensitive')" />
    </v-list-item>

    <v-list-item>
      <HistoryField
        v-model="targetInput"
        ref="targetEl"
        :historyKey="HistoryKey.BULK_RENAME_TARGET"
        hide-details
        :label="t('dialogs.bulkRenameFiles.config.target')" />
    </v-list-item>

    <v-list-subheader :title="t('dialogs.bulkRenameFiles.config.apply_to.subheader')" />

    <v-list-item>
      <div class="d-flex gc-3">
        <v-select v-model="applyTo" :items="applyToOptions" :label="t('dialogs.bulkRenameFiles.config.apply_to.extension')" />
        <v-tooltip :text="t('dialogs.bulkRenameFiles.config.apply_to.files')" location="top">
          <template #activator="{ props }">
            <v-btn v-bind="props"
                   :color="includeFiles ? 'accent' : undefined"
                   variant="tonal"
                   icon="mdi-file"
                   @click="includeFiles = !includeFiles" />
          </template>
        </v-tooltip>

        <v-tooltip :text="t('dialogs.bulkRenameFiles.config.apply_to.folders')" location="top">
          <template #activator="{ props }">
            <v-btn v-bind="props"
                   :color="includeFolders ? 'accent' : undefined"
                   variant="tonal"
                   icon="mdi-folder"
                   @click="includeFolders = !includeFolders" />
          </template>
        </v-tooltip>

        <v-tooltip :text="t('dialogs.bulkRenameFiles.config.apply_to.children')" location="top">
          <template #activator="{ props }">
            <v-btn v-bind="props"
                   :color="includeChildren ? 'accent' : undefined"
                   variant="tonal"
                   icon="mdi-file-tree"
                   @click="includeChildren = !includeChildren" />
          </template>
        </v-tooltip>
      </div>
    </v-list-item>
  </v-list>
</template>
