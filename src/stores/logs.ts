import { qbit } from '@/services'
import { Log } from '@/types/qbit/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLogStore = defineStore('logs', () => {
  const logs = ref<Log[]>([])

  async function fetchLogs(lastId?: number) {
    let afterId
    if (lastId) {
      afterId = lastId
    } else {
      afterId = logs.value.length > 0 ? logs.value.at(-1)!.id : -1
    }

    logs.value.push(...(await qbit.getLogs(afterId)))
  }

  return {logs, fetchLogs}
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        key: 'vuetorrent_logs'
      }
    ]
  }
})