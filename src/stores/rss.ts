import { qbit } from '@/services'
import { Feed, FeedRule } from '@/types/qbit/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useRssStore = defineStore('rss', () => {
  const feeds = ref<Feed[]>([])
  const rules = ref<FeedRule[]>([])

  async function refreshFeed(feedName: string) {
    await qbit.refreshFeed(feedName)
  }

  async function createFeed(feedName: string, feedUrl: string) {
    await qbit.createFeed({ name: feedName, url: feedUrl })
  }

  async function editFeed(oldName: string, newName: string) {
    await qbit.editFeed(oldName, newName)
  }

  async function deleteFeed(feedName: string) {
    await qbit.deleteFeed(feedName)
  }

  async function fetchFeeds() {
    feeds.value = await qbit.getFeeds(true)
  }

  async function fetchRules() {
    rules.value = await qbit.getRules()
  }

  return { feeds, rules, fetchFeeds, refreshFeed, createFeed, editFeed, deleteFeed, fetchRules }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        key: 'vuetorrent_rss'
      }
    ]
  }
})