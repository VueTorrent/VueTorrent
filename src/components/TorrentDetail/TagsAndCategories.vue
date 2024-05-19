<script lang="ts" setup>
import { useMaindataStore, useTorrentStore } from '@/stores'
import { Torrent } from '@/types/vuetorrent'
import { onBeforeMount } from 'vue'

const props = defineProps<{ torrent: Torrent; isActive: boolean }>()

const maindataStore = useMaindataStore()
const torrentStore = useTorrentStore()

async function setCategory(category: string) {
  if (props.torrent.category === category) {
    await torrentStore.setTorrentCategory([props.torrent.hash], '')
  } else {
    await torrentStore.setTorrentCategory([props.torrent.hash], category)
  }
}

async function toggleTag(tag: string) {
  if (props.torrent.tags?.includes(tag)) {
    await torrentStore.removeTorrentTags([props.torrent.hash], [tag])
  } else {
    await torrentStore.addTorrentTags([props.torrent.hash], [tag])
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
          <v-list>
            <v-list-subheader>{{ $t('torrentDetail.tagsAndCategories.tags') }}</v-list-subheader>

            <v-list-item v-for="tag in maindataStore.tags" variant="text" color="accent" :title="tag" :active="torrent.tags?.includes(tag)" @click="toggleTag(tag)" />
          </v-list>
        </v-col>

        <v-col cols="12" md="6">
          <v-list>
            <v-list-subheader>{{ $t('torrentDetail.tagsAndCategories.categories') }}</v-list-subheader>

            <v-list-item
              v-for="category in maindataStore.categories"
              variant="text"
              color="accent"
              :title="category.name"
              :active="category.name === props.torrent.category"
              @click="setCategory(category.name)" />
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
