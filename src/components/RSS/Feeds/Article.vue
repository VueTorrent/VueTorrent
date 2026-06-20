<script setup lang="ts">
import { vOnLongPress } from '@vueuse/components'
import { useRssStore } from '@/stores'
import { RssArticle } from '@/types/vuetorrent'

defineProps<{
  article: RssArticle
}>()

defineEmits<{
  click: []
  markAsRead: []
  open: []
  download: []
}>()

const rssStore = useRssStore()
</script>

<template>
  <v-list-item
    v-on-long-press="() => $emit('markAsRead')"
    data-custom-context-menu
    :class="{ 'rss-read': article.isRead }"
    @click="$emit('click')"
    @contextmenu="$emit('markAsRead')">
    <div class="d-flex">
      <div>
        <v-list-item-title class="d-flex align-center ga-3 wrap-anywhere" style="white-space: unset">
          <div v-if="!article.isRead">
            <v-chip color="accent" variant="outlined">
              {{ $t('rssArticles.feeds.item.new') }}
            </v-chip>
          </div>
          <div>{{ article.title }}</div>
        </v-list-item-title>

        <v-list-item-subtitle class="d-block mt-3">
          <div>{{ article.parsedDate.toLocaleString() }}</div>
          <div>{{ $t('rssArticles.feeds.item.feedName', { name: rssStore.getFeedNames(article.id).join(' | ') }) }}</div>
          <div v-if="article.author">
            {{ $t('rssArticles.feeds.item.author', { author: article.author }) }}
          </div>
          <div v-if="article.category">
            {{ $t('rssArticles.feeds.item.category', { category: article.category }) }}
          </div>
        </v-list-item-subtitle>
      </div>

      <v-spacer />

      <div class="d-flex flex-column">
        <v-btn icon="mdi-open-in-new" variant="text" @click.stop="$emit('open')" />
        <v-btn color="accent" icon="mdi-check" variant="text" @click.stop="$emit('markAsRead')" />
        <v-btn icon="mdi-download" variant="text" @click.stop="$emit('download')" />
      </div>
    </div>
  </v-list-item>
</template>

<style scoped></style>
