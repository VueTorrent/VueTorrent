import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

type History = Record<string, string[]>

export const useHistoryStore = defineStore('history', () => {
  const _history = reactive<History>({})
  const historySize = ref(3)

  function pushValueToHistory(key: string, value: string) {
    const historyValue = getHistory(key)
    historyValue.splice(0, 0, value)

    const valueIndex = historyValue.indexOf(value, 1)
    if (valueIndex !== -1) {
      historyValue.splice(valueIndex, 1)
    }

    if (historyValue.length > historySize.value) {
      historyValue.splice(historySize.value, historyValue.length - historySize.value)
    }
  }

  function getHistory(key: string) {
    return _history[key] || []
  }

  return {
    _history,
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