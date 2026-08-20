import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { computed, defineAsyncComponent, shallowRef, triggerRef } from 'vue'
import type { Component } from 'vue'
import { ComponentProps } from 'vue-component-type-helpers'
import type ConfirmDialog from '@/components/Dialogs/Confirm/ConfirmDialog.vue'
import type ConfirmListDialog from '@/components/Dialogs/Confirm/ConfirmListDialog.vue'

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
      onClose,
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
    createDialog(
      defineAsyncComponent(() => import('@/components/Dialogs/Confirm/ConfirmDialog.vue')),
      props
    )
  }

  function confirmListAction(props: Omit<ComponentProps<typeof ConfirmListDialog>, 'guid'>) {
    createDialog(
      defineAsyncComponent(() => import('@/components/Dialogs/Confirm/ConfirmListDialog.vue')),
      props
    )
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
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDialogStore, import.meta.hot))
}
