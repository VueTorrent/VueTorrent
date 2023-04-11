import { defineStore } from 'pinia'
import type { SessionInfoResponse } from '@/types/qbit/responses'
import { useSessionInfo } from '@/composables/api/info'

export const useSessionInfoStore = defineStore('sessionInfo', () => {
  const stats = ref({} as SessionInfoResponse)

  const data = ref({
    dl: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    up: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  })

  const { data: sessionInfo } = useSessionInfo()

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
})
