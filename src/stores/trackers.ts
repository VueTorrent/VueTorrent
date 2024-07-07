import qbit from '@/services/qbit'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTrackerStore = defineStore('trackers', () => {
  /** Key: tracker domain, values: torrent hashes */
  const trackers = ref<Map<string, string[]>>(new Map())
  /** Key: torrent hash, values: tracker domains */
  const torrentTrackers = computed(() =>
    Array.from(trackers.value.entries()).reduce((tot, val) => {
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
      trackers.value = new Map(entries)
      return
    }

    for (const [trackerUrl, linkedTorrents] of entries) {
      trackers.value.set(trackerUrl, linkedTorrents)
    }

    removed?.forEach(t => trackers.value.delete(t))
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
      trackers.value.clear()
    }
  }
})
