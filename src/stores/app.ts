import { qbit } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const intervals = ref<number[]>([])
  const version = ref('unknown')

  function pushInterval(callback: TimerHandler, interval?: number, ...params: any) {
    intervals.value.push(setInterval(callback, interval, ...params))
  }

  function clearIntervals() {
    intervals.value.forEach(clearInterval)
    intervals.value = []
  }

  async function fetchQbitVersion() {
    version.value = await qbit.getAppVersion()
  }

  async function toggleAlternativeMode() {
    return await qbit.toggleSpeedLimitsMode()
  }

  async function shutdownQbit() {
    return await qbit.shutdownApp()
  }

  return { intervals, version, fetchQbitVersion, pushInterval, clearIntervals, shutdownQbit, toggleAlternativeMode }
})
