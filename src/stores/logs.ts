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
    const externalIpV6 = ref<string>()
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

    const { perform: updateLogs, pause: pauseLogSync, resume: startLogSync } = useTimer(_fetchLogs, 15000, { immediate: false })

    async function _fetchLogs() {
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
        await updateLogs()
      } finally {
        cleanFetchLock.value = false
      }
    }

    function extractExternalIpFromLogs(logsToParse: Log[]) {
      // qBittorrent logs one "Detected external IP" line per address family, so keep the latest of each
      for (const log of logsToParse) {
        if (!log.message.includes('Detected external IP.')) continue

        const match = log.message.match(/IP: "(.*)"/)
        if (!match) continue

        if (match[1].includes(':')) externalIpV6.value = match[1]
        else externalIp.value = match[1]
      }
    }

    return {
      filteredLogs,
      externalIp,
      externalIpV6,
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
        externalIpV6.value = undefined
        logTypeFilter.value = [LogType.NORMAL, LogType.INFO, LogType.WARNING, LogType.CRITICAL]
        logMessageFilter.value = ''
      },
    }
  },
  {
    persist: [{ storage: localStorage, pick: ['logTypeFilter', 'logMessageFilter', 'reverseSort'] }],
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLogStore, import.meta.hot))
}
