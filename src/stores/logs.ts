import toSorted from 'array.prototype.tosorted'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref, shallowRef, triggerRef } from 'vue'
import { useArrayPagination, useSearchQuery, useTimer } from '@/composables'
import { LogType } from '@/constants/qbit'
import { comparators } from '@/helpers'
import qbit from '@/services/qbit'
import { Log } from '@/types/qbit/models'

export const useLogStore = defineStore(
  'logs',
  () => {
    const logs = shallowRef<Log[]>([])
    const externalIp = ref<string>()
    const reverseSort = ref(false)
    const logTypeFilter = ref<LogType[]>([LogType.NORMAL, LogType.INFO, LogType.WARNING, LogType.CRITICAL])
    const logMessageFilter = ref('')
    const cleanFetchLock = ref(false)

    const filteredLogsByType = computed(() => logs.value.filter(log => logTypeFilter.value.includes(log.type)))
    const { results: filteredLogs } = useSearchQuery(filteredLogsByType, logMessageFilter, log => log.message)
    const { paginatedResults, currentPage, pageCount } = useArrayPagination(
      () => toSorted(filteredLogs.value, (a, b) => comparators.numeric.compare(a.id, b.id, !reverseSort.value)),
      30
    )

    const { perform: updateLogs, pause: pauseLogSync, resume: startLogSync } = useTimer(fetchLogs, 15000)

    async function fetchLogs() {
      const lastId = logs.value.at(-1)?.id

      const newLogs = await qbit.getLogs(lastId)
      logs.value.push(...newLogs)
      triggerRef(logs)
      extractExternalIpFromLogs(newLogs)
    }

    async function cleanAndFetchLogs() {
      if (cleanFetchLock.value) return
      try {
        cleanFetchLock.value = true
        logs.value = []
        await fetchLogs()
      } finally {
        cleanFetchLock.value = false
      }
    }

    function extractExternalIpFromLogs(logsToParse: Log[]) {
      const log = logsToParse.find(log => log.message.includes('Detected external IP.'))
      if (!log) return

      const match = log.message.match(/IP: "(.*)"/)
      if (match) externalIp.value = match[1]
    }

    return {
      filteredLogs,
      externalIp,
      logTypeFilter,
      logMessageFilter,
      paginatedResults,
      currentPage,
      pageCount,
      updateLogs,
      pauseLogSync,
      startLogSync,
      cleanAndFetchLogs,
      reverseSort,
      $reset: () => {
        pauseLogSync()
        logs.value = []
        externalIp.value = undefined
        logTypeFilter.value = [LogType.NORMAL, LogType.INFO, LogType.WARNING, LogType.CRITICAL]
        logMessageFilter.value = ''
      },
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: localStorage, includePaths: ['logTypeFilter', 'logMessageFilter', 'reverseSort'] }],
    },
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLogStore, import.meta.hot))
}
