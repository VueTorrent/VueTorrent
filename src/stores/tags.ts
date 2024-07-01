import qbit from '@/services/qbit'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTagStore = defineStore(
  'tags',
  () => {
    const tags = ref<string[]>([])

    function syncFromMaindata(fullUpdate: boolean, values?: string[], removed?: string[]) {
      if (fullUpdate) {
        tags.value = values!
        return
      }

      if (values) {
        tags.value = [...tags.value, ...values]
      }

      tags.value = tags.value.filter(tag => !removed || !removed.includes(tag))
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

    return {
      tags,
      syncFromMaindata,
      createTags,
      editTag,
      deleteTags,
      $reset: () => {
        tags.value = []
      }
    }
  })