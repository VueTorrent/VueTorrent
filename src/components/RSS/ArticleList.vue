<script setup lang="ts">
import { useArrayPagination, useSearchQuery } from '@/composables'
import { RssArticle } from '@/types/vuetorrent'
import { computed } from 'vue'
import debounce from 'lodash.debounce'
import { useAddTorrentStore, useRssStore, useVueTorrentStore } from '@/stores'
import { useRoute } from 'vue-router'

defineProps<{
  height?: number
}>()

const emit = defineEmits<{
  articleClicked: [article: RssArticle]
}>()

const route = useRoute()
const addTorrentStore = useAddTorrentStore()
const rssStore = useRssStore()
const vuetorrentStore = useVueTorrentStore()

const selectedFeed = computed(() => route.params.feedId)
const titleFilter = computed({
  get: () => rssStore.filters.title,
  set: debounce((value: string) => {
    rssStore.filters.title = value ?? ''
  }, 300)
})

const articles = computed(() => rssStore.articles.filter(article => !selectedFeed.value || selectedFeed.value === article.feedId).sort((a, b) => Number(b.parsedDate) - Number(a.parsedDate)))

const searchQuery = useSearchQuery(
  () => articles.value,
  () => titleFilter.value,
  (item: RssArticle) => item.title
)

const { paginatedResults, currentPage, pageCount } = useArrayPagination(searchQuery.results, 15)

function openLink(article: RssArticle) {
  const url = vuetorrentStore.useIdForRssLinks ? article.id : article.link
  window.open(url, '_blank', 'noreferrer')
}

function downloadArticle(item: RssArticle) {
  addTorrentStore.pushTorrentToQueue(item.torrentURL)
}

async function markAsRead(item: RssArticle) {
  await rssStore.markArticleAsRead(item.id)
}
</script>

<template>
  <v-list :height="height">
    <v-list-item v-if="searchQuery.results.value.length">
      <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" />
    </v-list-item>

    <template v-for="(article, index) in paginatedResults">
      <v-divider v-if="index > 0" color="white" />

      <v-list-item :class="{ 'rss-read': article.isRead }" @click="$emit('articleClicked', article)" @contextmenu="markAsRead(article)">
        <div class="d-flex">
          <div>
            <v-list-item-title class="wrap-anywhere" style="white-space: unset">{{ article.title }}</v-list-item-title>

            <v-list-item-subtitle class="d-block">
              <div>{{ article.parsedDate.toLocaleString() }}</div>
              <div>{{ $t('rssArticles.item.feedName', { name: rssStore.getFeedNames(article.id).join(' | ') }) }}
              </div>
              <div v-if="article.author">{{ $t('rssArticles.item.author', { author: article.author }) }}</div>
              <div v-if="article.category">{{ $t('rssArticles.item.category', { category: article.category }) }}</div>
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

    <v-list-item v-if="searchQuery.results.value.length">
      <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" />
    </v-list-item>
  </v-list>
</template>
