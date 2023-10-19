<script lang="ts" setup>
import { useArrayPagination, useSearchQuery } from '@/composables'
import { useDialogStore } from '@/stores/dialog'
import { useNavbarStore } from '@/stores/navbar'
import { useRssStore } from '@/stores/rss'
import { RssArticle } from '@/types/vuetorrent'
import debounce from 'lodash.debounce'
import { computed, onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const dialogStore = useDialogStore()
const navbarStore = useNavbarStore()
const rssStore = useRssStore()

const descriptionDialogVisible = ref(false)
const rssDescription = reactive({
  title: '',
  content: ''
})

const titleFilter = computed({
  get: () => rssStore.filters.title,
  set: debounce((value: string) => {
    rssStore.filters.title = value ?? ''
  }, 300)
})

const searchQuery = useSearchQuery(
  () => rssStore.articles.sort((a, b) => Number(b.parsedDate) - Number(a.parsedDate)),
  () => titleFilter.value,
  (item: RssArticle) => item.title
)

const { paginatedResults, currentPage, pageCount } = useArrayPagination(searchQuery.results, 15)

function openLink(url: string) {
  window.open(url, '_blank', 'noreferrer')
}

function showDescription(article: RssArticle) {
  if (!article.description) return
  rssDescription.title = article.title
  rssDescription.content = article.description
  descriptionDialogVisible.value = true
}

function downloadArticle(item: RssArticle) {
  navbarStore.pushTorrentToQueue(item.torrentURL)
}

async function markAsRead(item: RssArticle) {
  await rssStore.markArticleAsRead(item)
}

async function markAllAsRead() {
  await rssStore.markAllAsRead()
}

function goHome() {
  router.push({ name: 'dashboard' })
}

function handleKeyboardShortcuts(e: KeyboardEvent) {
  if (dialogStore.hasActiveDialog || descriptionDialogVisible.value) {
    return false
  }

  if (e.key === 'Escape') {
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
    <v-row align="center" justify="center" no-gutters>
      <v-col>
        <h1 class="subtitle-1 ml-2" style="font-size: 1.6em !important">
          {{ t('rssArticles.title') }} </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn icon="mdi-close" variant="plain" @click="goHome" />
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
        <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" />
      </v-list-item>

      <v-list-item>
        <v-list>
          <template v-for="(feed, index) in paginatedResults">
            <v-divider v-if="index > 0" color="white" />

            <v-list-item :class="{ 'rss-read': feed.isRead }" @click="showDescription(feed)">
              <div class="d-flex">
                <div>
                  <v-list-item-title class="text-wrap">{{ feed.title }}</v-list-item-title>

                  <v-list-item-subtitle class="d-block">
                    <div>{{ feed.parsedDate.toLocaleString() }}</div>
                    <div v-if="feed.feedName">{{ t('rssArticles.item.feedName', { name: feed.feedName }) }}</div>
                    <div v-if="feed.author">{{ t('rssArticles.item.author', { author: feed.author }) }}</div>
                    <div v-if="feed.category">{{ t('rssArticles.item.category', { category: feed.category }) }}</div>
                  </v-list-item-subtitle>
                </div>

                <v-spacer />

                <div class="d-flex flex-column">
                  <v-btn icon="mdi-open-in-new" variant="text" @click.stop="openLink(feed.link)" />
                  <v-btn color="accent" icon="mdi-check" variant="text" @click.stop="markAsRead(feed)" />
                  <v-btn icon="mdi-download" variant="text" @click.stop="downloadArticle(feed)" />
                </div>
              </div>

              <v-dialog v-model="descriptionDialogVisible">
                <v-card>
                  <v-card-title>
                    <v-toolbar color="transparent">
                      <v-toolbar-title>{{ rssDescription.title }}</v-toolbar-title>
                      <v-btn icon="mdi-close" @click="descriptionDialogVisible = false" />
                    </v-toolbar>
                  </v-card-title>

                  <v-card-text>
                    <div class="description-container" v-html="rssDescription.content" />
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-list-item>
          </template>

          <v-list-item v-if="searchQuery.results.value.length === 0">
            {{ $t('common.emptyList') }}
          </v-list-item>
        </v-list>
      </v-list-item>

      <v-list-item v-if="searchQuery.results.value.length">
        <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" />
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

.description-container {
  border: solid red 5px;
}
</style>

<style lang="scss">
.description-container img {
  max-width: 100%; /* Restrict image width to the container width */
  height: auto; /* Maintain aspect ratio */
}
</style>
