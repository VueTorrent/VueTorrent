import { useI18nUtils } from './i18n'
import { useMaindataStore, useSnackbarStore, useTorrentStore } from '@/stores'

interface TorrentTagCategoryState {
  hash: string
  category: string
  tags: string[]
}

function unique(values: string[]) {
  return Array.from(new Set(values))
}

function formatList(values: string[]) {
  return unique(values).join(', ')
}

let tagCategoryActionQueue: Promise<void> = Promise.resolve()

async function enqueueTagCategoryAction<T>(action: () => Promise<T>): Promise<T> {
  const previous = tagCategoryActionQueue
  let release!: () => void
  tagCategoryActionQueue = new Promise(resolve => {
    release = resolve
  })

  await previous
  try {
    return await action()
  } finally {
    release()
  }
}

export function useTagCategoryActions() {
  const { t } = useI18nUtils()
  const maindataStore = useMaindataStore()
  const snackbarStore = useSnackbarStore()
  const torrentStore = useTorrentStore()

  async function runQueuedAction<T>(action: () => Promise<T>): Promise<T> {
    try {
      return await enqueueTagCategoryAction(action)
    } catch (error) {
      console.error(error)
      snackbarStore.showError(t('toast.tag_category.action_error'))
      throw error
    }
  }

  function takeSnapshot(hashes: string[]): TorrentTagCategoryState[] {
    return unique(hashes).map(hash => {
      const torrent = torrentStore.getTorrentByHash(hash)
      return {
        hash,
        category: torrent?.category ?? '',
        tags: [...(torrent?.tags ?? [])],
      }
    })
  }

  async function runWithUndo(action: () => Promise<void>, getMessage: () => string, undo: () => Promise<void>) {
    await action()

    snackbarStore.show({
      message: getMessage(),
      actionText: t('toast.tag_category.undo'),
      color: 'success',
      timeout: 8000,
      action: async () => {
        try {
          await enqueueTagCategoryAction(async () => {
            await undo()
            await maindataStore.syncMaindataAndWait()
          })
          snackbarStore.showSuccess(t('toast.tag_category.undo_success'))
        } catch (error) {
          console.error(error)
          snackbarStore.showError(t('toast.tag_category.undo_error'))
        }
      },
    })

    await maindataStore.syncMaindataAndWait()
  }

  async function setCategory(hashes: string[], category: string) {
    return runQueuedAction(async () => {
      const snapshot = takeSnapshot(hashes)

      await runWithUndo(
        () => torrentStore.setTorrentCategory(hashes, category),
        () => (category ? t('toast.tag_category.category_set', { n: snapshot.length, category }) : t('toast.tag_category.category_cleared', { n: snapshot.length })),
        async () => {
          const hashesByCategory = new Map<string, string[]>()
          snapshot.forEach(({ hash, category }) => {
            hashesByCategory.set(category, [...(hashesByCategory.get(category) ?? []), hash])
          })

          for (const [category, categoryHashes] of hashesByCategory) {
            await torrentStore.setTorrentCategory(categoryHashes, category)
          }
        }
      )
    })
  }

  async function addTags(hashes: string[], tags: string[]) {
    return runQueuedAction(() => addTagsInternal(hashes, tags))
  }

  async function addTagsInternal(hashes: string[], tags: string[], snapshot = takeSnapshot(hashes)) {
    const tagsToAdd = unique(tags)
    if (tagsToAdd.length === 0) return

    await runWithUndo(
      () => torrentStore.addTorrentTags(hashes, tagsToAdd),
      () => t('toast.tag_category.tags_added', { n: snapshot.length, tags: formatList(tagsToAdd) }),
      async () => {
        for (const tag of tagsToAdd) {
          const hashesWithoutTag = snapshot.filter(({ tags }) => !tags.includes(tag)).map(({ hash }) => hash)
          if (hashesWithoutTag.length > 0) {
            await torrentStore.removeTorrentTags(hashesWithoutTag, [tag])
          }
        }
      }
    )
  }

  async function removeTags(hashes: string[], tags: string[]) {
    return runQueuedAction(() => removeTagsInternal(hashes, tags))
  }

  async function removeTagsInternal(hashes: string[], tags: string[], snapshot = takeSnapshot(hashes)) {
    const tagsToRemove = unique(tags)
    if (tagsToRemove.length === 0) return

    await runWithUndo(
      () => torrentStore.removeTorrentTags(hashes, tagsToRemove),
      () => t('toast.tag_category.tags_removed', { n: snapshot.length, tags: formatList(tagsToRemove) }),
      async () => {
        for (const tag of tagsToRemove) {
          const hashesWithTag = snapshot.filter(({ tags }) => tags.includes(tag)).map(({ hash }) => hash)
          if (hashesWithTag.length > 0) {
            await torrentStore.addTorrentTags(hashesWithTag, [tag])
          }
        }
      }
    )
  }

  async function removeAllTags(hashes: string[]) {
    return runQueuedAction(async () => {
      const snapshot = takeSnapshot(hashes)
      const allTags = unique(snapshot.flatMap(({ tags }) => tags))
      if (allTags.length === 0) return

      await runWithUndo(
        () => torrentStore.removeTorrentAllTags(hashes),
        () => t('toast.tag_category.tags_cleared', { n: snapshot.length }),
        async () => {
          for (const tag of allTags) {
            const hashesWithTag = snapshot.filter(({ tags }) => tags.includes(tag)).map(({ hash }) => hash)
            if (hashesWithTag.length > 0) {
              await torrentStore.addTorrentTags(hashesWithTag, [tag])
            }
          }
        }
      )
    })
  }

  async function toggleTag(hashes: string[], tag: string) {
    return runQueuedAction(async () => {
      const snapshot = takeSnapshot(hashes)
      const allHaveTag = snapshot.length > 0 && snapshot.every(({ tags }) => tags.includes(tag))
      if (allHaveTag) await removeTagsInternal(hashes, [tag], snapshot)
      else await addTagsInternal(hashes, [tag], snapshot)
    })
  }

  return {
    setCategory,
    addTags,
    removeTags,
    removeAllTags,
    toggleTag,
  }
}
