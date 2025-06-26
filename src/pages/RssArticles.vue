<script lang="ts" setup>
import DOMPurify from 'dompurify'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import Feeds from '@/components/RSS/Feeds/Feeds.vue'
import Rules from '@/components/RSS/Rules/Rules.vue'
import { useDialogStore, useRssStore } from '@/stores'
import { RssArticle } from '@/types/vuetorrent'

const { height: deviceHeight, mobile } = useDisplay({ mobileBreakpoint: 'md' })
const route = useRoute()
const router = useRouter()
const dialogStore = useDialogStore()
const rssStore = useRssStore()

const descriptionDialogVisible = ref(false)
const rssDescription = reactive({
  title: '',
  content: ''
})

const feedsView = computed(() => route.params.tab !== 'rules')
const height = computed(() => {
  // 64px for the toolbar
  // 12px for the padding (top and bottom)
  // 48px for the title
  return deviceHeight.value - 64 - 12 * 2 - 48
})

function openRssArticle(article: RssArticle) {
  if (!article.description) return
  rssDescription.title = article.title.trim()
  rssDescription.content = article.description.trim()
  descriptionDialogVisible.value = true
}

function toggleFeedsView() {
  const tab = route.params.tab === 'rules' ? 'feeds' : 'rules'
  void router.replace({ name: 'rssArticles', params: { tab } }).then(() => (rssStore.lastView = tab))
}

function goHome() {
  void router.push({ name: 'dashboard' })
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
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboardShortcuts)
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
          <v-tooltip :text="$t(feedsView ? 'rssArticles.toggle.rules' : 'rssArticles.toggle.feeds')" location="top">
            <template #activator="{ props }">
              <v-btn v-bind="props" icon="mdi-auto-download" variant="plain" @click="toggleFeedsView()" />
            </template>
          </v-tooltip>
          <v-btn icon="mdi-close" variant="plain" @click="goHome()" />
        </div>
      </v-col>
    </v-row>

    <Feeds v-if="feedsView" :height="height" :mobile="mobile" @open-article="openRssArticle" />
    <Rules v-else :height="height" />
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
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="description-container" v-html="DOMPurify.sanitize(rssDescription.content)" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
@use 'sass:color';

.fab {
  position: fixed;
  right: 24px;
  bottom: 24px;
}

#rss-articles {
  .rss-read {
    &[class*='v-theme--dark-'] {
      color: color.adjust(darkgrey, $lightness: 5%) !important;
    }

    &[class*='v-theme--light-'] {
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
