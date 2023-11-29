import { qbit } from '@/services'
import { Feed, FeedRule } from '@/types/qbit/models'
import { RssArticle } from '@/types/vuetorrent'
import { defineStore } from 'pinia'
import { computed, reactive, ref, shallowRef, triggerRef } from 'vue'

export const useRssStore = defineStore(
  'rss',
  () => {
    const feeds = ref<Feed[]>([])
    const rules = ref<FeedRule[]>([])

    const _articles = shallowRef<RssArticle[]>([])
    const keyMap = shallowRef<Record<string, string[]>>({})

    const filters = reactive({
      title: '',
      unread: false
    })

    const unreadArticles = computed(() => _articles.value.filter(article => !article.isRead))
    const articles = computed(() => (filters.unread ? unreadArticles.value : _articles.value))

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

      _articles.value = []
      keyMap.value = {}

      feeds.value.forEach((feed: Feed) => {
        if (!feed.articles) return

        feed.articles.forEach(article => {
          if (keyMap.value[article.id]) {
            keyMap.value[article.id].push(feed.name)
          } else {
            keyMap.value[article.id] = [feed.name]
            _articles.value.push({
              parsedDate: new Date(article.date),
              ...article
            })
          }
        })
      })

      triggerRef(_articles)
      triggerRef(keyMap)
    }

    function getFeedNames(articleId: string) {
      return keyMap.value[articleId]
    }

    async function markArticleAsRead(articleId: string) {
      const feedNames = keyMap.value[articleId]
      if (!feedNames) return

      const promises: Promise<any>[] = []
      feedNames.forEach(feedName => promises.push(qbit.markAsRead(feedName, articleId)))
      await Promise.all(promises)

      _articles.value.forEach(article => {
        if (article.id === articleId) article.isRead = true
      })
      triggerRef(_articles)
    }

    async function markAllAsRead() {
      await Promise.all(unreadArticles.value.map(article => article.id).map(markArticleAsRead))
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
      unreadArticles,
      refreshFeed,
      createFeed,
      setRule,
      editFeed,
      renameRule,
      deleteFeed,
      deleteRule,
      fetchFeeds,
      getFeedNames,
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
