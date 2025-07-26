<script setup lang="ts">
import { vOnLongPress } from '@vueuse/components'
import { useRssStore } from '@/stores'
import { RssArticle } from '@/types/vuetorrent'

defineProps<{
  value: RssArticle
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
    :class="{ 'rss-read': value.isRead }"
    @click="$emit('click')"
    @contextmenu="$emit('markAsRead')">
    <div class="d-flex">
      <div>
        <v-list-item-title class="d-flex align-center ga-3 wrap-anywhere" style="white-space: unset">
          <div v-if="!value.isRead">
            <v-chip color="accent" variant="outlined">
              {{ $t('rssArticles.feeds.item.new') }}
            </v-chip>
          </div>
          <div>{{ value.title }}</div>
        </v-list-item-title>

        <v-list-item-subtitle class="d-block mt-3">
          <div>{{ value.parsedDate.toLocaleString() }}</div>
          <div>{{ $t('rssArticles.feeds.item.feedName', { name: rssStore.getFeedNames(value.id).join(' | ') }) }}</div>
          <div v-if="value.author">
            {{ $t('rssArticles.feeds.item.author', { author: value.author }) }}
          </div>
          <div v-if="value.category">
            {{ $t('rssArticles.feeds.item.category', { category: value.category }) }}
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
