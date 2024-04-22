<script setup lang="ts">
import { Feed } from '@/types/qbit/models'
import { useRssStore } from '@/stores'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import FeedIcon from '@/components/RSS/FeedIcon.vue'
import { FeedState } from '@/constants/vuetorrent'

defineProps<{
  height?: number
}>()

const emit = defineEmits<{
  update: [feedId: string | undefined]
  editFeed: [feed: Feed]
  deleteFeed: [feed: Feed]
  refreshFeed: [feed: Feed]
}>()

const router = useRouter()
const rssStore = useRssStore()

const currentFeed = computed({
  get() {
    return router.currentRoute.value.params.feedId as string | undefined
  },
  set(feedId) {
    router.replace({ name: 'rssArticles', params: { feedId } })
    emit('update', feedId)
  }
})

function getUnreadCount(feed?: Feed) {
  if (!feed) {
    return rssStore.unreadArticles.length
  }

  return (feed.articles ?? []).reduce((cnt, article) => cnt + +!article.isRead, 0)
}

function toggleFeedSelected(feed: Feed) {
  currentFeed.value = currentFeed.value !== feed.uid ? feed.uid : undefined
}

async function readFeed(feed: Feed) {
  await rssStore.markFeedAsRead(feed)
}

function getFeedTitle(feed?: Feed) {
  const unreadCount = getUnreadCount(feed)
  return (unreadCount ? `${ unreadCount } | ` : '') + `${ feed ? feed.name : 'All' }`
}

const allState = computed(() => {
  return rssStore.feeds.reduce((state, feed) => Math.min(state, getFeedState(feed)), FeedState.READ)
})

function getFeedState(feed: Feed) {
  if (feed.isLoading) return FeedState.LOADING
  else if (feed.hasError) return FeedState.ERROR
  else if (feed.articles?.some(article => !article.isRead)) return FeedState.UNREAD
  else return FeedState.READ
}
</script>

<template>
  <v-list :height="height">
    <v-list-item :active="!currentFeed"
                 color="accent"
                 variant="text"
                 @click="currentFeed = undefined">
      <div class="d-flex align-center">
        <FeedIcon :state="allState" />
        <v-list-item-title>{{ getFeedTitle() }}</v-list-item-title>
      </div>
    </v-list-item>
    <v-divider thickness="3" />
    <template v-for="feed in rssStore.feeds">
      <v-list-item v-if="!rssStore.filters.unread || rssStore.filters.unread && getUnreadCount(feed) > 0"
                   :active="currentFeed === feed.uid"
                   :class="getUnreadCount(feed) > 0 ? 'text-accent' : ''"
                   color="accent"
                   variant="text"
                   @click="toggleFeedSelected(feed)">
        <div class="d-flex align-center">
          <FeedIcon :state="getFeedState(feed)" />
          <v-list-item-title>{{ getFeedTitle(feed) }}</v-list-item-title>
          <v-spacer />
          <v-btn v-if="getUnreadCount(feed) > 0" icon="mdi-email-open" density="comfortable" variant="plain" @click.stop="readFeed(feed)" />
          <v-btn v-else-if="!feed.isLoading" icon="mdi-sync" density="comfortable" variant="plain" @click.stop="$emit('refreshFeed', feed)" />
          <v-btn icon="mdi-pencil" density="comfortable" variant="plain" @click.stop="$emit('editFeed', feed)" />
          <v-btn icon="mdi-delete" color="error" density="comfortable" variant="plain" @click.stop="$emit('deleteFeed', feed)" />
        </div>
      </v-list-item>
    </template>
  </v-list>
</template>
