import { computed, onUnmounted, ref } from 'vue'
import { useModalsStore } from '@/stores/modals'

export function useModal(guid: string) {
  const { removeModal } = useModalsStore()
  const _dialog = ref(true)

  onUnmounted(() => {
    removeModal(guid)
  })

  const dialog = computed({
    get() {
      return _dialog.value
    },
    set(val: boolean) {
      _dialog.value = val
      if (!val) removeModal(guid)
    }
  })

  return {
    dialog
  }
}
