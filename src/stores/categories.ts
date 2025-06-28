import { useSorted } from '@vueuse/core'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { computed, shallowRef, triggerRef } from 'vue'
import { useTorrentStore } from './torrents'
import { comparators } from '@/helpers'
import qbit from '@/services/qbit'
import { Category } from '@/types/qbit/models'

export const useCategoryStore = defineStore('categories', () => {
  /** Key: Category name */
  const _categoryMap = shallowRef<Map<string, Category>>(new Map())
  const categories = useSorted(
    () => Array.from(_categoryMap.value.values()),
    (a, b) => comparators.text.asc(a.name, b.name)
  )

  const { torrents } = storeToRefs(useTorrentStore())

  const torrentsByCategory = computed(() =>
    torrents.value.reduce(
      (acc, torrent) => {
        if (!acc[torrent.category]) {
          acc[torrent.category] = 0
        }
        acc[torrent.category] += 1
        return acc
      },
      {} as Record<string, number>
    )
  )
  const unusedCategories = computed(() => {
    const usedCategories = Object.keys(torrentsByCategory.value)
    return categories.value.filter(c => !usedCategories.includes(c.name)).map(c => c.name)
  })

  function syncFromMaindata(fullUpdate: boolean, entries: [string, Partial<Category>][], removed?: string[]) {
    if (fullUpdate) {
      _categoryMap.value = new Map(entries as [string, Category][])
      return
    }

    for (const [catName, qbitCat] of entries) {
      const oldCat = _categoryMap.value.get(catName)
      if (oldCat) {
        const newCat = {
          name: qbitCat.name ?? oldCat.name,
          savePath: qbitCat.savePath ?? oldCat.savePath
        }
        _categoryMap.value.set(catName, newCat)
      } else {
        _categoryMap.value.set(catName, {
          name: qbitCat.name ?? catName,
          savePath: qbitCat.savePath ?? ''
        })
      }
    }
    removed?.forEach(c => _categoryMap.value.delete(c))
    triggerRef(_categoryMap)
  }

  function getCategoryFromName(categoryName?: string) {
    if (!categoryName) return
    return _categoryMap.value.get(categoryName)
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

  async function deleteUnusedCategories() {
    await deleteCategories(unusedCategories.value)
  }

  return {
    categories,
    torrentsByCategory,
    unusedCategories,
    syncFromMaindata,
    getCategoryFromName,
    createCategory,
    editCategory,
    deleteCategories,
    deleteUnusedCategories,
    $reset: () => {
      _categoryMap.value.clear()
      triggerRef(_categoryMap)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))
}
