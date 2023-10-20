<script setup lang="ts">
import { useMaindataStore } from '@/stores/maindata'
import { Torrent } from '@/types/vuetorrent'
import { computed, onBeforeMount } from 'vue'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const maindataStore = useMaindataStore()

const activeCategory = computed(() => maindataStore.categories.map(cat => cat.name).indexOf(props.torrent.category))
const activeTags = computed(() => maindataStore.tags.filter(tag => props.torrent.tags?.includes(tag)))

async function setCategory(category: string) {
  if (props.torrent.category === category) {
    await maindataStore.setTorrentCategory([props.torrent.hash], '')
  } else {
    await maindataStore.setTorrentCategory([props.torrent.hash], category)
  }
}

async function toggleTag(tag: string) {
  if (props.torrent.tags?.includes(tag)) {
    await maindataStore.removeTorrentTags([props.torrent.hash], [tag])
  } else {
    await maindataStore.addTorrentTags([props.torrent.hash], [tag])
  }
}

onBeforeMount(async () => {
  await maindataStore.fetchCategories()
  await maindataStore.fetchTags()
})
</script>

<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-item-group :model-value="activeTags" multiple>
            <v-list>
              <v-list-subheader>{{ $t('torrentDetail.tagsAndCategories.tags') }}</v-list-subheader>

              <v-list-item
                v-for="tag in maindataStore.tags"
                :title="tag"
                :variant="torrent.tags?.includes(tag) ? 'tonal' : undefined"
                :base-color="torrent.tags?.includes(tag) ? 'accent' : undefined"
                @click="toggleTag(tag)" />
            </v-list>
          </v-item-group>
        </v-col>

        <v-col cols="12" md="6">
          <v-item-group :model-value="activeCategory">
            <v-list>
              <v-list-subheader>{{ $t('torrentDetail.tagsAndCategories.categories') }}</v-list-subheader>

              <v-list-item
                v-for="category in maindataStore.categories"
                :title="category.name"
                :variant="category.name === props.torrent.category ? 'tonal' : undefined"
                :base-color="category.name === props.torrent.category ? 'accent' : undefined"
                @click="setCategory(category.name)" />
            </v-list>
          </v-item-group>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
