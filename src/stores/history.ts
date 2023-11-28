import { HistoryKey } from '@/constants/vuetorrent'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

type History = Partial<Record<HistoryKey, string[]>>

export const useHistoryStore = defineStore('history', () => {
  const _history = reactive<History>({})
  const historySize = ref(3)

  function pushValueToHistory(key: HistoryKey, value: string) {
    const historyValue = getHistory(key)
    historyValue.splice(0, 0, value)

    const valueIndex = historyValue.indexOf(value, 1)
    if (valueIndex !== -1) {
      historyValue.splice(valueIndex, 1)
    }

    if (historyValue.length > historySize.value) {
      historyValue.splice(historySize.value, historyValue.length - historySize.value)
    }

    _history[key] = historyValue
  }

  function getHistory(key: HistoryKey) {
    return _history[key] || []
  }

  return {
    _history,
    historySize,
    pushValueToHistory,
    getHistory
  }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        key: 'vuetorrent_history'
      }
    ]
  }
})