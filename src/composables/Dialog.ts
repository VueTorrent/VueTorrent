import { useDialogStore } from '@/stores'
import { computed, onUnmounted, ref } from 'vue'

export function useDialog(guid: string) {
  const hndlDialog = ref(true)
  const dialogStore = useDialogStore()

  const isOpened = computed({
    get: () => hndlDialog.value,
    set: v => {
      hndlDialog.value = v
      if (!v) deleteDialog()
    }
  })

  function deleteDialog() {
    setTimeout(() => dialogStore.deleteDialog(guid), 300)
  }

  onUnmounted(deleteDialog)

  return { isOpened }
}
