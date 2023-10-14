import { useNavbarStore } from '@/stores/navbar.ts'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { AllowedComponentProps, Component, computed, shallowRef, triggerRef, VNodeProps } from 'vue'

type ComponentProps<C extends Component> = C extends new (...args: any) => any ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps> : never

type DialogTemplate<C extends Component> = {
  component: C
  props: ComponentProps<C>
  guid: string
}

export const useDialogStore = defineStore('dialogs', () => {
  const dialogs = shallowRef<DialogTemplate<any>[]>([])

  const hasActiveDialog = computed(() => dialogs.value.length > 1 || useNavbarStore().addTorrentDialogVisible)

  function isDialogOpened(guid: string) {
    return !!dialogs.value.find(dialog => dialog.guid === guid)
  }

  function createDialog<C extends Component>(component: C, props?: Omit<ComponentProps<C>, 'guid'>) {
    const guid = uuidv4()
    const template = {
      component,
      props: props || {},
      guid
    }

    dialogs.value.push(template)
    triggerRef(dialogs)

    return guid
  }

  function deleteDialog(guid: string) {
    dialogs.value = dialogs.value.filter(dialog => dialog.guid !== guid)
    triggerRef(dialogs)
  }

  return { dialogs, hasActiveDialog, isDialogOpened, createDialog, deleteDialog }
})
