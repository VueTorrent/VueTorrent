<script setup lang="ts">
import { computed, ref } from 'vue'
import HistoryField from '@/components/Core/HistoryField.vue'
import { useI18nUtils } from '@/composables'
import { AppPreferences } from '@/constants/qbit'
import { HistoryKey } from '@/constants/vuetorrent'
import { useAppStore, useCategoryStore, usePreferenceStore, useTagStore } from '@/stores'
import { AddTorrentParams } from '@/types/qbit/models'

const form = defineModel<AddTorrentParams>({ required: true })

const { t } = useI18nUtils()
const appStore = useAppStore()
const categoryStore = useCategoryStore()
const preferenceStore = usePreferenceStore()
const tagStore = useTagStore()

const contentLayoutOptions = [
  { title: t('common.useGlobalSettings'), value: null },
  { title: t('constants.contentLayout.original'), value: AppPreferences.ContentLayout.ORIGINAL },
  { title: t('constants.contentLayout.subfolder'), value: AppPreferences.ContentLayout.SUBFOLDER },
  { title: t('constants.contentLayout.nosubfolder'), value: AppPreferences.ContentLayout.NO_SUBFOLDER },
]
const stopConditionOptions = [
  { title: t('common.useGlobalSettings'), value: null },
  { title: t('constants.stopCondition.none'), value: AppPreferences.StopCondition.NONE },
  { title: t('constants.stopCondition.metadataReceived'), value: AppPreferences.StopCondition.METADATA_RECEIVED },
  { title: t('constants.stopCondition.filesChecked'), value: AppPreferences.StopCondition.FILES_CHECKED },
]

const downloadPathField = ref<typeof HistoryField>()
const savePathField = ref<typeof HistoryField>()

const tagSearch = ref('')

const categorySearch = ref('')
const categoryNames = computed(() => categoryStore.categories.map(cat => cat.name))
const category = computed<string | undefined>({
  get: () => form.value.category || categorySearch.value || undefined,
  set: value => (form.value.category = value || undefined),
})

const downloadPath = computed<string | undefined>({
  get: () => form.value.download_path || undefined,
  set: value => {
    form.value.use_download_path = !!value || false
    form.value.download_path = value || undefined
  },
})

function getLimit(value?: number) {
  return !value || value === -1 ? '' : (value / 1024).toString()
}

const downloadLimit = computed({
  get: () => getLimit(form.value.download_limit),
  set: value => {
    if (!value) {
      form.value.download_limit = undefined
    } else {
      const parsedValue = parseInt(value)
      if (parsedValue > 0) {
        form.value.download_limit = parsedValue * 1024
      }
    }
  },
})

const uploadLimit = computed({
  get: () => getLimit(form.value.upload_limit),
  set: value => {
    if (!value) {
      form.value.upload_limit = undefined
    } else {
      const parsedValue = parseInt(value)
      if (parsedValue > 0) {
        form.value.upload_limit = parsedValue * 1024
      }
    }
  },
})

const ratioLimit = computed({
  get: () => form.value.ratio_limit,
  set: val => (form.value.ratio_limit = val || undefined),
})

const seedingTimeLimit = computed({
  get: () => form.value.seeding_time_limit,
  set: val => (form.value.seeding_time_limit = val || undefined),
})

const inactiveSeedingTimeLimit = computed({
  get: () => form.value.inactive_seeding_time_limit,
  set: val => (form.value.inactive_seeding_time_limit = val || undefined),
})

function onCategoryChanged() {
  const category = categoryStore.getCategoryFromName(form.value.category)
  if (category && category.savePath.length > 0) {
    form.value.save_path = category.savePath
  } else if (!category) {
    form.value.save_path = preferenceStore.preferences!.save_path
  }
}

function saveFields() {
  downloadPathField.value?.saveValueToHistory()
  savePathField.value?.saveValueToHistory()
}

defineExpose({ saveFields })
</script>

