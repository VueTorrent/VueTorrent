import { defineStore } from 'pinia'
import { ref } from 'vue'

// Store which torrents are selected for use in the context menu

export const useSelectedStore = defineStore('selected', () => {
  const selected = ref<string[]>([])

  const add = (hash: string) => {
    if (!selected.value.includes(hash)) {
      selected.value.push(hash)
    }
  }

  const remove = (hash: string) => {
    selected.value = selected.value.filter((h) => h !== hash)
  }

  return {
    selected,
    add,
    remove
  }
})
