<script setup lang="ts">
import { TinyColor } from '@ctrl/tinycolor'
import { useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { useI18nUtils } from '@/composables'
import { LogType } from '@/constants/qbit'
import { useLogStore, useVueTorrentStore } from '@/stores'
import { Log } from '@/types/qbit/models'

const router = useRouter()
const { t } = useI18nUtils()
const { current: currentTheme } = useTheme()

const logStore = useLogStore()
const { filteredLogs, logTypeFilter, logMessageFilter, paginatedResults, currentPage, pageCount, reverseSort } = storeToRefs(logStore)
const vueTorrentStore = useVueTorrentStore()

const colors = {
  light: {
    [LogType.NORMAL]: new TinyColor('black'),
    [LogType.INFO]: new TinyColor('blue'),
    [LogType.WARNING]: new TinyColor('orange'),
    [LogType.CRITICAL]: new TinyColor('red'),
  },
  dark: {
    [LogType.NORMAL]: new TinyColor('white'),
    [LogType.INFO]: new TinyColor('deepskyblue'),
    [LogType.WARNING]: new TinyColor('darkorange'),
    [LogType.CRITICAL]: new TinyColor('darkred').lighten(12),
  },
}

const logTypeOptions = ref([
  { title: LogType[LogType.NORMAL], value: LogType.NORMAL },
  { title: LogType[LogType.INFO], value: LogType.INFO },
  { title: LogType[LogType.WARNING], value: LogType.WARNING },
  { title: LogType[LogType.CRITICAL], value: LogType.CRITICAL },
])

const someTypesSelected = computed(() => logTypeFilter.value.length > 0)
const allTypesSelected = computed(() => logTypeFilter.value.length === logTypeOptions.value.length)

function goHome() {
  void router.push({ name: 'dashboard' })
}

function getLogTypeColor(log: Log) {
  // @ts-expect-error: Element implicitly has an any type because expression of type string can't be used to index type
  return `color: #${colors[currentTheme.value.dark ? 'dark' : 'light'][log.type].toHex()}`
}

function getLogTypeName(log: Log) {
  return LogType[log.type]
}

function formatLogTimestamp(log: Log) {
  return dayjs(log.timestamp * 1000).format(vueTorrentStore.dateFormat)
}

function toggleSelectAll() {
  if (allTypesSelected.value) {
    logTypeFilter.value = []
  } else {
    logTypeFilter.value = logTypeOptions.value.map(option => option.value)
  }
}

function handleKeyboardShortcut(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    goHome()
  }
}

onBeforeMount(async () => {
  document.addEventListener('keydown', handleKeyboardShortcut)
  await logStore.cleanAndFetchLogs()
  useIntervalFn(() => void logStore.updateLogs(), 15000)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboardShortcut)
})
</script>

<template>
  <div class="pa-3">
    <div class="d-flex align-center">
      <div class="text-headline-medium ml-2">
        {{ t('logs.title') }}
      </div>
      <v-spacer />
      <div class="d-flex justify-end">
        <v-btn :icon="reverseSort ? 'mdi-sort-descending' : 'mdi-sort-ascending'" variant="plain" @click="reverseSort = !reverseSort" />
        <v-btn icon="mdi-close" variant="plain" @click="goHome" />
      </div>
    </div>

    <v-list>
      <v-list-item>
        <v-row>
          <v-col cols="6">
            <v-select v-model="logTypeFilter" :items="logTypeOptions" :label="t('logs.filters.type')" chips hide-details multiple>
              <template #prepend-item>
                <v-list-item :title="t('common.selectAll')" @click="toggleSelectAll">
                  <template #prepend>
                    <v-checkbox-btn :indeterminate="someTypesSelected && !allTypesSelected" :model-value="someTypesSelected" />
                  </template>
                </v-list-item>
                <v-divider />
              </template>
            </v-select>
          </v-col>

          <v-col cols="6">
            <v-text-field v-model="logMessageFilter" :label="t('logs.filters.query')" clearable hide-details />
          </v-col>
        </v-row>
      </v-list-item>

      <v-divider class="my-3" thickness="5" />

      <v-list-item v-if="pageCount > 1">
        <v-pagination v-model="currentPage" :length="pageCount" prev-icon="mdi-menu-left" next-icon="mdi-menu-right" />
      </v-list-item>

      <v-divider />

      <template v-for="(log, index) in paginatedResults" :key="log.id">
        <v-divider v-if="index > 0" />

        <v-list-item class="pa-0">
          <v-expansion-panels class="p-0">
            <v-expansion-panel class="pa-0">
              <v-expansion-panel-title class="text-no-wrap" :style="getLogTypeColor(log)">
                <div class="d-flex mr-8 overflow-hidden">[{{ log.id }}] {{ log.message }}</div>
                <v-spacer />
                <div class="d-flex">
                  {{ formatLogTimestamp(log) }}
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text class="wrap-word text-select" :style="getLogTypeColor(log)">
                [{{ getLogTypeName(log) }}]
                {{ log.message }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list-item>
      </template>

      <v-list-item v-if="filteredLogs.length === 0">
        {{ t('logs.emptyLogList') }}
      </v-list-item>

      <v-divider />

      <v-list-item v-if="pageCount > 1">
        <v-pagination v-model="currentPage" :length="pageCount" prev-icon="mdi-menu-left" next-icon="mdi-menu-right" />
      </v-list-item>
    </v-list>
  </div>
</template>
