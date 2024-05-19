<script setup lang="ts">
import { FeedState } from '@/constants/vuetorrent'
import { computed } from 'vue'
import FeedIcon from './FeedIcon.vue'

const props = defineProps<{
  title: string
  state: FeedState
  unreadCount: number
}>()

defineEmits<{
  readFeed: []
  refreshFeed: []
  editFeed: []
  deleteFeed: []
}>()

const loading = computed(() => props.state === FeedState.LOADING)
</script>

<template>
  <div class="d-flex align-center">
    <FeedIcon :state="state" />
    <v-list-item-title>{{ title }}</v-list-item-title>
    <v-spacer />

    <v-tooltip :text="$t('rssArticles.feeds.markAsRead')" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-if="unreadCount > 0" v-bind="props" icon="mdi-email-open" density="comfortable" variant="plain" @click.stop="$emit('readFeed')" />
      </template>
    </v-tooltip>

    <v-tooltip :text="$t('common.refresh')" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-if="!loading" v-bind="props" icon="mdi-sync" density="comfortable" variant="plain" @click.stop="$emit('refreshFeed')" />
      </template>
    </v-tooltip>

    <v-tooltip :text="$t('common.edit')" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-pencil" density="comfortable" variant="plain" @click.stop="$emit('editFeed')" />
      </template>
    </v-tooltip>

    <v-tooltip :text="$t('common.delete')" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-delete" color="red" density="comfortable" variant="plain" @click.stop="$emit('deleteFeed')" />
      </template>
    </v-tooltip>
  </div>
</template>

<style scoped></style>
