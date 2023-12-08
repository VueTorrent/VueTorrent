import { qbit } from '@/services'
import { Log } from '@/types/qbit/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLogStore = defineStore('logs', () => {
  const _lock = ref(false)
  const logs = ref<Log[]>([])
  const externalIp = ref<string>()

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
    const log = logsToParse.find(log => log.message.includes('Detected external IP. IP: '))
    if (!log) return

    const match = log?.message.match(/Detected external IP\. IP: "(.*)"/)!
    externalIp.value = match[1]
  }

  return { logs, externalIp, fetchLogs, cleanAndFetchLogs }
})
