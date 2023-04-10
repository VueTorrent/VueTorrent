import { defineStore } from 'pinia'
import { useAxios } from '@/composables/useAxios'
import { useQuery } from '@tanstack/vue-query'
import type { SessionInfoResponse } from '@/types/qbit/responses'

export const useSessionInfoStore = defineStore('sessionInfo', () => {
  const stats = ref({} as SessionInfoResponse)

  const data = ref({
    dl: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    up: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  })

  const axios = useAxios()

  useQuery({
    queryKey: ['sessionInfo'],
    queryFn: async () => {
      const info = await axios.get('transfer/info').then((r) => r.data as SessionInfoResponse)
      stats.value = info
    },
    refetchInterval: 1000
  })

  watch(
    stats,
    (newStats) => {
      data.value.dl.push(newStats.dl_info_speed)
      data.value.dl.shift()
      data.value.up.push(newStats.up_info_speed)
      data.value.up.shift()
    },
    { deep: true }
  )
  return {
    stats,
    data
  }
})

export const useAllTimeInfoStore = defineStore('allTimeInfo', () => {
  const stats = ref({} as SessionInfoResponse)

  const axios = useAxios()
})
