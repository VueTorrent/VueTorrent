import { useSorted } from '@vueuse/core'
import { AxiosError } from 'axios'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, shallowRef, triggerRef } from 'vue'
import { comparators, extractHostname } from '@/helpers'
import qbit from '@/services/qbit'

export const useTrackerStore = defineStore('trackers', () => {
  /** Key: tracker domain, values: torrent hashes */
  const _trackerMap = shallowRef<Map<string, string[]>>(new Map())
  const trackers = useSorted(() => Array.from(_trackerMap.value.keys()), comparators.text.asc)
  const hostnameTrackers = computed(() => [...new Set(trackers.value.map(extractHostname))])
  /** Key: torrent hash, values: tracker URLs */
  const torrentTrackers = computed(() =>
    Array.from(_trackerMap.value.entries()).reduce((tot, val) => {
      const [url, hashes] = val
      hashes.forEach(hash => {
        const domains = tot.get(hash)
        if (domains) {
          domains.push(url)
        } else {
          tot.set(hash, [url])
        }
      })
      return tot
    }, new Map<string, string[]>())
  )
  /** Key: torrent hash, values: tracker domains */
  const torrentHostnameTrackers = computed(() =>
    Array.from(_trackerMap.value.entries()).reduce((tot, val) => {
      const [url, hashes] = val
      const domain = extractHostname(url)
      hashes.forEach(hash => {
        const domains = tot.get(hash)
        if (domains) {
          if (!domains.includes(domain)) {
            domains.push(domain)
          }
        } else {
          tot.set(hash, [domain])
        }
      })
      return tot
    }, new Map<string, string[]>())
  )

  function syncFromMaindata(fullUpdate: boolean, entries: [string, string[]][], removed?: string[]) {
    if (fullUpdate) {
      _trackerMap.value.clear()
      entries.forEach(([k, v]) => {
        const entry = _trackerMap.value.get(k)
        if (entry) {
          entry.push(...v)
        } else {
          _trackerMap.value.set(k, v)
        }
      })
      return
    }

    for (const [trackerUrl, linkedTorrents] of entries) {
      _trackerMap.value.set(trackerUrl, linkedTorrents)
    }

    removed?.forEach(t => _trackerMap.value.delete(t))
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

  async function bulkUpdateTrackers(
    hashes: string[],
    trackersData: {
      add: string
      replace: [string, string][]
      remove: string[]
    }
  ) {
    const promises = hashes.flatMap(hash => {
      const addPromise = trackersData.add.trim().length === 0 ? Promise.resolve() : addTorrentTrackers(hash, trackersData.add)
      const removePromise = trackersData.remove.length === 0 ? Promise.resolve() : removeTorrentTrackers(hash, trackersData.remove)
      const replacePromises = trackersData.replace.map(([oldUrl, newUrl]) => {
        if (!torrentTrackers.value.get(hash)?.includes(oldUrl)) return Promise.resolve()
        if (newUrl.length === 0 || torrentTrackers.value.get(hash)?.includes(newUrl)) return Promise.resolve()
        return editTorrentTracker(hash, oldUrl, newUrl)
      })

      return [addPromise, removePromise, ...replacePromises]
    })

    const allPromises = await Promise.allSettled(promises)
    const promisesResult = allPromises.reduce(
      (prev, curr) => {
        const fulfilled = curr.status === 'fulfilled'
        if (fulfilled) {
          prev[0] += 1
        } else prev[1].push(curr.reason)
        return prev
      },
      [0, []] as [number, AxiosError[]]
    )

    return {
      fulfilled: promisesResult[0],
      rejected: promisesResult[1],
      total: promisesResult[0] + promisesResult[1].length,
    }
  }

  return {
    trackers,
    hostnameTrackers,
    torrentTrackers,
    torrentHostnameTrackers,
    syncFromMaindata,
    getTorrentTrackers,
    addTorrentTrackers,
    editTorrentTracker,
    removeTorrentTrackers,
    bulkUpdateTrackers,
    $reset: () => {
      _trackerMap.value.clear()
      triggerRef(_trackerMap)
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTrackerStore, import.meta.hot))
}
