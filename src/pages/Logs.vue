<script setup lang="ts">
import { LogType } from '@/constants/qbit'
import { useLogStore, useVueTorrentStore } from '@/stores'
import { Log } from '@/types/qbit/models'
import dayjs from 'dayjs'
import { computed, onBeforeMount, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()

const logStore = useLogStore()
const vueTorrentStore = useVueTorrentStore()

const headers = ref([
  { title: t('logs.table.id'), key: 'id', sortable: true },
  { title: t('logs.table.type'), key: 'type', sortable: true },
  { title: t('logs.table.message'), key: 'message', sortable: true },
  { title: t('logs.table.timestamp'), key: 'timestamp', sortable: true }
])
const logTypeOptions = ref([
  { title: LogType[LogType.NORMAL], value: LogType.NORMAL },
  { title: LogType[LogType.INFO], value: LogType.INFO },
  { title: LogType[LogType.WARNING], value: LogType.WARNING },
  { title: LogType[LogType.CRITICAL], value: LogType.CRITICAL }
])
const logTypeFilter = ref<LogType[]>([LogType.NORMAL, LogType.INFO, LogType.WARNING, LogType.CRITICAL])
const sortBy = ref<{ key: string; order?: 'asc' | 'desc' }[]>([{ key: 'id', order: 'desc' }])
const timer = ref<NodeJS.Timeout>()

const logs = computed(() => logStore.logs)
const filteredLogs = computed(() => logs.value.filter(log => logTypeFilter.value.includes(log.type)))
const someTypesSelected = computed(() => logTypeFilter.value.length > 0)
const allTypesSelected = computed(() => logTypeFilter.value.length === logTypeOptions.value.length)

const goHome = () => {
  router.push({ name: 'dashboard' })
}
const getLogTypeClassName = (log: Log) => {
  return `logtype-${LogType[log.type].toLowerCase()}`
}
const getLogTypeName = (log: Log) => {
  return LogType[log.type]
}
const formatLogTimestamp = (log: Log) => {
  return dayjs(log.timestamp * 1000).format(vueTorrentStore.dateFormat)
}
const toggleSelectAll = () => {
  if (logTypeFilter.value.length === logTypeOptions.value.length) {
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
  timer.value = setInterval(() => logStore.fetchLogs(), 15000)
  logStore.fetchLogs(-1)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboardShortcut)
  clearInterval(timer.value)
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
          <v-btn icon="mdi-home" variant="plain" @click="goHome" />
        </div>
      </v-col>
    </v-row>

    <v-list>
      <v-data-table
        :headers="headers"
        :items="filteredLogs"
        :footer-props="{ itemsPerPageOptions: [50, 100, 250, 500, 1000, -1] }"
        :items-per-page="50"
        item-value="id"
        multi-sort
        :sort-by="sortBy"
      >
        <template v-slot:top>
          <div class="mx-4 mb-5">
            <v-select v-model="logTypeFilter" :items="logTypeOptions" :label="$t('logs.filters.type')" multiple chips>
              <template v-slot:prepend-item>
                <v-list-item :title="$t('common.selectAll')" @click="toggleSelectAll">
                  <template v-slot:prepend>
                    <v-checkbox-btn :indeterminate="someTypesSelected && !allTypesSelected" :model-value="someTypesSelected" />
                  </template>
                </v-list-item>
                <v-divider />
              </template>
            </v-select>
          </div>
          <v-divider />
        </template>
        <template v-slot:[`item.id`]="{ item }">
          <span :class="getLogTypeClassName(item.raw)">{{ item.raw.id }}</span>
        </template>
        <template v-slot:[`item.type`]="{ item }">
          <span :class="getLogTypeClassName(item.raw)">{{ getLogTypeName(item.raw) }}</span>
        </template>
        <template v-slot:[`item.message`]="{ item }">
          <span :class="getLogTypeClassName(item.raw)">{{ item.raw.message }}</span>
        </template>
        <template v-slot:[`item.timestamp`]="{ item }">
          <span :class="getLogTypeClassName(item.raw)">{{ formatLogTimestamp(item.raw) }}</span>
        </template>
      </v-data-table>
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
