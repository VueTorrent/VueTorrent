<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Article from './Article.vue'
import { useArrayPagination } from '@/composables'
import { openLink } from '@/helpers'
import { useAddTorrentStore, useRssStore, useVueTorrentStore } from '@/stores'
import { RssArticle } from '@/types/vuetorrent'

defineProps<{
  height?: number
}>()

defineEmits<{
  articleClicked: [article: RssArticle]
}>()

const route = useRoute()
const addTorrentStore = useAddTorrentStore()
const rssStore = useRssStore()
const vuetorrentStore = useVueTorrentStore()

const selectedFeed = computed(() => route.params.feedId)

const articles = computed(() =>
  rssStore.filteredArticles.filter(article => !selectedFeed.value || selectedFeed.value === article.feedId).sort((a, b) => Number(b.parsedDate) - Number(a.parsedDate))
)

const { paginatedResults, currentPage, pageCount } = useArrayPagination(articles, 15)

function openArticleLink(article: RssArticle) {
  const url = vuetorrentStore.useIdForRssLinks ? article.id : article.link
  openLink(url)
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
    <v-list-item v-if="articles.length">
      <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" />
    </v-list-item>

    <template v-for="(article, index) in paginatedResults" :key="index">
      <v-divider v-if="index > 0" />

      <Article
        :value="article"
        @click="$emit('articleClicked', article)"
        @mark-as-read="markAsRead(article)"
        @open="openArticleLink(article)"
        @download="downloadArticle(article)" />
    </template>

    <v-list-item v-if="articles.length === 0">
      {{ $t('common.emptyList') }}
    </v-list-item>

    <v-list-item v-if="articles.length">
      <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" />
    </v-list-item>
  </v-list>
</template>
