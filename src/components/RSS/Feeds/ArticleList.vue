<script setup lang="ts">
import { useArrayPagination } from '@/composables'
import { useAddTorrentStore, useRssStore, useVueTorrentStore } from '@/stores'
import { RssArticle } from '@/types/vuetorrent'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Article from './Article.vue'

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
    <v-list-item v-if="articles.length">
      <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" />
    </v-list-item>

    <template v-for="(article, index) in paginatedResults">
      <v-divider v-if="index > 0" color="white" />

      <Article :value="article" @click="$emit('articleClicked', article)" @markAsRead="markAsRead(article)" @open="openLink(article)" @download="downloadArticle(article)" />
    </template>

    <v-list-item v-if="articles.length === 0">
      {{ $t('common.emptyList') }}
    </v-list-item>

    <v-list-item v-if="articles.length">
      <v-pagination v-model="currentPage" :length="pageCount" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" />
    </v-list-item>
  </v-list>
</template>
