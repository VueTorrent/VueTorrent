import { useIntervalFn, useSorted } from '@vueuse/core'
import type { AxiosError } from 'axios'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useTask } from 'vue-concurrency'
import { toast } from 'vue3-toastify'
import { useI18nUtils, useSearchQuery } from '@/composables'
import { comparators } from '@/helpers'
import qbit from '@/services/qbit'
import type { FeedRule, FeedArticle, Feed } from '@/types/qbit/models'
import type { RssArticle, RssFeed } from '@/types/vuetorrent'

export const useRssStore = defineStore(
  'rss',
  () => {
    const isFeedsLoaded = ref(false)
    const isRulesLoaded = ref(false)
    const feeds = ref<RssFeed[]>([])
    const rules = ref<FeedRule[]>([])
    const lastView = ref('feeds')

    const _articleMap = reactive(new Map<string, RssArticle>())
    const _feednamesByArticle = reactive(new Map<string, string[]>())

    const filters = reactive({
      title: '',
      unread: false,
    })

    const _flatArticles = computed(() => Array.from(_articleMap.values()))
    const unreadArticles = computed(() => _flatArticles.value.filter(article => !article.isRead))
    const articles = useSorted(
      () => (filters.unread ? unreadArticles.value : _flatArticles.value),
      (a, b) => comparators.date.desc(a.parsedDate, b.parsedDate)
    )
    const { results: filteredArticles } = useSearchQuery(
      articles,
      () => filters.title,
      item => item.title
    )
    const _refreshInterval = computed(() => (feeds.value.some(feed => feed.isLoading) ? 2000 : 60000))

    const fetchFeedsTask = useTask(function* () {
      yield fetchFeeds()
    }).keepLatest()

    const fetchRulesTask = useTask(function* () {
      yield fetchRules()
    }).keepLatest()

    const { pause: pauseFeedTimer, resume: resumeFeedTimer } = useIntervalFn(() => void fetchFeedsTask.perform(), _refreshInterval, {
      immediate: false,
      immediateCallback: true,
    })
    const { pause: pauseRuleTimer, resume: resumeRuleTimer } = useIntervalFn(() => void fetchRulesTask.perform(), _refreshInterval, {
      immediate: false,
      immediateCallback: true,
    })

    async function refreshFeed(feed: RssFeed) {
      await qbit.refreshFeed(feed.name)
      fetchFeedsTask.perform()
    }

    async function refreshAllFeeds() {
      await Promise.all(feeds.value.map(refreshFeed))
    }

    async function createFeed(feedName: string, feedUrl: string) {
      await qbit.createFeed({ name: feedName, url: feedUrl })
      fetchFeedsTask.perform()
    }

    async function setRule(ruleName: string, ruleDef: FeedRule) {
      await qbit.setRule(ruleName, {
        ...ruleDef,
        savePath: ruleDef.torrentParams.save_path,
        assignedCategory: ruleDef.torrentParams.category,
        addPaused: ruleDef.torrentParams.stopped,
        torrentContentLayout: ruleDef.torrentParams.content_layout,
      })
      fetchFeedsTask.perform()
    }

    async function renameFeed(oldName: string, newName: string) {
      await qbit.renameFeed(oldName, newName)
      fetchFeedsTask.perform()
    }

    async function setFeedUrl(feedName: string, feedUrl: string) {
      await qbit.setFeedUrl(feedName, feedUrl).catch((error: AxiosError) => {
        if (error.response?.status === 404) {
          const { t } = useI18nUtils()
          toast.error(t('toast.qbit.not_supported', { version: '4.6.0' }))
        }
      })
      fetchFeedsTask.perform()
    }

    async function renameRule(oldName: string, newName: string) {
      await qbit.renameRule(oldName, newName)
      fetchRulesTask.perform()
    }

    async function deleteFeed(feedName: string) {
      await qbit.deleteFeed(feedName)
      fetchFeedsTask.perform()
    }

    async function deleteRule(ruleName: string) {
      await qbit.deleteRule(ruleName)
      fetchRulesTask.perform()
    }

    function _enrichArticle(article: FeedArticle, feedUid: string): RssArticle {
      return reactive({
        ...article,
        feedIds: [feedUid],
        parsedDate: new Date(article.date),
      })
    }

    function _enrichFeed(feed: Feed): asserts feed is RssFeed {
      if (!feed.articles) return

      feed.articles = feed.articles.map((qbitArticle, i) => {
        const existingArticle = _articleMap.get(qbitArticle.id)
        if (!existingArticle) {
          const article = _enrichArticle(qbitArticle, feed.uid)

          feed.articles![i] = article
          _articleMap.set(article.id, article)
          _feednamesByArticle.set(article.id, [feed.name])
          return article
        }

        const existingFeedNames = _feednamesByArticle.get(qbitArticle.id)
        if (!existingFeedNames) {
          _feednamesByArticle.set(qbitArticle.id, [feed.name])
        } else if (!existingFeedNames.includes(feed.name)) {
          existingFeedNames.push(feed.name)
        }

        if (!existingArticle.feedIds.includes(feed.uid)) {
          existingArticle.feedIds.push(feed.uid)
        }

        if (!qbitArticle.isRead) {
          existingArticle.isRead = false
        }

        return existingArticle
      })
    }

    async function fetchFeeds() {
      const newFeeds = await qbit.getFeeds(true)

      feeds.value = newFeeds.map(feed => {
        _enrichFeed(feed)
        return feed
      })

      isFeedsLoaded.value = true
    }

    function getFeedNames(articleId: string) {
      return _feednamesByArticle.get(articleId) || []
    }

    async function markArticleAsRead(articleId: string) {
      const existingArticle = _articleMap.get(articleId)
      const feedNames = _feednamesByArticle.get(articleId)
      if (!existingArticle || !feedNames) return

      const promises: Promise<void>[] = []
      feedNames.forEach(feedName => promises.push(qbit.markAsRead(feedName, articleId)))
      await Promise.all(promises)

      existingArticle.isRead = true
    }

    async function markFeedAsRead(feed: RssFeed) {
      await qbit.markAsRead(feed.name)
      fetchFeedsTask.perform()
    }

    async function markAllAsRead() {
      const { t } = useI18nUtils()
      const unreadArticlesCount = unreadArticles.value.length
      await toast.promise(
        Promise.all(unreadArticles.value.map(article => article.id).map(markArticleAsRead)),
        {
          pending: t('rssArticles.feeds.promise.pending'),
          error: t('rssArticles.feeds.promise.error'),
          success: t('rssArticles.feeds.promise.success', unreadArticlesCount),
        },
        {
          autoClose: 1500,
        }
      )
      fetchFeedsTask.perform()
    }

    async function fetchRules() {
      rules.value = await qbit.getRules()
      isRulesLoaded.value = true
    }

    async function fetchMatchingArticles(ruleName: string) {
      return await qbit.getMatchingArticles(ruleName)
    }

    function _evictCache() {
      feeds.value = []
      rules.value = []
      _articleMap.clear()
      _feednamesByArticle.clear()
    }

    return {
      isFeedsLoaded,
      isRulesLoaded,
      feeds,
      rules,
      lastView,
      filters,
      articles,
      filteredArticles,
      unreadArticles,
      fetchFeedsTask,
      fetchRulesTask,
      pauseFeedTimer,
      resumeFeedTimer,
      pauseRuleTimer,
      resumeRuleTimer,
      refreshFeed,
      refreshAllFeeds,
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
      markFeedAsRead,
      markAllAsRead,
      fetchRules,
      fetchMatchingArticles,
      $reset: () => {
        _evictCache()
        isFeedsLoaded.value = false
        isRulesLoaded.value = false
        lastView.value = 'feeds'
        filters.title = ''
        filters.unread = false
        pauseFeedTimer()
        pauseRuleTimer()
      },
    }
  },
  {
    persistence: {
      enabled: true,
      storageItems: [{ storage: sessionStorage, excludePaths: ['isFeedsLoaded', 'isRulesLoaded', 'fetchFeedsTask', 'fetchRulesTask'] }],
    },
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRssStore, import.meta.hot))
}
