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
    <v-btn v-if="unreadCount > 0" icon="mdi-email-open" density="comfortable" variant="plain" @click.stop="$emit('readFeed')" />
    <v-btn v-if="!loading" icon="mdi-sync" density="comfortable" variant="plain" @click.stop="$emit('refreshFeed')" />
    <v-btn icon="mdi-pencil" density="comfortable" variant="plain" @click.stop="$emit('editFeed')" />
    <v-btn icon="mdi-delete" color="error" density="comfortable" variant="plain" @click.stop="$emit('deleteFeed')" />
  </div>
</template>

<style scoped>

</style>