import { ref } from 'vue'
import {defineStore} from 'pinia'
import {qbit} from '@/services'

export const useTagStore = defineStore('tag', () => {
  const tags = ref<string[]>([])

  async function fetchTags() {
    tags.value = await qbit.getAvailableTags()
  }

  return {tags, fetchTags}
})