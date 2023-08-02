import { ref } from 'vue'
import {defineStore} from 'pinia'
import {qbit} from '@/services'
import { Category } from '@/types/qbit/models'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const unknownCategory = {name: 'UNKNOWN', savePath: ''}

  async function fetchCategories() {
    categories.value = await qbit.getCategories()
  }

  function getCategoryByName(name: string) {
    const category = categories.value.find(value => value.name === name)
    return category ?? unknownCategory
  }

  return {categories, fetchCategories, getCategoryByName}
})