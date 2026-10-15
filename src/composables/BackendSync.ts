import { Store } from 'pinia'
import { shallowRef } from 'vue'
import { isObjectEqual, jsonDeserialize, jsonSerialize } from '@/helpers'
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
    if (!data) {
      return saveState()
    }

    const newState: Record<string, any> = jsonDeserialize(data)
    const temp: Record<string, any> = {}
    Object.entries(newState).forEach(([k, v]) => {
      if (keyMatchesFilter(k)) {
        temp[k] = v
      }
    })
    store.$patch(temp)
    _lastState.value = JSON.parse(JSON.stringify(temp))
  }

  async function saveState() {
    const state: Record<string, any> = {}
    Object.entries(store.$state).forEach(([k, v]) => {
      if (keyMatchesFilter(k)) {
        state[k] = v
      }
    })

    if (!isObjectEqual(state, _lastState.value)) {
      const serializedState = jsonSerialize(state)
      const success = await backend.set(key, serializedState)
      if (success) {
        _lastState.value = jsonDeserialize(serializedState)
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
    cancelWatcher,
  }
}
