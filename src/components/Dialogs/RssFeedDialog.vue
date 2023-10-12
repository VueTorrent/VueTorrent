<script setup lang="ts">
import { useDialog } from '@/composables/Dialog.ts'
import { useRssStore } from '@/stores'
import { Feed } from '@/types/qbit/models'
import { onBeforeMount, reactive, ref } from 'vue'
import { VForm } from 'vuetify/components'

const props = defineProps<{
  guid: string
  initialFeed?: Feed
}>()

const { isOpened } = useDialog(props.guid)
const rssStore = useRssStore()

const form = ref<VForm>()
const isFormValid = ref(false)
const formData = reactive({
  name: '',
  url: ''
})

async function save() {
  if (props.initialFeed) {
    await rssStore.editFeed(props.initialFeed.name, formData.name)
  } else {
    await rssStore.createFeed(formData.name, formData.url)
  }
  await rssStore.fetchFeeds()
  close()
}

const close = () => {
  isOpened.value = false
}

onBeforeMount(() => {
  if (props.initialFeed) {
    formData.name = props.initialFeed.name
    formData.url = props.initialFeed.url
  }
})
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title>{{ $t(`dialogs.rss.feed.title.${initialFeed ? 'edit' : 'create'}`) }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <v-text-field v-model="formData.name" :label="$t('dialogs.rss.feed.name')" />
          <v-text-field v-model="formData.url" :disabled="!!initialFeed" :label="$t('dialogs.rss.feed.url')" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="close">{{ $t('common.cancel') }}</v-btn>
        <v-btn color="accent" @click="save">{{ $t('common.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
