import { ref } from 'vue'
import { defineStore } from 'pinia'
import { qbit } from '@/services'

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

  async function updateQbitVersion() {
    version.value = await qbit.getAppVersion()
  }

  return { intervals, version, updateQbitVersion, pushInterval, clearIntervals }
})