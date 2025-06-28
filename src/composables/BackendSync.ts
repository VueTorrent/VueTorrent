import { Store } from 'pinia'
import { shallowRef } from 'vue'
import { isObjectEqual } from '@/helpers'
import { backend } from '@/services/backend'

export function useBackendSync(store: Store, key: string, config: { blacklist?: string[]; whitelist?: string[] } = {}) {
  const cancelWatcherCallback = shallowRef(() => {})
  const _lastState: Record<string, any> = shallowRef({})

  function keyMatchesFilter(k: string) {
    if (config.whitelist) {
      return config.whitelist.includes(k)
    }
    if (config.blacklist) {
      return !config.blacklist.includes(k)
    }
    return true
  }

  async function loadState() {
    const data = await backend.get(key)
    if (!data) return

    const newState = JSON.parse(data) as Record<string, any>
    const temp = {} as Record<string, any>
    Object.entries(newState).forEach(([k, v]) => {
      if (keyMatchesFilter(k)) {
        temp[k] = v
      }
    })
    store.$patch(temp)
    _lastState.value = JSON.parse(JSON.stringify(temp))
  }

  async function saveState() {
    const state = {} as Record<string, any>
    Object.entries(store.$state).forEach(([k, v]) => {
      if (keyMatchesFilter(k)) {
        state[k] = v
      }
    })

    if (!isObjectEqual(state, _lastState.value)) {
      const success = await backend.set(key, JSON.stringify(state))
      if (success) {
        _lastState.value = JSON.parse(JSON.stringify(state))
      }
    }
  }

  function registerWatcher() {
    cancelWatcherCallback.value = store.$subscribe(() => {
      void saveState()
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
