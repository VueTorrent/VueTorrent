import { backend } from '@/services/backend'
import { Store } from 'pinia'
import { ref } from 'vue'

export function useBackendSync(store: Store, key: string, config: { blacklist?: string[]; whitelist?: string[] } = {}) {
  let cancelWatcherCallback = ref(() => {})

  function keyMatchesFilter(k: string) {
    return config.whitelist?.includes(k) || !config.blacklist?.includes(k)
  }

  async function loadState() {
    const data = await backend.get(key)
    if (data) {
      const newState = JSON.parse(data) as Record<string, any>
      const temp = {} as Record<string, any>
      Object.entries(newState).forEach(([k, v]) => {
        if (keyMatchesFilter(k)) {
          temp[k] = v
        }
      })
      store.$patch(temp)
    }
  }

  async function saveState() {
    const state = {} as Record<string, any>
    Object.entries(store.$state).forEach(([k, v]) => {
      if (keyMatchesFilter(k)) {
        state[k] = v
      }
    })

    await backend.set(key, JSON.stringify(state))
  }

  function registerWatcher() {
    cancelWatcherCallback.value = store.$subscribe(() => {
      saveState()
    })
  }

  function cancelWatcher() {
    cancelWatcherCallback.value()
  }

  return {
    loadState,
    saveState,
    registerWatcher,
    cancelWatcher
  }
}
