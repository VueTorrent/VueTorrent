import { useArrayPagination, useSearchQuery } from '@/composables'
import { LogType } from '@/constants/qbit'
import qbit from '@/services/qbit'
import { Log } from '@/types/qbit/models'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useTask } from 'vue-concurrency'

export const useLogStore = defineStore(
  'logs',
  () => {
    const logs = ref<Log[]>([])
    const externalIp = ref<string>()
    const lastFetchedIp = ref<string>()
    const geoDetails = ref<string | null>(null)
    const ispDetails = ref<string | null>(null)

    const logTypeFilter = ref<LogType[]>([LogType.NORMAL, LogType.INFO, LogType.WARNING, LogType.CRITICAL])
    const logMessageFilter = ref('')

    const filteredLogsByType = computed(() => logs.value.filter(log => logTypeFilter.value.includes(log.type)))
    const { results: filteredLogs } = useSearchQuery(filteredLogsByType, logMessageFilter, log => log.message)
    const { paginatedResults, currentPage, pageCount } = useArrayPagination(filteredLogs, 30)

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
      await extractExternalIpFromLogs(newLogs)
    }

    async function cleanAndFetchLogs() {
      logs.value = []
      return fetchLogs(-1)
    }

    async function extractExternalIpFromLogs(logsToParse: Log[]) {
      const log = logsToParse.find(log => log.message.includes('Detected external IP.'))
      if (!log) return

      const match = log.message.match(/IP: "(.*)"/)
      if (match) externalIp.value = match[1]
    }

    async function fetchGeoAndIspDetails() {
      if (externalIp.value !== lastFetchedIp.value) {
        try {
          // 1K requests per day
          const response = await fetch(`https://ipinfo.io/${externalIp.value}/json`)
          const data = await response.json()
          geoDetails.value = `${data.city}, ${data.region}, ${data.country}`
          ispDetails.value = data.org
          // Update the last fetched IP in the logStore
          lastFetchedIp.value = externalIp.value
        } catch (error) {
          console.error('Error fetching geo & ISP details:', error)
        }
      }
    }

    // Watch for changes in externalIp and fetch Geo/ISP details accordingly
    watch(externalIp, fetchGeoAndIspDetails)

    return {
      logs,
      filteredLogs,
      externalIp,
      geoDetails,
      ispDetails,
      logTypeFilter,
      logMessageFilter,
      paginatedResults,
      currentPage,
      pageCount,
      updateLogs: logTask.perform,
      cleanAndFetchLogs,
      $reset: () => {
        logTask.clear()
        logs.value = []
        externalIp.value = undefined
        logTypeFilter.value = [LogType.NORMAL, LogType.INFO, LogType.WARNING, LogType.CRITICAL]
        logMessageFilter.value = ''
      }
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: localStorage, includePaths: ['logTypeFilter', 'logMessageFilter'] }]
    }
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLogStore, import.meta.hot))
}
