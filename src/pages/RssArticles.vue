<script setup lang="ts">
import debounce from 'lodash.debounce'
import { useSearchQuery } from '@/composables'
import { useNavbarStore, useRssStore } from '@/stores'
import { Feed } from '@/types/qbit/models'
import { RssArticle } from '@/types/vuetorrent'
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
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
  () => (rssStore.filters.unread ? unreadArticles.value : articles.value),
  () => titleFilter.value,
  (item: RssArticle) => item.title
)

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

const isDialogVisible = computed(() => navbarStore.addTorrentDialogVisible || descriptionDialogVisible.value)

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
      <v-list-item>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="titleFilter" clearable hide-details :label="$t('rssArticles.filters.title')" />
          </v-col>
          <v-col cols="12">
            <div class="d-flex flex-row align-center justify-center">
              <v-checkbox v-model="rssStore.filters.unread"
                          hide-details
                          :label="$t('rssArticles.filters.unread')" />
              <v-spacer />
              <v-btn :text="$t('rssArticles.markAllAsRead')" color="primary" @click="markAllAsRead" />
            </div>
          </v-col>
        </v-row>
      </v-list-item>

      <v-list-item>
        <v-list>
          <template v-for="(feed, index) in searchQuery.results.value">
            <v-divider color="white" v-if="index > 0" />

            <v-list-item :class="{ 'rss-read': feed.isRead }" @click="showDescription(feed)">
              <div class="d-flex">
                <div>
                  <v-list-item-title class="text-wrap">{{ feed.title }}</v-list-item-title>

                  <v-list-item-subtitle>
                    <span>{{ feed.feedName }}</span>
                    <span v-if="feed.author"> | {{ feed.author }}</span>
                    <span v-if="feed.category"> | {{ feed.category }}</span>
                    <span v-if="feed.parsedDate"> | {{ feed.parsedDate.toLocaleString() }}</span>
                  </v-list-item-subtitle>
                </div>

                <v-spacer />

                <div class="d-flex flex-column">
                  <v-btn icon="mdi-open-in-new"
                         variant="text"
                         @click="openLink(feed.link)" />
                  <v-btn color="accent"
                         icon="mdi-check"
                         variant="text"
                         @click="markAsRead(feed)" />
                  <v-btn icon="mdi-download"
                         variant="text"
                         @click="downloadArticle(feed)" />
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
    </v-list>
  </div>
</template>

<style scoped lang="scss">
.rss-read {
  &.v-theme--darkTheme {
    color: lighten(darkgrey, 5%) !important;
  }

  &.v-theme--lightTheme {
    color: grey !important;
  }
}
</style>
