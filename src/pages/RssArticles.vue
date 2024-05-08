<script lang="ts" setup>
import { useArrayPagination, useSearchQuery } from '@/composables'
import { useAddTorrentStore, useDialogStore, useRssStore, useVueTorrentStore } from '@/stores'
import { RssArticle } from '@/types/vuetorrent'
import debounce from 'lodash.debounce'
import { computed, onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const addTorrentStore = useAddTorrentStore()
const dialogStore = useDialogStore()
const rssStore = useRssStore()
const vuetorrentStore = useVueTorrentStore()

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

function openLink(article: RssArticle) {
  const url = vuetorrentStore.useIdForRssLinks ? article.id : article.link
  window.open(url, '_blank', 'noreferrer')
}

function showDescription(article: RssArticle) {
  if (!article.description) return
  rssDescription.title = article.title.trim()
  rssDescription.content = article.description.trim()
  descriptionDialogVisible.value = true
}

function downloadArticle(item: RssArticle) {
  addTorrentStore.pushTorrentToQueue(item.torrentURL)
}

async function markAsRead(item: RssArticle) {
  await rssStore.markArticleAsRead(item.id)
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
          {{ t('rssArticles.title') }}
        </h1>
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
              <div :class="{'d-flex button-group': true, 'flex-column': $vuetify.display.mobile}">
                <v-btn :disabled="rssStore.unreadArticles.length === 0" :text="$t('rssArticles.markAllAsRead')" color="primary" @click="rssStore.markAllAsRead()" />
                <v-btn :disabled="rssStore.feeds.length === 0" :text="$t('rssArticles.refreshAllFeeds')" color="primary" @click="rssStore.refreshAllFeeds()" />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-list-item>

      <v-list-item v-if="searchQuery.results.value.length">
        <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" />
      </v-list-item>

      <v-list-item>
        <v-list>
          <template v-for="(article, index) in paginatedResults">
            <v-divider v-if="index > 0" color="white" />

            <v-list-item :class="{ 'rss-read': article.isRead }" @click="showDescription(article)" @contextmenu="markAsRead(article)">
              <div class="d-flex">
                <div>
                  <v-list-item-title class="wrap-anywhere" style="white-space: unset">{{ article.title }} </v-list-item-title>

                  <v-list-item-subtitle class="d-block">
                    <div>{{ article.parsedDate.toLocaleString() }}</div>
                    <div>{{ t('rssArticles.item.feedName', { name: rssStore.getFeedNames(article.id).join(' | ') }) }}</div>
                    <div v-if="article.author">{{ t('rssArticles.item.author', { author: article.author }) }}</div>
                    <div v-if="article.category">{{ t('rssArticles.item.category', { category: article.category }) }}</div>
                  </v-list-item-subtitle>
                </div>

                <v-spacer />

                <div class="d-flex flex-column">
                  <v-btn icon="mdi-open-in-new" variant="text" @click.stop="openLink(article)" />
                  <v-btn color="accent" icon="mdi-check" variant="text" @click.stop="markAsRead(article)" />
                  <v-btn icon="mdi-download" variant="text" @click.stop="downloadArticle(article)" />
                </div>
              </div>
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

.button-group {
  gap: 8px;
}
</style>

<style lang="scss">
.description-container img {
  max-width: 100%; /* Restrict image width to the container width */
  height: auto; /* Maintain aspect ratio */
}
</style>
