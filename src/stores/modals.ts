import {ref} from 'vue'
import {defineStore} from 'pinia'
import {ModalTemplate} from '@/types/vuetorrent'

export const useModalStore = defineStore('modals', () => {
  const modals = ref<ModalTemplate[]>([])

  function createModal(modal: ModalTemplate) {
    modals.value.push(modal)
  }

  function openAddModal() {
    createModal({
      guid: 'Add Torrent',
      component: 'AddTorrentModal',
      props: {}
    })
  }

  return { modals, openAddModal }
})