import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { AllowedComponentProps, Component, computed, shallowRef, triggerRef, VNodeProps } from 'vue'
import ConfirmDialog from '@/components/Dialogs/Confirm/ConfirmDialog.vue'
import ConfirmListDialog from '@/components/Dialogs/Confirm/ConfirmListDialog.vue'

type ComponentProps<C extends Component> = C extends new (...args: any) => any ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps> : never

type DialogTemplate<C extends Component> = {
  component: C
  props: ComponentProps<C>
  guid: string
  onClose?: () => void
}

export const useDialogStore = defineStore('dialogs', () => {
  const dialogs = shallowRef<Map<string, DialogTemplate<any>>>(new Map())

  const hasActiveDialog = computed(() => dialogs.value.size > 0)

  function createDialog<C extends Component>(component: C, props?: Omit<ComponentProps<C>, 'guid'>, onClose?: () => void) {
    const guid = uuidv4()
    dialogs.value.set(guid, {
      component,
      props: props || {},
      guid,
      onClose
    })
    triggerRef(dialogs)

    return guid
  }

  function deleteDialog(guid: string) {
    const template = dialogs.value.get(guid)
    if (template && template.onClose) {
      template.onClose()
    }
    dialogs.value.delete(guid)
    triggerRef(dialogs)
  }

  function confirmAction(props?: Omit<ComponentProps<typeof ConfirmDialog>, 'guid'>) {
    createDialog(ConfirmDialog, props)
  }

  function confirmListAction(props: Omit<ComponentProps<typeof ConfirmListDialog>, 'guid'>) {
    createDialog(ConfirmListDialog, props)
  }

  return {
    dialogs,
    hasActiveDialog,
    createDialog,
    deleteDialog,
    confirmAction,
    confirmListAction,
    $reset: () => {
      dialogs.value.clear()
      triggerRef(dialogs)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDialogStore, import.meta.hot))
}
