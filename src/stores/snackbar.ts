import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export interface SnackbarOptions {
  message: string
  actionText?: string
  action?: () => Promise<void> | void
  color?: string
  timeout?: number | false
}

export const useSnackbarStore = defineStore('snackbar', () => {
  const visible = ref(false)
  const message = ref('')
  const actionText = ref('')
  const color = ref('success')
  const timeout = ref<number | false>(8000)

  const hasAction = computed(() => actionText.value.length > 0)
  let action: SnackbarOptions['action']
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  function clearTimeoutId() {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
  }

  function hide() {
    clearTimeoutId()
    action = undefined
    visible.value = false
  }

  function show(options: SnackbarOptions) {
    clearTimeoutId()

    message.value = options.message
    actionText.value = options.actionText ?? ''
    color.value = options.color ?? 'success'
    timeout.value = options.timeout ?? 8000
    action = options.action
    visible.value = true

    if (timeout.value !== false) {
      timeoutId = setTimeout(hide, timeout.value)
    }
  }

  function showSuccess(value: string, options: Omit<SnackbarOptions, 'message' | 'color'> = {}) {
    show({ ...options, message: value, color: 'success' })
  }

  function showError(value: string, options: Omit<SnackbarOptions, 'message' | 'color'> = {}) {
    show({ ...options, message: value, color: 'error' })
  }

  async function runAction() {
    const currentAction = action
    action = undefined
    hide()

    if (currentAction) {
      await currentAction()
    }
  }

  watch(visible, value => {
    if (!value) clearTimeoutId()
  })

  return {
    visible,
    message,
    actionText,
    color,
    timeout,
    hasAction,
    show,
    showSuccess,
    showError,
    hide,
    runAction,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot))
}
