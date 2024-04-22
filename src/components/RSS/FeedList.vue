<script setup lang="ts">
import { Feed } from '@/types/qbit/models'
import { useRssStore } from '@/stores'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

defineProps<{
  height?: number
}>()

const emit = defineEmits<{
  update: [feedId: string | undefined]
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
</script>

<template>
  <v-list :height="height">
    <v-list-item :active="!currentFeed"
                 color="accent"
                 :title="getFeedTitle()"
                 variant="text"
                 @click="currentFeed = undefined"/>
    <v-divider/>
    <template v-for="feed in rssStore.feeds">
      <v-list-item v-if="!rssStore.filters.unread || rssStore.filters.unread && getUnreadCount(feed) > 0"
                   :active="currentFeed === feed.uid"
                   :class="getUnreadCount(feed) > 0 ? 'text-accent' : ''"
                   color="accent"
                   variant="text"
                   @click="toggleFeedSelected(feed)">
        <div class="d-flex align-center">
          <v-list-item-title>{{ getFeedTitle(feed)}}</v-list-item-title>
          <v-spacer />
          <v-btn v-if="getUnreadCount(feed) > 0" density="compact" variant="plain" icon="mdi-email-open" @click.stop="readFeed(feed)" />
        </div>
      </v-list-item>
    </template>
  </v-list>
</template>
