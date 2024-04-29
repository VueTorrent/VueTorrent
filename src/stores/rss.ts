import { qbit } from '@/services'
import { Feed, FeedRule } from '@/types/qbit/models'
import { RssArticle } from '@/types/vuetorrent'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

export const useRssStore = defineStore(
  'rss',
  () => {
    const feeds = ref<Feed[]>([])
    const rules = ref<FeedRule[]>([])

    const _articles = ref<RssArticle[]>([])
    const keyMap = ref<Record<string, string[]>>({})

    const filters = reactive({
      title: '',
      unread: false
    })

    const unreadArticles = computed(() => _articles.value.filter(article => !article.isRead))
    const articles = computed(() => (filters.unread ? unreadArticles.value : _articles.value))

    const { t } = useI18n()

    async function refreshFeed(feedName: string) {
      await qbit.refreshFeed(feedName)
    }

    async function createFeed(feedName: string, feedUrl: string) {
      await qbit.createFeed({ name: feedName, url: feedUrl })
    }

    async function setRule(ruleName: string, ruleDef: FeedRule) {
      await qbit.setRule(ruleName, {
        ...ruleDef,
        savePath: ruleDef.torrentParams.save_path,
        assignedCategory: ruleDef.torrentParams.category,
        addPaused: ruleDef.torrentParams.stopped,
        torrentContentLayout: ruleDef.torrentParams.content_layout
      })
    }

    async function renameFeed(oldName: string, newName: string) {
      await qbit.renameFeed(oldName, newName)
    }

    async function setFeedUrl(feedName: string, feedUrl: string) {
      await qbit.setFeedUrl(feedName, feedUrl).catch((error: AxiosError) => {
        console.log(error)
        if (error.response?.status === 404) {
          toast.error(t('toast.qbit.not_supported', { version: '4.6.0' }))
        }
      })
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
    }

    async function markAllAsRead() {
      const unreadArticlesCount = unreadArticles.value.length
      await toast.promise(
        Promise.all(unreadArticles.value.map(article => article.id).map(markArticleAsRead)),
        {
          pending: t('rssArticles.promise.pending'),
          error: t('rssArticles.promise.error'),
          success: t('rssArticles.promise.success', unreadArticlesCount)
        },
        {
          autoClose: 1500
        }
      )
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
      renameFeed,
      setFeedUrl,
      renameRule,
      deleteFeed,
      deleteRule,
      fetchFeeds,
      getFeedNames,
      markArticleAsRead,
      markAllAsRead,
      fetchRules,
      fetchMatchingArticles,
      $reset: () => {
        feeds.value = []
        rules.value = []
        _articles.value = []
        keyMap.value = {}
        filters.title = ''
        filters.unread = false
      }
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: sessionStorage }]
    }
  }
)
