<script lang="ts" setup>
import Desktop from '@/components/RSS/Desktop.vue'
import Mobile from '@/components/RSS/Mobile.vue'
import {useRouter} from 'vue-router'
import {computed} from 'vue'
import debounce from 'lodash.debounce'
import {useRssStore} from '@/stores'

const router = useRouter()
const rssStore = useRssStore()

const titleFilter = computed({
  get: () => rssStore.filters.title,
  set: debounce((value: string) => {
    rssStore.filters.title = value ?? ''
  }, 300)
})

function goHome() {
  router.push({name: 'dashboard'})
}
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
          <v-btn icon="mdi-close" variant="plain" @click="goHome"/>
        </div>
      </v-col>
    </v-row>

    <v-card class="pa-3">
      <v-text-field v-model="titleFilter" :label="$t('rssArticles.filters.title')" clearable hide-details/>

      <div class="d-flex flex-row align-center justify-center mt-4">
        <v-checkbox v-model="rssStore.filters.unread" :label="$t('rssArticles.filters.unread')" hide-details/>
        <v-spacer/>
        <v-btn :disabled="rssStore.unreadArticles.length === 0" :text="$t('rssArticles.markAllAsRead')" color="primary"
               @click="rssStore.markAllAsRead()"/>
      </div>

      <Mobile v-if="$vuetify.display.mobile"/>
      <Desktop v-else/>
    </v-card>
  </div>
  <!--  <Old />-->
</template>
