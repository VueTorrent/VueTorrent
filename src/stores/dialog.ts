import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { AllowedComponentProps, Component, computed, shallowRef, triggerRef, VNodeProps } from 'vue'

type ComponentProps<C extends Component> = C extends new (...args: any) => any ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps> : never

type DialogTemplate<C extends Component> = {
  component: C
  props: ComponentProps<C>
  guid: string
  onClose?: () => any | Promise<any>
}

export const useDialogStore = defineStore('dialogs', () => {
  const dialogs = shallowRef<Map<string, DialogTemplate<any>>>(new Map())

  const hasActiveDialog = computed(() => dialogs.value.size > 0)

  function isDialogOpened(guid: string) {
    return dialogs.value.has(guid)
  }

  function createDialog<C extends Component>(component: C, props?: Omit<ComponentProps<C>, 'guid'>, onClose?: () => any | Promise<any>) {
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

  return {
    dialogs,
    hasActiveDialog,
    isDialogOpened,
    createDialog,
    deleteDialog,
    $reset: () => {
      dialogs.value.clear()
      triggerRef(dialogs)
    }
  }
})
