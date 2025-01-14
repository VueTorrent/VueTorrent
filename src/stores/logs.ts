import { useArrayPagination, useSearchQuery } from '@/composables'
import { LogType } from '@/constants/qbit'
import { comparators } from '@/helpers'
import qbit from '@/services/qbit'
import { Log } from '@/types/qbit/models'
import { whenever } from '@vueuse/core'
import toSorted from 'array.prototype.tosorted'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useTask } from 'vue-concurrency'
import { useVueTorrentStore } from './vuetorrent'

export const useLogStore = defineStore(
  'logs',
  () => {
    const { fetchExternalIpInfo } = storeToRefs(useVueTorrentStore())

    const logs = ref<Log[]>([])
    const externalIp = ref<string>()
    const lastFetchedIp = ref<string>()
    const geoDetails = ref<string | null>(null)
    const ispDetails = ref<string | null>(null)
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
      await extractExternalIpFromLogs(newLogs)
    }

    async function cleanAndFetchLogs() {
      if (cleanFetchLock.value) return
      cleanFetchLock.value = true
      logs.value = []
      await fetchLogs(-1)
      cleanFetchLock.value = false
    }

    async function extractExternalIpFromLogs(logsToParse: Log[]) {
      const log = logsToParse.find(log => log.message.includes('Detected external IP.'))
      if (!log) return

      const match = log.message.match(/IP: "(.*)"/)
      if (match) externalIp.value = match[1]
    }

    async function fetchGeoAndIspDetails() {
      if (!fetchExternalIpInfo.value) return

      if (externalIp.value && externalIp.value !== lastFetchedIp.value) {
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
    whenever(fetchExternalIpInfo, fetchGeoAndIspDetails)

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
      reverseSort,
      $reset: () => {
        logTask.clear()
        logs.value = []
        externalIp.value = undefined
        lastFetchedIp.value = undefined
        logTypeFilter.value = [LogType.NORMAL, LogType.INFO, LogType.WARNING, LogType.CRITICAL]
        logMessageFilter.value = ''
      }
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: localStorage, includePaths: ['logTypeFilter', 'logMessageFilter', 'reverseSort'] }]
    }
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLogStore, import.meta.hot))
}
