import {ref} from 'vue'
import {defineStore} from 'pinia'
import {ModalTemplate} from '@/types/vuetorrent'

export const useModalStore = defineStore('modals', () => {
  const modals = ref<ModalTemplate[]>([])



  return { modals }
})