<script lang="ts" setup>
import Desktop from '@/components/RSS/Desktop.vue'
import Mobile from '@/components/RSS/Mobile.vue'
import { useRouter } from 'vue-router'
import { computed, onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue'
import debounce from 'lodash.debounce'
import { useDialogStore, useRssStore } from '@/stores'

const router = useRouter()
const dialogStore = useDialogStore()
const rssStore = useRssStore()

const selectedFeed = ref<string>()
const descriptionDialogVisible = ref(false)
const rssDescription = reactive({
  title: '',
  content: ''
})

const titleFilter = computed({
  get: () => rssStore.filters.title,
  set: debounce((value: string) => {
    rssStore.filters.title = value ?? ''
  }, 300)
})

function goHome() {
  router.push({ name: 'dashboard' })
}

function goToRssFeeds() {
  router.push({ name: 'settings', params: { tab: 'rss', subtab: 'feeds' } })
}

function handleKeyboardShortcuts(e: KeyboardEvent) {
  if (dialogStore.hasActiveDialog || descriptionDialogVisible.value) {
    return false
  }

  if (e.key === 'Escape') {
    goHome()
  }
}

onBeforeMount(async () => {
  await rssStore.fetchFeeds()
})
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
          {{ $t('rssArticles.title') }}
        </h1>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn icon="mdi-close" variant="plain" @click="goHome" />
        </div>
      </v-col>
    </v-row>

    <v-card v-if="!rssStore.feeds">
      <v-empty-state title="No RSS feeds registered" icon="mdi-rss-off">
        <template #text>
          <v-btn text="Go to settings" color="primary" @click="goToRssFeeds" />
        </template>
      </v-empty-state>
    </v-card>

    <v-card v-else id="rss-articles" class="pa-3">
      <v-text-field v-model="titleFilter" :label="$t('rssArticles.filters.title')" clearable hide-details />

      <div class="d-flex flex-row align-center justify-center mt-4">
        <v-checkbox v-model="rssStore.filters.unread" :label="$t('rssArticles.filters.unread')" hide-details />
        <v-spacer />
        <v-btn :disabled="rssStore.unreadArticles.length === 0" :text="$t('rssArticles.markAllAsRead')" color="primary"
               @click="rssStore.markAllAsRead()" />
      </div>

      <Mobile v-if="$vuetify.display.mobile"
              v-model:selected-feed="selectedFeed"
              v-model:description-dialog-visible="descriptionDialogVisible"
              v-model:rss-description="rssDescription" />
      <Desktop v-else
               v-model:selected-feed="selectedFeed"
               v-model:description-dialog-visible="descriptionDialogVisible"
               v-model:rss-description="rssDescription" />
    </v-card>
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
