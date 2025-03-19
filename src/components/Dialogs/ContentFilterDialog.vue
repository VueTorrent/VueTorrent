<script setup lang="ts">
import { useDialog, useI18nUtils } from '@/composables'
import { FilePriority } from '@/constants/qbit'
import { FileType } from '@/constants/vuetorrent'
import { comparators, formatData, getExtType, splitExt } from '@/helpers'
import { useContentStore, useVueTorrentStore } from '@/stores'
import { computed, reactive } from 'vue'

const props = defineProps<{
  guid: string
}>()

const { t } = useI18nUtils()
const { isOpened } = useDialog(props.guid)
const contentStore = useContentStore()
const vuetorrentStore = useVueTorrentStore()

const sizeBoundaries = computed<[number, number]>(() =>
  contentStore.cachedFiles
    .map(file => file.size)
    .reduce((prev, curr) => [prev[0] === -1 || curr < prev[0] ? curr : prev[0], prev[1] === -1 || curr > prev[1] ? curr : prev[1]], [-1, -1])
)

const fileExtensionsByType = computed(() =>
  new Set<string>([{ name: '1.mp4' }, { name: '1.iso' }, { name: '1.avi' }, { name: '1.mp3' }].map(file => splitExt(file.name)[1])).values().reduce(
    (prev, ext) => {
      const type = getExtType(ext)
      if (Object.keys(prev).includes(type)) {
        prev[type].push(ext)
      } else {
        prev[type] = [ext]
      }
      return prev
    },
    {} as Record<FileType, string[]>
  )
)
const extensionItems = computed(() =>
  Object.entries(fileExtensionsByType.value)
    .sort(([typeA, _1], [typeB, _2]) => {
      if (typeA === FileType.UNKNOWN) return 1
      if (typeB === FileType.UNKNOWN) return -1
      return comparators.text.asc(typeA, typeB)
    })
    .flatMap(([type, extensions]) => [
      { props: { header: t(`constants.file_type.${type}`) } },
      ...extensions.map(ext => ({ title: `.${ext}`, value: ext })),
      { props: { divider: true } }
    ])
)

const priorityOptions = [
  {
    title: t('constants.file_priority.unwanted'),
    value: FilePriority.DO_NOT_DOWNLOAD
  },
  {
    title: t('constants.file_priority.normal'),
    value: FilePriority.NORMAL
  },
  {
    title: t('constants.file_priority.high'),
    value: FilePriority.HIGH
  },
  {
    title: t('constants.file_priority.max'),
    value: FilePriority.MAXIMAL
  }
]

const filters = reactive<{ extensions: string[]; priority: FilePriority[]; size: [number, number] }>({
  extensions: [],
  priority: [],
  size: sizeBoundaries.value
})

const filterPreview = computed(() =>
  contentStore.cachedFiles.filter(
    file =>
      (!filters.extensions.length || filters.extensions.includes(splitExt(file.name)[1])) &&
      (!filters.priority.length || filters.priority.includes(file.priority)) &&
      file.size >= filters.size[0] &&
      file.size <= filters.size[1]
  )
)
const filterPreviewSize = computed(() => filterPreview.value.reduce((prev, curr) => prev + curr.size, 0))

function exclude() {
  contentStore.setFilePriority(
    filterPreview.value.map(value => value.index),
    FilePriority.DO_NOT_DOWNLOAD
  )
  close()
}

function include() {
  // Don't change already selected files' priority
  const fileIdx = filterPreview.value.filter(file => file.priority === FilePriority.DO_NOT_DOWNLOAD).map(file => file.index)
  contentStore.setFilePriority(fileIdx, FilePriority.NORMAL)
  close()
}

function close() {
  isOpened.value = false
}
</script>

<template>
  <v-dialog v-model="isOpened" :fullscreen="$vuetify.display.mobile">
    <v-card>
      <v-card-title class="ios-margin">
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ t('torrentDetail.content.filter.title') }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="close" />
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4" class="d-flex align-center">
            {{ t('torrentDetail.content.filter.extensions') }}
          </v-col>
          <v-col cols="8">
            <v-select v-model="filters.extensions" :items="extensionItems" :placeholder="t('common.disabled')" persistent-placeholder multiple hide-details>
              <template #item="data">
                <v-list-subheader v-if="data.props.header">
                  {{ data.props.header }}
                </v-list-subheader>
                <v-divider v-else-if="data.props.divider" />
                <v-list-item v-else v-bind="data.props" />
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="d-flex align-center">
            {{ t('torrentDetail.content.filter.priority') }}
          </v-col>
          <v-col cols="8">
            <v-select v-model="filters.priority" :items="priorityOptions" :placeholder="t('common.disabled')" persistent-placeholder multiple hide-details />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="d-flex align-center">
            {{ t('torrentDetail.content.filter.size') }}
          </v-col>
          <v-col cols="8">
            <v-range-slider
              v-model="filters.size"
              :direction="$vuetify.display.mobile ? 'vertical' : 'horizontal'"
              color="primary"
              :disabled="sizeBoundaries[0] === sizeBoundaries[1]"
              :min="sizeBoundaries[0]"
              :max="sizeBoundaries[1]"
              :step="1"
              density="compact"
              thumb-label="always"
              hide-details>
              <template v-slot:thumb-label="{ modelValue }">
                <div style="white-space: nowrap">
                  {{ formatData(modelValue, vuetorrentStore.useBinarySize) }}
                </div>
              </template>
              <template v-slot:prepend>
                <v-text-field v-model="filters.size[0]" hide-spin-buttons density="compact" style="width: 130px" type="number" variant="outlined" hide-details single-line />
              </template>
              <template v-slot:append>
                <v-text-field v-model="filters.size[1]" hide-spin-buttons density="compact" style="width: 130px" type="number" variant="outlined" hide-details single-line />
              </template>
            </v-range-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            {{
              t('torrentDetail.content.filter.preview', {
                count: filterPreview.length,
                total: contentStore.cachedFiles.length,
                size: formatData(filterPreviewSize, vuetorrentStore.useBinarySize)
              })
            }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="exclude">{{ t('torrentDetail.content.filter.exclude') }}</v-btn>
        <v-btn color="success" @click="include">{{ t('torrentDetail.content.filter.include') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
