import { comparators, extractHostname } from '@/helpers'
import qbit from '@/services/qbit'
import { useSorted } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, shallowRef, triggerRef } from 'vue'

export const useTrackerStore = defineStore('trackers', () => {
  /** Key: tracker domain, values: torrent hashes */
  const _trackerMap = shallowRef<Map<string, string[]>>(new Map())
  const trackers = useSorted(() => Array.from(_trackerMap.value.keys()), comparators.text.asc)
  /** Key: torrent hash, values: tracker domains */
  const torrentTrackers = computed(() =>
    Array.from(_trackerMap.value.entries()).reduce((tot, val) => {
      const [domain, hashes] = val
      hashes.forEach(hash => {
        const domains = tot.get(hash)
        if (domains) {
          domains.push(domain)
        } else {
          tot.set(hash, [domain])
        }
      })
      return tot
    }, new Map<string, string[]>())
  )

  function syncFromMaindata(fullUpdate: boolean, entries: [string, string[]][], removed?: string[]) {
    if (fullUpdate) {
      _trackerMap.value = new Map(entries.map(([k, v]) => [extractHostname(k), v]))
      return
    }

    for (const [trackerUrl, linkedTorrents] of entries) {
      _trackerMap.value.set(extractHostname(trackerUrl), linkedTorrents)
    }

    removed?.forEach(t => _trackerMap.value.delete(extractHostname(t)))
    triggerRef(_trackerMap)
  }

  async function getTorrentTrackers(hash: string) {
    return await qbit.getTorrentTrackers(hash)
  }

  async function addTorrentTrackers(hash: string, trackers: string) {
    await qbit.addTorrentTrackers(hash, trackers)
  }

  async function editTorrentTracker(hash: string, oldUrl: string, newUrl: string) {
    await qbit.editTorrentTracker(hash, oldUrl, newUrl)
  }

  async function removeTorrentTrackers(hash: string, urls: string[]) {
    await qbit.removeTorrentTrackers(hash, urls)
  }

  return {
    trackers,
    torrentTrackers,
    syncFromMaindata,
    getTorrentTrackers,
    addTorrentTrackers,
    editTorrentTracker,
    removeTorrentTrackers,
    $reset: () => {
      _trackerMap.value.clear()
      triggerRef(_trackerMap)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTrackerStore, import.meta.hot))
}
