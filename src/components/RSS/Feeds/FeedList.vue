<script setup lang="ts">
import { useArrayUnique } from '@vueuse/core'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Feed from './Feed.vue'
import FeedIcon from './FeedIcon.vue'
import { FeedState } from '@/constants/vuetorrent'
import { useRssStore } from '@/stores'
import { Feed as FeedType } from '@/types/qbit/models'

defineProps<{
  height?: number
}>()

const emit = defineEmits<{
  update: [feedId: string | undefined]
  createFeed: []
  editFeed: [feed: FeedType]
  deleteFeed: [feed: FeedType]
  refreshFeed: [feed: FeedType]
}>()

const router = useRouter()
const rssStore = useRssStore()

const currentFeed = computed({
  get: () => router.currentRoute.value.params.feedId as string | undefined,
  set(feedId) {
    void router.replace({ name: 'rssArticles', params: { tab: 'feeds', feedId } }).then(() => emit('update', feedId))
  },
})
const filteredFeedIds = useArrayUnique(() => rssStore.filteredArticles.map(art => art.feedId))

function getUnreadCount(feed?: FeedType) {
  if (!feed) {
    return rssStore.unreadArticles.length
  }

  return (feed.articles ?? []).reduce((cnt, article) => cnt + +!article.isRead, 0)
}

function toggleFeedSelected(feed: FeedType) {
  currentFeed.value = currentFeed.value !== feed.uid ? feed.uid : undefined
}

async function readFeed(feed: FeedType) {
  await rssStore.markFeedAsRead(feed)
}

async function refreshAllFeeds() {
  await rssStore.refreshAllFeeds()
  rssStore.resumeFeedTimer()
}

function getFeedTitle(feed?: FeedType) {
  const unreadCount = getUnreadCount(feed)
  return (unreadCount ? `${unreadCount} | ` : '') + `${feed ? feed.name : 'All'}`
}

const allState = computed(() => {
  return rssStore.feeds.reduce((state, feed) => Math.min(state, getFeedState(feed)), FeedState.READ)
})

function getFeedState(feed: FeedType) {
  if (feed.isLoading) return FeedState.LOADING
  else if (feed.hasError) return FeedState.ERROR
  else if (feed.articles?.some(article => !article.isRead)) return FeedState.UNREAD
  else return FeedState.READ
}
</script>

<template>
  <v-list :height="height">
    <v-list-item :active="!currentFeed" color="accent" variant="text" @click="currentFeed = undefined">
      <div class="d-flex align-center">
        <FeedIcon :state="allState" />
        <v-list-item-title>{{ getFeedTitle() }}</v-list-item-title>
        <v-spacer />

        <v-tooltip :text="$t('rssArticles.feeds.markAllAsRead')" location="top">
          <template #activator="{ props }">
            <v-btn v-if="getUnreadCount() > 0" v-bind="props" icon="mdi-email-open" density="comfortable" variant="plain" @click="rssStore.markAllAsRead()" />
          </template>
        </v-tooltip>

        <v-tooltip :text="$t('rssArticles.feeds.refreshAllFeeds')" location="top">
          <template #activator="{ props }">
            <v-btn v-if="allState !== FeedState.LOADING" v-bind="props" icon="mdi-sync" density="comfortable" variant="plain" @click="refreshAllFeeds()" />
          </template>
        </v-tooltip>

        <v-tooltip :text="$t('rssArticles.feeds.empty.action')" location="top">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon="mdi-plus" density="comfortable" variant="plain" @click="$emit('createFeed')" />
          </template>
        </v-tooltip>
      </div>
    </v-list-item>
    <v-divider thickness="3" />
    <template v-for="feed in rssStore.feeds">
      <v-list-item
        v-if="(!rssStore.filters.unread || getUnreadCount(feed) > 0) && (rssStore.filters.title == '' || !filteredFeedIds.length || filteredFeedIds.includes(feed.uid))"
        :key="feed.uid"
        :active="currentFeed === feed.uid"
        :class="getUnreadCount(feed) > 0 ? 'text-accent' : ''"
        color="accent"
        variant="text"
        @click="toggleFeedSelected(feed)">
        <Feed
          :title="getFeedTitle(feed)"
          :state="getFeedState(feed)"
          :unread-count="getUnreadCount(feed)"
          @read-feed="readFeed(feed)"
          @refresh-feed="$emit('refreshFeed', feed)"
          @edit-feed="$emit('editFeed', feed)"
          @delete-feed="$emit('deleteFeed', feed)" />
      </v-list-item>
    </template>
  </v-list>
</template>