<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-combobox
        v-model="form.tags"
        v-model:search="tagSearch"
        :hide-no-data="false"
        :items="tagStore.tags"
        :label="t('dialogs.add.params.tags')"
        chips
        clearable
        hide-details
        multiple
        autocomplete="tags">
        <template #prepend>
          <v-icon color="accent"> mdi-tag </v-icon>
        </template>
        <template #no-data>
          <v-list-item>
            <v-list-item-title v-if="tagSearch?.length > 0">
              {{ t('dialogs.add.params.no_tags_match', { query: tagSearch }) }}
            </v-list-item-title>
            <v-list-item-title v-else>
              {{ t('dialogs.add.params.no_tags') }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-combobox>
    </v-col>

    <v-col cols="12" md="6">
      <v-combobox
        v-model="category"
        v-model:search="categorySearch"
        :hide-no-data="false"
        :items="categoryNames"
        :label="$t('dialogs.add.params.category')"
        clearable
        hide-details
        autocomplete="categories"
        @update:model-value="onCategoryChanged">
        <template #prepend>
          <v-icon color="accent"> mdi-label </v-icon>
        </template>
        <template #no-data>
          <v-list-item>
            <v-list-item-title v-if="categorySearch?.length > 0">
              {{ t('dialogs.add.params.no_categories_match', { query: categorySearch }) }}
            </v-list-item-title>
            <v-list-item-title v-else>
              {{ t('dialogs.add.params.no_categories') }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-combobox>
    </v-col>

    <v-col cols="12">
      <HistoryField
        ref="downloadPathField"
        v-model="downloadPath"
        :history-key="HistoryKey.TORRENT_PATH"
        :disabled="form.use_auto_tmm"
        :label="t('dialogs.add.params.download_path')"
        hide-details>
        <template #prepend>
          <v-icon color="accent"> mdi-tray-arrow-down </v-icon>
        </template>
      </HistoryField>
    </v-col>

    <v-col cols="12">
      <HistoryField
        ref="savePathField"
        v-model="form.save_path"
        :history-key="HistoryKey.TORRENT_PATH"
        :disabled="form.use_auto_tmm"
        :label="t('dialogs.add.params.save_path')"
        hide-details>
        <template #prepend>
          <v-icon color="accent"> mdi-content-save </v-icon>
        </template>
      </HistoryField>
    </v-col>

    <v-col cols="12" md="6">
      <v-select
        v-model="form.content_layout"
        :items="contentLayoutOptions"
        :label="t('constants.contentLayout.title')"
        color="accent"
        hide-details
        rounded="xl"
        variant="solo-filled" />
    </v-col>

    <v-col cols="12" md="6">
      <v-select
        v-model="form.stop_condition"
        :items="stopConditionOptions"
        :label="t('constants.stopCondition.title')"
        color="accent"
        hide-details
        rounded="xl"
        variant="solo-filled" />
    </v-col>
  </v-row>

  <v-row class="mx-3">
    <v-col cols="12" md="6">
      <v-checkbox v-model="form.stopped" :label="t('dialogs.add.params.stopped')" color="accent" density="compact" hide-details />
    </v-col>
    <v-col cols="12" md="6">
      <v-checkbox v-model="form.add_to_top_of_queue" :label="t('dialogs.add.params.add_to_top_of_queue')" color="accent" density="compact" hide-details />
    </v-col>
    <v-col cols="12" md="6">
      <v-checkbox v-model="form.skip_checking" :label="t('dialogs.add.params.skip_checking')" color="accent" density="compact" hide-details />
    </v-col>
    <v-col cols="12" md="6">
      <v-checkbox v-model="form.use_auto_tmm" :label="t('dialogs.add.params.use_auto_tmm')" color="accent" density="compact" hide-details />
    </v-col>
    <v-col v-if="appStore.isFeatureAvailable('5.1.0')" cols="12" md="6">
      <v-checkbox v-model="form.forced" :label="t('dialogs.add.params.forced')" color="accent" density="compact" hide-details />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <v-expansion-panels>
        <v-expansion-panel color="primary" :title="$t('dialogs.add.params.limit_collapse')">
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model.number="downloadLimit" :label="$t('dialogs.add.params.download_limit')" hide-details suffix="KiB/s" type="number">
                  <template #prepend>
                    <v-icon color="accent"> mdi-download </v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model.number="uploadLimit" :label="$t('dialogs.add.params.upload_limit')" hide-details suffix="KiB/s" type="number">
                  <template #prepend>
                    <v-icon color="accent"> mdi-upload </v-icon>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model.number="ratioLimit" :hint="$t('dialogs.add.params.limit_hint')" :label="$t('dialogs.add.params.ratio_limit')" type="number" />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="seedingTimeLimit"
                  :label="$t('dialogs.add.params.seeding_time_limit')"
                  :hint="$t('dialogs.add.params.limit_hint')"
                  :suffix="$t('units.minutes')"
                  type="number" />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="inactiveSeedingTimeLimit"
                  :label="$t('dialogs.add.params.inactive_seeding_time_limit')"
                  :hint="$t('dialogs.add.params.limit_hint')"
                  :suffix="$t('units.minutes')"
                  type="number" />
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>
