<script lang="ts" setup>
import {useAddTorrentStore, useDialogStore, useRssStore, useVueTorrentStore} from '@/stores'
import {computed, onBeforeMount, onMounted, onUnmounted, reactive, ref} from 'vue'
import {useArrayPagination, useSearchQuery} from '@/composables'
import {RssArticle} from '@/types/vuetorrent'
import {useRouter} from 'vue-router'
import debounce from 'lodash.debounce'
import {Feed} from '@/types/qbit/models'

const router = useRouter()
const addTorrentStore = useAddTorrentStore()
const dialogStore = useDialogStore()
const rssStore = useRssStore()
const vuetorrentStore = useVueTorrentStore()

const selectedFeeds = ref<string[]>([])
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

const feeds = computed(() => rssStore.articles.filter(article => selectedFeeds.value.length === 0 || selectedFeeds.value.includes(article.feedId)).sort((a, b) => Number(b.parsedDate) - Number(a.parsedDate)))

const searchQuery = useSearchQuery(
    () => feeds.value,
    () => titleFilter.value,
    (item: RssArticle) => item.title
)

const {paginatedResults, currentPage, pageCount} = useArrayPagination(searchQuery.results, 15)

function toggleFeedSelected(feed: Feed) {
  if (selectedFeeds.value.includes(feed.uid)) {
    selectedFeeds.value = selectedFeeds.value.filter(id => id !== feed.uid)
  } else {
    selectedFeeds.value = [...selectedFeeds.value, feed.uid]
  }
}

function getFeedTitle(feed?: Feed) {
  const unreadCount = getUnreadCount(feed)
  return `${feed ? feed.name : 'All'}` + (unreadCount ? ` (${unreadCount})` : '')
}

function getUnreadCount(feed?: Feed) {
  if (!feed) {
    return rssStore.unreadArticles.length
  }

  return (feed.articles ?? []).reduce((cnt, article) => cnt + +!article.isRead, 0)
}

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
  router.push({name: 'dashboard'})
}

function goToSettings() {
  router.push({ name: 'settings', params: {tab: 'rss', subtab: 'feeds'} })
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
  <v-row v-if="rssStore.feeds">
    <v-col cols="4">
      <v-list>
        <v-list-item color="accent"
                     :title="getFeedTitle()"
                     variant="text"
                     @click="selectedFeeds = []"/>
        <v-divider/>
        <v-list-item v-for="feed in rssStore.feeds"
                     :active="selectedFeeds.includes(feed.uid)"
                     :title="getFeedTitle(feed)"
                     color="accent"
                     variant="text"
                     @click="toggleFeedSelected(feed)"/>
      </v-list>
    </v-col>

    <v-col cols="8">
      <v-list>
        <v-list-item v-if="searchQuery.results.value.length">
          <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left"/>
        </v-list-item>

        <template v-for="(article, index) in paginatedResults">
          <v-divider v-if="index > 0" color="white"/>

          <v-list-item :class="{ 'rss-read': article.isRead }" @click="showDescription(article)"
                       @contextmenu="markAsRead(article)">
            <div class="d-flex">
              <div>
                <v-list-item-title class="wrap-anywhere" style="white-space: unset">{{ article.title }}
                </v-list-item-title>

                <v-list-item-subtitle class="d-block">
                  <div>{{ article.parsedDate.toLocaleString() }}</div>
                  <div>{{ $t('rssArticles.item.feedName', {name: rssStore.getFeedNames(article.id).join(' | ')})}}
                  </div>
                  <div v-if="article.author">{{ $t('rssArticles.item.author', {author: article.author}) }}</div>
                  <div v-if="article.category">{{ $t('rssArticles.item.category', {category: article.category}) }}</div>
                </v-list-item-subtitle>
              </div>

              <v-spacer/>

              <div class="d-flex flex-column">
                <v-btn icon="mdi-open-in-new" variant="text" @click.stop="openLink(article)"/>
                <v-btn color="accent" icon="mdi-check" variant="text" @click.stop="markAsRead(article)"/>
                <v-btn icon="mdi-download" variant="text" @click.stop="downloadArticle(article)"/>
              </div>
            </div>
          </v-list-item>
        </template>

        <v-list-item v-if="searchQuery.results.value.length === 0">
          {{ $t('common.emptyList') }}
        </v-list-item>

        <v-list-item v-if="searchQuery.results.value.length">
          <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left"/>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>

  <template v-else>
    <v-empty-state title="No RSS feeds registered" icon="mdi-rss-off">
      <template #text>
        <v-btn text="Go to settings" color="primary" @click="goToSettings" />
      </template>
    </v-empty-state>
  </template>

  <v-dialog v-model="descriptionDialogVisible">
    <v-card>
      <v-card-title>
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ rssDescription.title }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="descriptionDialogVisible = false"/>
        </v-toolbar>
      </v-card-title>

      <v-card-text>
        <div class="description-container" v-html="rssDescription.content"/>
      </v-card-text>
    </v-card>
  </v-dialog>
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
