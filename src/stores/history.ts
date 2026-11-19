import { useLocalStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, watch } from 'vue'
import { HistoryKey } from '@/constants/vuetorrent'

type History = Partial<Record<HistoryKey, string[]>>
const saveHistoryKey = 'vuetorrent_saveFieldHistory'

export const useHistoryStore = defineStore('history', () => {
  const saveFieldHistory = useLocalStorage(saveHistoryKey, true, { flush: 'sync', writeDefaults: false })
  const saved = useLocalStorage<{ _history: History; historySize: number }>(
    'vuetorrent_history',
    { _history: {}, historySize: 3 },
    {
      flush: 'sync',
      listenToStorageChanges: false,
      mergeDefaults: true,
      writeDefaults: false,
    }
  )
  const historySize = computed({
    get: () => saved.value.historySize,
    set: (size: number) => {
      saved.value = { historySize: size, _history: canSaveHistory() ? saved.value._history : {} }
    },
  })

  function clearHistory() {
    saved.value._history = {}
  }

  watch(
    saveFieldHistory,
    enabled => {
      if (!enabled) clearHistory()
    },
    { immediate: true, flush: 'sync' }
  )

  function canSaveHistory() {
    if (!saveFieldHistory.value) return false
    // A submit can finish before the storage event from another tab arrives.
    try {
      return localStorage.getItem(saveHistoryKey) !== 'false'
    } catch {
      return false
    }
  }

  function pushValueToHistory(key: HistoryKey, value: string) {
    if (!value || !canSaveHistory()) return

    const previous = saved.value._history[key] || []
    saved.value._history[key] = [value, ...previous.filter(item => item !== value)].slice(0, historySize.value)
  }

  function getHistory(key: HistoryKey) {
    return canSaveHistory() ? saved.value._history[key] || [] : []
  }

  return { historySize, saveFieldHistory, pushValueToHistory, getHistory, $reset: clearHistory }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHistoryStore, import.meta.hot))
}
