import {ref} from 'vue'
import {defineStore} from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import {ModalTemplate} from '@/types/vuetorrent'

export const useModalStore = defineStore('modals', () => {
  const modals = ref<ModalTemplate[]>([])

  function createModal(name: string, ...props: any) {
    modals.value.push({
      component: name,
      guid: uuidv4(),
      ...props
    })
  }

  function deleteModal(guid: string) {
    const index = modals.value.findIndex((modal) => modal.guid === guid)
    if (index !== -1) {
      modals.value.splice(index, 1)
    }
  }

  return { modals, createModal, deleteModal }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        key: 'vuetorrent_modals'
      }
    ]
  }
})