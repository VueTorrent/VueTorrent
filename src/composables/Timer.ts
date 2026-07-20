import { useDocumentVisibility, useIntervalFn, UseIntervalFnOptions } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { shallowRef, watch } from 'vue'
import { useTask } from 'vue-concurrency'

export function useTimer(callback: () => Promise<void> | void, interval: MaybeRefOrGetter<number>, options?: UseIntervalFnOptions) {
  const task = useTask(function* () {
    yield callback()
  }).drop()

  const { isActive, pause: _pause, resume: _resume } = useIntervalFn(() => void task.perform(), interval, options)

  const pausedByVisibility = shallowRef(false)
  const lastPauseTime = shallowRef(0)
  const documentVisibility = useDocumentVisibility()

  function pause() {
    pausedByVisibility.value = false
    _pause()
  }

  function resume() {
    pausedByVisibility.value = false
    _resume()
  }

  watch(
    documentVisibility,
    isDocumentVisible => {
      if (isActive.value && isDocumentVisible === 'hidden') {
        _pause()
        pausedByVisibility.value = true
        lastPauseTime.value = performance.now()
      } else if (pausedByVisibility.value && isDocumentVisible === 'visible') {
        _resume()
        pausedByVisibility.value = false
        if (options?.immediateCallback !== true && performance.now() - lastPauseTime.value > 30000) {
          task.perform()
        }
      }
    },
    { immediate: true }
  )

  return {
    perform: task.perform,
    isActive,
    pause,
    resume,
  }
}
