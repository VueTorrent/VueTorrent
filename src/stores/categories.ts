import qbit from '@/services/qbit'
import { Category } from '@/types/qbit/models'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { shallowRef, triggerRef } from 'vue'

export const useCategoryStore = defineStore('categories', () => {
  /** Key: Category name */
  const categories = shallowRef<Map<string, Category>>(new Map())

  function syncFromMaindata(fullUpdate: boolean, entries: [string, Partial<Category>][], removed?: string[]) {
    if (fullUpdate) {
      categories.value = new Map(entries as [string, Category][])
      return
    }

    for (const [catName, qbitCat] of entries) {
      const oldCat = categories.value.get(catName)
      if (oldCat) {
        const newCat = {
          name: qbitCat.name ?? oldCat.name,
          savePath: qbitCat.savePath ?? oldCat.savePath
        }
        categories.value.set(catName, newCat)
      } else {
        categories.value.set(catName, {
          name: qbitCat.name ?? catName,
          savePath: qbitCat.savePath ?? ''
        })
      }
    }
    removed?.forEach(c => categories.value.delete(c))
    triggerRef(categories)
  }

  function getCategoryFromName(categoryName?: string) {
    if (!categoryName) return
    return categories.value.get(categoryName)
  }

  async function createCategory(category: Category) {
    await qbit.createCategory(category)
  }

  async function editCategory(category: Category, oldCategory?: string) {
    if (oldCategory) {
      // Create new category
      await qbit.createCategory(category)

      // Move old category torrent to new location
      await qbit.editCategory({ name: oldCategory, savePath: category.savePath })

      // Get list of torrents in old category and move them to new category
      const torrents = await qbit.getTorrents({ category: oldCategory })
      if (torrents.length > 0) {
        await qbit.setCategory(
          torrents.map(torrent => torrent.hash),
          category.name
        )
      }

      // Delete old category
      await qbit.deleteCategory([oldCategory])
      return torrents.length
    } else {
      await qbit.editCategory(category)
    }
  }

  async function deleteCategories(categoryNames: string[]) {
    await qbit.deleteCategory(categoryNames)
  }

  return {
    categories,
    syncFromMaindata,
    getCategoryFromName,
    createCategory,
    editCategory,
    deleteCategories,
    $reset: () => {
      categories.value.clear()
      triggerRef(categories)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))
}