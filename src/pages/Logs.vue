<script setup lang="ts">
import { useArrayPagination } from '@/composables'
import { LogType } from '@/constants/qbit'
import { useLogStore } from '@/stores/logs'
import { useVueTorrentStore } from '@/stores/vuetorrent'
import { Log } from '@/types/qbit/models'
import { useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import { computed, onBeforeMount, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()

const logStore = useLogStore()
const vueTorrentStore = useVueTorrentStore()

const headers = ref([
  { title: t('logs.filters.sortBy.id'), value: 'id' },
  { title: t('logs.filters.sortBy.type'), value: 'type' },
  { title: t('logs.filters.sortBy.message'), value: 'message' },
  { title: t('logs.filters.sortBy.timestamp'), value: 'timestamp' }
])
const logTypeOptions = ref([
  { title: LogType[LogType.NORMAL], value: LogType.NORMAL },
  { title: LogType[LogType.INFO], value: LogType.INFO },
  { title: LogType[LogType.WARNING], value: LogType.WARNING },
  { title: LogType[LogType.CRITICAL], value: LogType.CRITICAL }
])
const logTypeFilter = ref<LogType[]>([LogType.NORMAL, LogType.INFO, LogType.WARNING, LogType.CRITICAL])
const sortBy = ref(['id'])

const logs = computed(() => logStore.logs)
const filteredLogs = computed(() => logs.value.filter(log => logTypeFilter.value.includes(log.type)))
const someTypesSelected = computed(() => logTypeFilter.value.length > 0)
const allTypesSelected = computed(() => logTypeFilter.value.length === logTypeOptions.value.length)

const { paginatedResults, currentPage, pageCount } = useArrayPagination(filteredLogs, 30)

const goHome = () => {
  router.push({ name: 'dashboard' })
}
const getLogTypeClassName = (log: Log) => {
  return `logtype-${LogType[log?.type]?.toLowerCase()}`
}
const getLogTypeName = (log: Log) => {
  return LogType[log.type]
}
const formatLogTimestamp = (log: Log) => {
  return dayjs(log.timestamp * 1000).format(vueTorrentStore.dateFormat)
}
const toggleSelectAll = () => {
  if (allTypesSelected.value) {
    logTypeFilter.value = []
  } else {
    logTypeFilter.value = logTypeOptions.value.map(option => option.value)
  }
}
const handleKeyboardShortcut = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    goHome()
  }
}

onBeforeMount(() => {
  document.addEventListener('keydown', handleKeyboardShortcut)
  useIntervalFn(() => logStore.fetchLogs(), 15000)
  logStore.fetchLogs(-1)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboardShortcut)
})
</script>

<template>
  <div class="pa-3">
    <v-row no-gutters align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
          {{ t('logs.title') }}
        </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn icon="mdi-close" variant="plain" @click="goHome" />
        </div>
      </v-col>
    </v-row>

    <v-list>
      <v-list-item>
        <v-row>
          <v-col cols="6">
            <v-select v-model="logTypeFilter" :items="logTypeOptions" :label="$t('logs.filters.type')" hide-details multiple chips>
              <template v-slot:prepend-item>
                <v-list-item :title="$t('common.selectAll')" @click="toggleSelectAll">
                  <template v-slot:prepend>
                    <v-checkbox-btn :indeterminate="someTypesSelected && !allTypesSelected" :model-value="someTypesSelected" />
                  </template>
                </v-list-item>
                <v-divider />
              </template>
            </v-select>
          </v-col>

          <v-col cols="6">
            <v-select v-model="sortBy" :items="headers" :label="$t('logs.filters.sortBy.label')" hide-details multiple chips />
          </v-col>
        </v-row>
      </v-list-item>

      <v-divider class="my-3" thickness="5" />

      <v-list-item v-if="pageCount > 1">
        <v-pagination v-model="currentPage" :length="pageCount" prev-icon="mdi-menu-left" next-icon="mdi-menu-right" />
      </v-list-item>

      <v-divider />

      <template v-for="(log, index) in paginatedResults">
        <v-divider v-if="index > 0" />

        <v-list-item :class="getLogTypeClassName(log)">
          <v-list-item-title>{{ log.id }}) {{ log.message }}</v-list-item-title>
          <v-list-item-subtitle>{{ getLogTypeName(log) }} | {{ formatLogTimestamp(log) }}</v-list-item-subtitle>
        </v-list-item>
      </template>

      <v-list-item v-if="filteredLogs.length === 0">
        {{ $t('logs.emptyLogList') }}
      </v-list-item>

      <v-divider />

      <v-list-item v-if="pageCount > 1">
        <v-pagination v-model="currentPage" :length="pageCount" prev-icon="mdi-menu-left" next-icon="mdi-menu-right" />
      </v-list-item>
    </v-list>
  </div>
</template>

<style lang="scss" scoped>
.v-theme--darkTheme {
  .logtype-normal {
    color: white !important;
  }

  .logtype-info {
    color: grey !important;
  }

  .logtype-warning {
    color: darkgoldenrod !important;
  }

  .logtype-critical {
    color: lighten(darkred, 12) !important;
  }
}

.v-theme--lightTheme {
  .logtype-normal {
    color: black !important;
  }

  .logtype-info {
    color: grey !important;
  }

  .logtype-warning {
    color: goldenrod !important;
  }

  .logtype-critical {
    color: red !important;
  }
}
</style>
