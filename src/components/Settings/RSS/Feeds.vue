<script setup lang="ts">
import RssFeedDialog from '@/components/Dialogs/RssFeedDialog.vue'
import { useDialogStore, useRssStore } from '@/stores'
import { Feed } from '@/types/qbit/models'
import { useIntervalFn } from '@vueuse/core'
import { onBeforeMount, ref, watch } from 'vue'

const dialogStore = useDialogStore()
const rssStore = useRssStore()

const loading = ref(false)
const feedDialog = ref('')

async function refreshFeed(item: Feed, updateList = true) {
  await rssStore.refreshFeed(item.name)
  if (updateList) await updateFeedList()
}

async function deleteFeed(item: Feed) {
  await rssStore.deleteFeed(item.name)
  await updateFeedList()
}

async function refreshAllFeeds() {
  rssStore.feeds.forEach(feed => refreshFeed(feed, false))
  await updateFeedList()
}

async function updateFeedList() {
  if (loading.value) return

  loading.value = true
  await rssStore.fetchFeeds()
  loading.value = false
}

function openFeedDialog(initialFeed?: Feed) {
  feedDialog.value = dialogStore.createDialog(RssFeedDialog, { initialFeed })
}

onBeforeMount(() => {
  updateFeedList()
  useIntervalFn(updateFeedList, 5000)
})

watch(
  () => dialogStore.isDialogOpened(feedDialog.value),
  value => {
    if (!value) {
      updateFeedList()
    }
  }
)
</script>

<template>
  <v-row class="mt-2">
    <v-col cols="12" sm="6" lg="3" v-for="feed in rssStore.feeds">
      <v-sheet rounded="xl" class="d-flex align-center">
        <div class="pl-4">{{ feed.name }}</div>
        <v-spacer />
        <div>
          <v-btn icon variant="plain" @click="refreshFeed(feed)">
            <v-icon v-if="feed.hasError">mdi-sync-alert</v-icon>
            <v-icon v-else-if="feed.isLoading">mdi-cloud-sync</v-icon>
            <v-icon v-else>mdi-sync</v-icon>
          </v-btn>
          <v-btn icon variant="plain" density="compact" @click="openFeedDialog(feed)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon="mdi-delete" color="red" variant="plain" @click="deleteFeed(feed)" />
        </div>
      </v-sheet>
    </v-col>
    <v-col v-if="rssStore.feeds.length === 0" cols="12">
      <v-card>
        <v-card-text>{{ $t('settings.rss.feeds.noFeeds') }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6" class="d-flex align-center justify-center">
      <v-btn color="accent" @click="openFeedDialog()">
        {{ $t('settings.rss.feeds.createNew') }}
      </v-btn>
    </v-col>
    <v-col cols="6" class="d-flex align-center justify-center">
      <v-btn color="accent" :loading="loading" :disabled="rssStore.feeds.length === 0" :text="$t('settings.rss.feeds.refreshAll')" @click="refreshAllFeeds" />
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
