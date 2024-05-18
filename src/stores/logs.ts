import qbit from '@/services/qbit'
import { Log } from '@/types/qbit/models'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useLogStore = defineStore('logs', () => {
  const _lock = ref(false)
  const logs = ref<Log[]>([])
  const externalIp = ref<string>()
  const lastFetchedIp = ref<string>()
  const geoDetails = ref<string | null>(null)
  const ispDetails = ref<string | null>(null)

  async function fetchLogs(lastId?: number) {
    if (_lock.value) return
    _lock.value = true
    let afterId
    if (lastId) {
      afterId = lastId
    } else {
      afterId = logs.value.length > 0 ? logs.value.at(-1)!.id : -1
    }

    const newLogs = await qbit.getLogs(afterId)
    logs.value.push(...newLogs)
    await extractExternalIpFromLogs(newLogs)
    _lock.value = false
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
  watch(externalIp, () => {
    fetchGeoAndIspDetails()
  })

  return {
    logs,
    externalIp,
    geoDetails,
    ispDetails,
    fetchGeoAndIspDetails,
    fetchLogs,
    cleanAndFetchLogs,
    $reset: async () => {
      while (_lock.value) {}
      logs.value = []
      externalIp.value = undefined
    }
  }
})
