<script setup lang="ts">
import ArticleList from '@/components/RSS/ArticleList.vue'
import FeedList from '@/components/RSS/FeedList.vue'
import { ref } from 'vue'

const selectedFeed = defineModel<string | undefined>('selectedFeed', { required: true })
const descriptionDialogVisible = defineModel<boolean>('descriptionDialogVisible', { required: true })
const rssDescription = defineModel<{
  title: string
  content: string
}>('rssDescription', { required: true })

const isFeedOpen = ref(false)
</script>

<template>
  <v-btn v-if="isFeedOpen" icon="mdi-arrow-left" @click="isFeedOpen = false" />

  <v-slide-x-reverse-transition>
    <FeedList v-if="!isFeedOpen"
              v-model:selectedFeed="selectedFeed"
              @feedClicked="isFeedOpen = true" />
  </v-slide-x-reverse-transition>

  <v-slide-x-transition>
    <ArticleList v-if="isFeedOpen"
                 :selectedFeed="selectedFeed"
                 v-model:rssDescription="rssDescription"
                 v-model:descriptionDialogVisible="descriptionDialogVisible" />
  </v-slide-x-transition>
</template>
