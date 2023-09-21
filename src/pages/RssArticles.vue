<script setup lang="ts">
import debounce from 'lodash.debounce'
import { useSearchQuery } from '@/composables'
import { useNavbarStore, useRssStore } from '@/stores'
import { Feed } from '@/types/qbit/models'
import { RssArticle } from '@/types/vuetorrent'
import { computed, onBeforeMount, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const navbarStore = useNavbarStore()
const rssStore = useRssStore()

const headers = [
  { title: t('rssArticles.table.id'), key: 'id' },
  { title: t('rssArticles.table.title'), key: 'title' },
  { title: t('rssArticles.table.category'), key: 'category' },
  { title: t('rssArticles.table.author'), key: 'author' },
  { title: t('rssArticles.table.date'), key: 'parsedDate' },
  { title: t('rssArticles.table.feedName'), key: 'feedName' },
  { title: t('rssArticles.table.actions'), key: 'actions', sortable: false }
]

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
  () => (rssStore.filters.unread ? unreadArticles.value : articles.value),
  () => titleFilter.value,
  (item: RssArticle) => item.title
)

function downloadArticle(item: RssArticle) {
  navbarStore.pushTorrentToQueue(item.torrentURL)
}

async function markAsRead(item: RssArticle) {
  await rssStore.markArticleAsRead(item)
  await rssStore.fetchFeeds()
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

const isDialogVisible = computed(() => navbarStore.addTorrentDialogVisible)

function handleKeyboardShortcuts(e: KeyboardEvent) {
  if (e.key === 'Escape' && !isDialogVisible.value) {
    goHome()
  }
}

onBeforeMount(async () => {
  await rssStore.fetchFeeds()
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
    <v-row no-gutters align="center" justify="center">
      <v-col>
        <h1 style="font-size: 1.6em !important" class="subtitle-1 ml-2">
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
      <v-data-table
        :headers="headers"
        :items="searchQuery.results.value"
        :footer-props="{ itemsPerPageOptions: [5, 15, 30, 50, -1] }"
        :items-per-page="15"
        item-value="id"
        multi-sort
        :sort-by="[{ key: 'parsedDate', order: 'desc' }]"
      >
        <template v-slot:top>
          <div class="mx-4 mb-5">
            <v-text-field v-model="titleFilter" clearable hide-details :label="$t('rssArticles.filters.title')" />
            <v-row>
              <v-col>
                <v-checkbox v-model="rssStore.filters.unread" hide-details :label="$t('rssArticles.filters.unread')" />
              </v-col>
              <v-spacer />
              <v-col class="d-flex align-center justify-end">
                <v-btn :text="$t('rssArticles.markAllAsRead')" color="primary" @click="markAllAsRead" />
              </v-col>
            </v-row>
          </div>
        </template>
        <template v-slot:[`item.id`]="{ item }">
          <span :class="{ 'rss-read': item.raw.isRead }">{{ item.raw.id }}</span>
        </template>
        <template v-slot:[`item.title`]="{ item }">
          <a :class="{ 'rss-read': item.raw.isRead }" :href="item.raw.link" target="_blank">{{ item.raw.title }}</a>
        </template>
        <template v-slot:[`item.category`]="{ item }">
          <span :class="{ 'rss-read': item.raw.isRead }">{{ item.raw.category }}</span>
        </template>
        <template v-slot:[`item.author`]="{ item }">
          <span :class="{ 'rss-read': item.raw.isRead }">{{ item.raw.author }}</span>
        </template>
        <template #[`item.parsedDate`]="{ item }">
          <span :class="{ 'rss-read': item.raw.isRead }">{{ item.raw.parsedDate.toLocaleString() }}</span>
        </template>
        <template v-slot:[`item.feedName`]="{ item }">
          <span :class="{ 'rss-read': item.raw.isRead }">{{ item.raw.feedName }}</span>
        </template>
        <template #[`item.actions`]="{ item }">
          <span class="rss-actions">
            <v-icon icon="mdi-email-open" @click="markAsRead(item.raw)" />
            <v-icon icon="mdi-download" @click="downloadArticle(item.raw)" />
          </span>
        </template>
      </v-data-table>
    </v-list>
  </div>
</template>

<style scoped>
.rss-read {
  color: grey;
}
</style>
