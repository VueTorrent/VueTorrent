import { defineAsyncComponent } from 'vue'
import { toast } from 'vue3-toastify'
import { useI18nUtils } from './i18n'
import { useDialogStore } from '@/stores'

export function useClipboard() {
  const { t } = useI18nUtils()
  const dialogStore = useDialogStore()

  function openLegacyCopyDialog(value: string) {
    dialogStore.createDialog(
      defineAsyncComponent(() => import('@/components/Dialogs/LegacyCopyDialog.vue')),
      { value }
    )
  }

  async function copyOrOpenDialog(valueToCopy: string) {
    if (!window.isSecureContext || !navigator.clipboard) {
      openLegacyCopyDialog(valueToCopy)
      return
    }

    try {
      await navigator.clipboard.writeText(valueToCopy)
      toast.success(t('toast.copy.success'))
    } catch {
      openLegacyCopyDialog(valueToCopy)
    }
  }

  return {
    copyOrOpenDialog,
  }
}
