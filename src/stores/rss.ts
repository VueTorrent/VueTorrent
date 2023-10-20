import { qbit } from '@/services'
import { Feed, FeedRule } from '@/types/qbit/models'
import { RssArticle } from '@/types/vuetorrent'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useRssStore = defineStore(
  'rss',
  () => {
    const feeds = ref<Feed[]>([])
    const rules = ref<FeedRule[]>([])

    const filters = reactive({
      title: '',
      unread: false
    })

    const articles = computed(() => {
      const articles: RssArticle[] = []
      const keySet = new Set<string>()

      feeds.value.forEach((feed: Feed) => {
        if (!feed.articles) return

        feed.articles.forEach(article => {
          if (keySet.has(article.id) || (filters.unread && article.isRead)) return

          keySet.add(article.id)
          articles.push({
            feedName: feed.name,
            parsedDate: new Date(article.date),
            ...article
          })
        })
      })

      return articles
    })

    async function refreshFeed(feedName: string) {
      await qbit.refreshFeed(feedName)
    }

    async function createFeed(feedName: string, feedUrl: string) {
      await qbit.createFeed({ name: feedName, url: feedUrl })
    }

    async function setRule(ruleName: string, ruleDef: FeedRule) {
      await qbit.setRule(ruleName, ruleDef)
    }

    async function editFeed(oldName: string, newName: string) {
      await qbit.editFeed(oldName, newName)
    }

    async function renameRule(oldName: string, newName: string) {
      await qbit.renameRule(oldName, newName)
    }

    async function deleteFeed(feedName: string) {
      await qbit.deleteFeed(feedName)
    }

    async function deleteRule(ruleName: string) {
      await qbit.deleteRule(ruleName)
    }

    async function fetchFeeds() {
      feeds.value = await qbit.getFeeds(true)
    }

    async function markArticleAsRead(article: RssArticle) {
      await qbit.markAsRead(article.feedName, article.id)

      const feed = feeds.value.find(feed => feed.name === article.feedName)
      if (!feed || !feed.articles) return
      const art = feed.articles.find(a => a.id === article.id)
      if (!art) return
      art.isRead = true
    }

    async function markAllAsRead() {
      feeds.value.forEach(feed => {
        if (!feed.articles) return
        feed.articles.forEach(async article => {
          article.isRead || (await qbit.markAsRead(feed.name, article.id))
        })
      })
      await fetchFeeds()
    }

    async function fetchRules() {
      rules.value = await qbit.getRules()
    }

    async function fetchMatchingArticles(ruleName: string) {
      return await qbit.getMatchingArticles(ruleName)
    }

    return {
      feeds,
      rules,
      filters,
      articles,
      refreshFeed,
      createFeed,
      setRule,
      editFeed,
      renameRule,
      deleteFeed,
      deleteRule,
      fetchFeeds,
      markArticleAsRead,
      markAllAsRead,
      fetchRules,
      fetchMatchingArticles
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: sessionStorage,
          key: 'vuetorrent_rss'
        }
      ]
    }
  }
)
