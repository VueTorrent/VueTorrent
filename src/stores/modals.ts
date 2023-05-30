import { ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import type Modal from '@/types/vuetorrent/Modal'

export const useModalsStore = defineStore('modals', () => {
  const modals = ref<Modal[]>([])

  const createModal = (componentName: Modal['componentName'], props?: any) => {
    modals.value.push({
      componentName,
      guid: uuidv4(),
      props
    })
  }

  const removeModal = (guid: string) => {
    modals.value = modals.value.filter((m) => m.guid !== guid)
  }

  return {
    modals,
    createModal,
    removeModal
  }
})
