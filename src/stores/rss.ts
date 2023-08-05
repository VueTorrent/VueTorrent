import { Feed, FeedRule } from '@/types/qbit/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useRssStore = defineStore('rss', () => {
  const feeds = ref<Feed[]>([])
  const rules = ref<FeedRule[]>([])

  return { feeds, rules }
})