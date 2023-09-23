<script lang="ts" setup>
import { useSearchQuery } from '@/composables'
import { useNavbarStore, useRssStore } from '@/stores'
import { Feed } from '@/types/qbit/models'
import { RssArticle } from '@/types/vuetorrent'
import debounce from 'lodash.debounce'
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useArrayPagination } from 'vue-composable'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'


const router = useRouter()
const { t } = useI18n()
const navbarStore = useNavbarStore()
const rssStore = useRssStore()

const descriptionDialogVisible = ref(false)
const description = ref('')

const articles = computed(() => {
  const articles: RssArticle[] = []
  const keySet = new Set<string>()

  rssStore.feeds.forEach((feed: Feed) => {
    if (!feed.articles) return

    feed.articles.forEach(article => {
      if (keySet.has(article.id)) return

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

const unreadArticles = computed(() => {
  return articles.value.filter(article => !article.isRead)
})

const titleFilter = computed({
  get: () => rssStore.filters.title,
  set: debounce((value: string) => {
    rssStore.filters.title = value ?? ''
  }, 300)
})

const searchQuery = useSearchQuery(
    () => (rssStore.filters.unread ? unreadArticles.value : articles.value)
        .sort((a, b) => Number(b.parsedDate) - Number(a.parsedDate)),
    () => titleFilter.value,
    (item: RssArticle) => item.title
)
const {
  result: paginatedResults,
  currentPage,
  lastPage
} = useArrayPagination(searchQuery.results, { pageSize: 15 })

function openLink(url: string) {
  window.open(url, '_blank', 'noreferrer')
}

function showDescription(feed: RssArticle) {
  if (!feed.description) return
  description.value = feed.description
  descriptionDialogVisible.value = true
}

function downloadArticle(item: RssArticle) {
  navbarStore.pushTorrentToQueue(item.torrentURL)
}

async function markAsRead(item: RssArticle) {
  await rssStore.markArticleAsRead(item)
  item.isRead = true
}

async function markAllAsRead() {
  for (const article of unreadArticles.value) {
    await rssStore.markArticleAsRead(article)
  }
  await rssStore.fetchFeeds()
}

function goHome() {
  router.push({ name: 'dashboard' })
}

const isDialogVisible = computed(() => navbarStore.addTorrentDialogVisible || descriptionDialogVisible.value)

function handleKeyboardShortcuts(e: KeyboardEvent) {
  if (e.key === 'Escape' && !isDialogVisible.value) {
    goHome()
  }
}

onBeforeMount(async () => {
  await rssStore.fetchFeeds()
  currentPage.value = 1
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcuts)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboardShortcuts)
})
</script>

<template>
  <div class="pa-3">
    <v-row align="center" justify="center" no-gutters>
      <v-col>
        <h1 class="subtitle-1 ml-2" style="font-size: 1.6em !important">
          {{ t('rssArticles.title') }}
        </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn icon="mdi-home" variant="plain" @click="goHome" />
        </div>
      </v-col>
    </v-row>

    <v-list>
      <v-list-item>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="titleFilter" :label="$t('rssArticles.filters.title')" clearable hide-details />
          </v-col>
          <v-col cols="12">
            <div class="d-flex flex-row align-center justify-center">
              <v-checkbox v-model="rssStore.filters.unread" :label="$t('rssArticles.filters.unread')" hide-details />
              <v-spacer />
              <v-btn :text="$t('rssArticles.markAllAsRead')" color="primary" @click="markAllAsRead" />
            </div>
          </v-col>
        </v-row>
      </v-list-item>

      <v-list-item v-if="searchQuery.results.value.length">
        <v-pagination v-model="currentPage"
                      :length="lastPage"
                      next-icon="mdi-menu-right"
                      prev-icon="mdi-menu-left" />
      </v-list-item>

      <v-list-item>
        <v-list>
          <template v-for="(feed, index) in paginatedResults">
            <v-divider v-if="index > 0" color="white" />

            <v-list-item :class="{ 'rss-read': feed.isRead }" @click="showDescription(feed)">
              <div class="d-flex">
                <div>
                  <v-list-item-title class="text-wrap">{{ feed.title }}</v-list-item-title>

                  <v-list-item-subtitle>
                    <span>{{ feed.parsedDate.toLocaleString() }} | {{ feed.feedName }}</span>
                    <span v-if="feed.author"> | {{ feed.author }}</span>
                    <span v-if="feed.category"> | {{ feed.category }}</span>
                  </v-list-item-subtitle>
                </div>

                <v-spacer />

                <div class="d-flex flex-column">
                  <v-btn icon="mdi-open-in-new"
                         variant="text"
                         @click.stop="openLink(feed.link)" />
                  <v-btn color="accent"
                         icon="mdi-check"
                         variant="text"
                         @click.stop="markAsRead(feed)" />
                  <v-btn icon="mdi-download"
                         variant="text"
                         @click.stop="downloadArticle(feed)" />
                </div>
              </div>

              <v-dialog v-model="descriptionDialogVisible">
                <v-card>
                  <v-card-text>
                    <div v-html="description" />
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-list-item>
          </template>

          <v-list-item v-if="searchQuery.results.value.length === 0">
            {{ $t('rssArticles.emptyRssList') }}
          </v-list-item>
        </v-list>
      </v-list-item>

      <v-list-item v-if="searchQuery.results.value.length">
        <v-pagination v-model="currentPage"
                      :length="lastPage"
                      next-icon="mdi-menu-right"
                      prev-icon="mdi-menu-left" />
      </v-list-item>
    </v-list>
  </div>
</template>

<style lang="scss" scoped>
.rss-read {
  &.v-theme--darkTheme {
    color: lighten(darkgrey, 5%) !important;
  }

  &.v-theme--lightTheme {
    color: grey !important;
  }
}
</style>
