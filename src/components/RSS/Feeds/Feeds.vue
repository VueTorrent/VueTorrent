<script setup lang="ts">
import debounce from 'lodash.debounce'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ArticleList from './ArticleList.vue'
import FeedList from './FeedList.vue'
import RssFeedDialog from '@/components/Dialogs/RssFeedDialog.vue'
import { useI18nUtils } from '@/composables'
import { useDialogStore, useRssStore } from '@/stores'
import { Feed } from '@/types/qbit/models'
import { RssArticle } from '@/types/vuetorrent'

const props = defineProps<{
  height: number
  mobile: boolean
}>()

defineEmits<{
  openArticle: [article: RssArticle]
}>()

const { t } = useI18nUtils()
const dialogStore = useDialogStore()
const rssStore = useRssStore()

const bottomSheetVisible = ref(false)

const rowHeight = computed(() => {
  // 56px for the filter
  // 16px for the margin
  // 56px for the row
  // 12px for the padding (top and bottom)
  return props.height - 56 - 16 - 56 - 12 * 2
})

const titleFilter = computed({
  get: () => rssStore.filters.title,
  set: debounce((value: string) => {
    rssStore.filters.title = value ?? ''
  }, 300),
})

function openFeedDialog(initialFeed?: Feed) {
  dialogStore.createDialog(RssFeedDialog, { initialFeed }, rssStore.resumeFeedTimer)
}

async function refreshFeed(item: Feed) {
  await rssStore.refreshFeed(item.name)
  rssStore.resumeFeedTimer()
}

function deleteFeed(item: Feed) {
  dialogStore.confirmAction({
    title: t('dialogs.confirm.deleteFeed'),
    text: item.name,
    yesColor: 'error',
    onConfirm: async () => {
      await rssStore.deleteFeed(item.name)
      rssStore.resumeFeedTimer()
    },
  })
}

onMounted(() => {
  rssStore.resumeFeedTimer()
})
onUnmounted(() => {
  rssStore.pauseFeedTimer()
})
</script>

<template>
  <v-card v-if="!rssStore.feeds.length" :height="height">
    <v-empty-state :title="$t('rssArticles.feeds.empty.value')" icon="mdi-rss-off">
      <template #actions>
        <v-btn :text="$t('rssArticles.feeds.empty.action')" color="accent" @click="openFeedDialog()" />
      </template>
    </v-empty-state>
  </v-card>

  <v-card v-else id="rss-articles" class="pa-3" :height="height">
    <v-text-field v-model="titleFilter" :label="$t('rssArticles.feeds.filters.title')" clearable hide-details />
    <v-checkbox v-model="rssStore.filters.unread" :label="$t('rssArticles.feeds.filters.unread')" hide-details />

    <!-- Mobile layout -->
    <template v-if="mobile">
      <ArticleList :height="rowHeight" @article-clicked="article => $emit('openArticle', article)" />

      <v-bottom-sheet v-model="bottomSheetVisible" max-height="550">
        <template #activator="{ props: sheetProps }">
          <v-btn class="fab" v-bind="sheetProps" color="accent" icon="mdi-format-list-bulleted" size="large" />
        </template>
        <FeedList
          @update="bottomSheetVisible = false"
          @create-feed="() => openFeedDialog()"
          @edit-feed="feed => openFeedDialog(feed)"
          @delete-feed="feed => deleteFeed(feed)"
          @refresh-feed="feed => refreshFeed(feed)" />
      </v-bottom-sheet>
    </template>

    <!-- Desktop Layout -->
    <v-row v-else>
      <v-col cols="4">
        <FeedList
          :height="rowHeight"
          @create-feed="() => openFeedDialog()"
          @edit-feed="feed => openFeedDialog(feed)"
          @delete-feed="feed => deleteFeed(feed)"
          @refresh-feed="feed => refreshFeed(feed)" />
      </v-col>

      <v-col cols="8">
        <ArticleList :height="rowHeight" @article-clicked="article => $emit('openArticle', article)" />
      </v-col>
    </v-row>
  </v-card>
</template>
