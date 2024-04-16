<script setup lang="ts">
import { Feed } from '@/types/qbit/models'
import { useRssStore } from '@/stores'

const selectedFeed = defineModel<string | undefined>('selectedFeed', { required: true })
const emit = defineEmits<{
  feedClicked: []
}>()

const rssStore = useRssStore()

function getUnreadCount(feed?: Feed) {
  if (!feed) {
    return rssStore.unreadArticles.length
  }

  return (feed.articles ?? []).reduce((cnt, article) => cnt + +!article.isRead, 0)
}

function toggleFeedSelected(feed: Feed) {
  emit('feedClicked')
  selectedFeed.value = selectedFeed.value !== feed.uid ? feed.uid : undefined
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
  <v-list>
    <v-list-item :active="!selectedFeed"
                 color="accent"
                 :title="getFeedTitle()"
                 variant="text"
                 @click="selectedFeed = undefined"/>
    <v-divider/>
    <template v-for="feed in rssStore.feeds">
      <v-list-item v-if="!rssStore.filters.unread || rssStore.filters.unread && getUnreadCount(feed) > 0"
                   :active="selectedFeed === feed.uid"
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

<style scoped>

</style>