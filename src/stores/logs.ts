import toSorted from 'array.prototype.tosorted'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useTask } from 'vue-concurrency'
import { useArrayPagination, useSearchQuery } from '@/composables'
import { LogType } from '@/constants/qbit'
import { comparators } from '@/helpers'
import qbit from '@/services/qbit'
import { Log } from '@/types/qbit/models'

export const useLogStore = defineStore(
  'logs',
  () => {
    const logs = ref<Log[]>([])
    const externalIp = ref<string>()
    const reverseSort = ref<boolean>(false)
    const logTypeFilter = ref<LogType[]>([LogType.NORMAL, LogType.INFO, LogType.WARNING, LogType.CRITICAL])
    const logMessageFilter = ref('')
    const cleanFetchLock = ref(false)

    const filteredLogsByType = computed(() => logs.value.filter(log => logTypeFilter.value.includes(log.type)))
    const { results: filteredLogs } = useSearchQuery(filteredLogsByType, logMessageFilter, log => log.message)
    const { paginatedResults, currentPage, pageCount } = useArrayPagination(
      () => toSorted(filteredLogs.value, (a, b) => comparators.numeric.compare(a.id, b.id, !reverseSort.value)),
      30
    )
    const logTask = useTask(function* (_: AbortSignal, lastId?: number) {
      yield fetchLogs(lastId)
    }).drop()

    async function fetchLogs(lastId?: number) {
      let afterId
      if (lastId) {
        afterId = lastId
      } else {
        afterId = logs.value.length > 0 ? logs.value.at(-1)!.id : -1
      }

      const newLogs = await qbit.getLogs(afterId)
      logs.value.push(...newLogs)
      extractExternalIpFromLogs(newLogs)
    }

    async function cleanAndFetchLogs() {
      if (cleanFetchLock.value) return
      cleanFetchLock.value = true
      logs.value = []
      await fetchLogs(-1)
      cleanFetchLock.value = false
    }

    function extractExternalIpFromLogs(logsToParse: Log[]) {
      const log = logsToParse.find(log => log.message.includes('Detected external IP.'))
      if (!log) return

      const match = log.message.match(/IP: "(.*)"/)
      if (match) externalIp.value = match[1]
    }

    return {
      logs,
      filteredLogs,
      externalIp,
      logTypeFilter,
      logMessageFilter,
      paginatedResults,
      currentPage,
      pageCount,
      updateLogs: logTask.perform,
      cleanAndFetchLogs,
      reverseSort,
      $reset: () => {
        logTask.clear()
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
