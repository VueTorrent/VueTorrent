<script setup lang="ts">
import ArticleList from '@/components/RSS/ArticleList.vue'
import FeedList from '@/components/RSS/FeedList.vue'

const selectedFeed = defineModel<string | undefined>('selectedFeed', { required: true })
const descriptionDialogVisible = defineModel<boolean>('descriptionDialogVisible', { required: true })
const rssDescription = defineModel<{
  title: string
  content: string
}>('rssDescription', { required: true })
</script>

<template>
  <v-row>
    <v-col cols="4">
      <FeedList v-model:selectedFeed="selectedFeed" />
    </v-col>

    <v-col cols="8">
      <ArticleList :selectedFeed="selectedFeed"
                   v-model:rssDescription="rssDescription"
                   v-model:descriptionDialogVisible="descriptionDialogVisible" />
    </v-col>
  </v-row>
</template>
