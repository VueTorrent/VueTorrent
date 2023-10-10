import { useNavbarStore } from '@/stores/navbar.ts'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { computed, ref } from 'vue'

type DialogTemplate = {
  component: string
  props: Object
  guid: string
}

export const useDialogStore = defineStore('dialogs',
  () => {
    const dialogs = ref<DialogTemplate[]>([])

    const isVisibleDialogs = computed(() => dialogs.value.length > 1 || useNavbarStore().addTorrentDialogVisible)

    function createDialog(componentName: string, props?: Object) {
      const guid = uuidv4()
      const template = {
        component: componentName,
        props: props || {},
        guid
      }

      dialogs.value.push(template)

      return guid
    }

    function deleteDialog(guid: string) {
      dialogs.value = dialogs.value.filter(dialog => dialog.guid !== guid)
    }

    return { dialogs, isVisibleDialogs, createDialog, deleteDialog }
  })