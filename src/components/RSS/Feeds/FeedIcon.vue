<script setup lang="ts">
import { FeedState } from '@/constants/vuetorrent'

defineProps<{
  state: FeedState
}>()
</script>

<template>
  <span class="mr-2">
    <v-progress-circular v-if="state === FeedState.LOADING" size="24" width="3" indeterminate />
    <v-icon v-else-if="state === FeedState.ERROR" icon="mdi-alert-circle-outline" color="error" />
    <v-icon v-else-if="state === FeedState.UNREAD" icon="mdi-email" />
  </span>
</template>
