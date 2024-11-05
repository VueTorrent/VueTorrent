import { comparators } from '@/helpers'
import qbit from '@/services/qbit'
import { useTorrentStore } from '@/stores/torrents.ts'
import { useSorted } from '@vueuse/core'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { shallowRef, triggerRef } from 'vue'

export const useTagStore = defineStore('tags', () => {
  const _tags = shallowRef<Set<string>>(new Set())
  const tags = useSorted(() => Array.from(_tags.value.values()), comparators.text.asc)

  const { torrentsByTag } = storeToRefs(useTorrentStore())

  function syncFromMaindata(fullUpdate: boolean, values: string[], removed?: string[]) {
    if (fullUpdate) {
      _tags.value = new Set(values)
      return
    }

    values.forEach(tag => _tags.value.add(tag))
    removed?.forEach(tag => _tags.value.delete(tag))
    triggerRef(_tags)
  }

  async function createTags(tags: string[]) {
    await qbit.createTag(tags)
  }

  async function editTag(oldTag: string, newTag: string) {
    if (oldTag === newTag) return

    // Create new tag
    await qbit.createTag([newTag])

    // Get list of torrents in old tag and move them to new tag
    const torrents = await qbit.getTorrents({ tag: oldTag })
    if (torrents.length > 0) {
      await qbit.addTorrentTag(
        torrents.map(torrent => torrent.hash),
        [newTag]
      )
    }

    // Delete old tag
    await qbit.deleteTags([oldTag])
  }

  async function deleteTags(tags: string[]) {
    await qbit.deleteTags(tags)
  }

  async function deleteUnusedTags() {
    const usedTags = Object.keys(torrentsByTag.value)
    const unusedTags = tags.value.filter(tag => !usedTags.includes(tag))

    await deleteTags(unusedTags)
  }

  return {
    tags,
    syncFromMaindata,
    createTags,
    editTag,
    deleteTags,
    deleteUnusedTags,
    $reset: () => {
      _tags.value.clear()
      triggerRef(_tags)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTagStore, import.meta.hot))
}
