import { qbit } from '@/services'
import { Feed, FeedRule } from '@/types/qbit/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useRssStore = defineStore('rss', () => {
  const feeds = ref<Feed[]>([])
  const rules = ref<FeedRule[]>([])

  async function fetchFeeds() {
    feeds.value = await qbit.getFeeds()
  }

  async function fetchRules() {
    rules.value = await qbit.getRules()
  }

  return { feeds, rules }
})