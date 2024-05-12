<script lang="ts" setup>
import RssFeedDialog from '@/components/Dialogs/RssFeedDialog.vue'
import RssRuleDialog from '@/components/Dialogs/RssRuleDialog.vue'
import ArticleList from '@/components/RSS/ArticleList.vue'
import FeedList from '@/components/RSS/FeedList.vue'
import { useDialogStore, useRssStore } from '@/stores'
import { Feed, FeedRule } from '@/types/qbit/models'
import { RssArticle } from '@/types/vuetorrent'
import debounce from 'lodash.debounce'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { height: deviceHeight, mobile } = useDisplay({ mobileBreakpoint: 'md' })
const router = useRouter()
const dialogStore = useDialogStore()
const rssStore = useRssStore()

const feedsView = ref(false)
const bottomSheetVisible = ref(false)
const descriptionDialogVisible = ref(false)
const rssDescription = reactive({
  title: '',
  content: ''
})

const height = computed(() => {
  // 64px for the toolbar
  // 12px for the padding (top and bottom)
  // 48px for the title
  return deviceHeight.value - 64 - 12 * 2 - 48
})

const rowHeight = computed(() => {
  // 56px for the filter
  // 16px for the margin
  // 56px for the row
  // 12px for the padding (top and bottom)
  return height.value - 56 - 16 - 56 - 12 * 2
})

const titleFilter = computed({
  get: () => rssStore.filters.title,
  set: debounce((value: string) => {
    rssStore.filters.title = value ?? ''
  }, 300)
})

function openRssArticle(article: RssArticle) {
  if (!article.description) return
  rssDescription.title = article.title.trim()
  rssDescription.content = article.description.trim()
  descriptionDialogVisible.value = true
}

function openFeedDialog(initialFeed?: Feed) {
  dialogStore.createDialog(RssFeedDialog, { initialFeed })
}

function openRuleDialog(initialRule?: FeedRule) {
  dialogStore.createDialog(RssRuleDialog, { initialRule })
}

async function refreshFeed(item: Feed) {
  await rssStore.refreshFeed(item.name)
  rssStore.resumeTimer()
}

async function deleteFeed(item: Feed) {
  await rssStore.deleteFeed(item.name)
  rssStore.resumeTimer()
}

function toggleFeedsView() {
  feedsView.value = !feedsView.value
}

function goHome() {
  router.push({ name: 'dashboard' })
}

function handleKeyboardShortcuts(e: KeyboardEvent) {
  if (dialogStore.hasActiveDialog || descriptionDialogVisible.value) {
    return false
  }

  if (e.key === 'Escape') {
    goHome()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyboardShortcuts)
  rssStore.resumeTimer()
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboardShortcuts)
  rssStore.pauseTimer()
})
</script>

<template>
  <div class="pa-3">
    <v-row align="center" justify="center" no-gutters>
      <v-col>
        <h1 class="subtitle-1 ml-2" style="font-size: 1.6em !important">
          {{ feedsView ? $t('rssArticles.feeds.title') : $t('rssArticles.rules.title') }}
        </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn icon="mdi-auto-download" variant="plain" @click="toggleFeedsView()" />
          <v-btn icon="mdi-close" variant="plain" @click="goHome()" />
        </div>
      </v-col>
    </v-row>

    <template v-if="feedsView">
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
          <ArticleList :height="rowHeight" @articleClicked="openRssArticle" />

          <v-bottom-sheet v-model="bottomSheetVisible" max-height="550">
            <template v-slot:activator="{ props }">
              <v-btn class="fab" v-bind="props" color="accent" icon="mdi-format-list-bulleted" size="large" />
            </template>
            <FeedList @update="bottomSheetVisible = false"
                      @createFeed="() => openFeedDialog()"
                      @editFeed="feed => openFeedDialog(feed)"
                      @deleteFeed="feed => deleteFeed(feed)"
                      @refreshFeed="feed => refreshFeed(feed)" />
          </v-bottom-sheet>
        </template>

        <!-- Desktop Layout -->
        <v-row v-else>
          <v-col cols="4">
            <FeedList :height="rowHeight"
                      @createFeed="() => openFeedDialog()"
                      @editFeed="feed => openFeedDialog(feed)"
                      @deleteFeed="feed => deleteFeed(feed)"
                      @refreshFeed="feed => refreshFeed(feed)" />
          </v-col>

          <v-col cols="8">
            <ArticleList :height="rowHeight" @articleClicked="openRssArticle" />
          </v-col>
        </v-row>
      </v-card>
    </template>

    <template v-else>
      <v-card v-if="!rssStore.rules.length" :height="height">
        <v-empty-state :title="$t('rssArticles.rules.empty.value')" icon="mdi-rss-off">
          <template #actions>
            <v-btn :text="$t('rssArticles.rules.empty.action')" color="accent" @click="openRuleDialog()" />
          </template>
        </v-empty-state>
      </v-card>

      <v-card v-else id="rss-rules" class="pa-3" :height="height">
        <v-list>
          <v-list-item v-for="rule in rssStore.rules">
            {{ rule.name }}
          </v-list-item>
        </v-list>
      </v-card>
    </template>
  </div>

  <v-dialog v-model="descriptionDialogVisible">
    <v-card>
      <v-card-title>
        <v-toolbar color="transparent">
          <v-toolbar-title>{{ rssDescription.title }}</v-toolbar-title>
          <v-btn icon="mdi-close" @click="descriptionDialogVisible = false" />
        </v-toolbar>
      </v-card-title>

      <v-card-text>
        <div class="description-container" v-html="rssDescription.content" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.gap {
  gap: 8px;
}

.fab {
  position: fixed;
  right: 24px;
  bottom: 24px;
}

#rss-articles {
  .rss-read {
    &.v-theme--darkTheme {
      color: lighten(darkgrey, 5%) !important;
    }

    &.v-theme--lightTheme {
      color: grey !important;
    }
  }
}

.description-container {
  border: solid red 5px;
}

.description-container img {
  max-width: 100%; /* Restrict image width to the container width */
  height: auto; /* Maintain aspect ratio */
}
</style>
